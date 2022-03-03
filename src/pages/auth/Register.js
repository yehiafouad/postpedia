import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Button, Form, Image } from "semantic-ui-react";
import FormikControl from "../../components/formik/FormikControl";
import { useLanguage } from "../../context/languageContext";
import { content } from "../../localization/content";
import routes from "../../routes";
import * as Yup from "yup";
import Auth from "../../config/auth";
import useAsync from "../../hooks/useAsync";
import { registerUser } from "../../services/auth-service";
import { useToasts } from "react-toast-notifications";
import { AiFillEdit } from "react-icons/ai";

const RegisterPage = () => {
  const [lang] = useLanguage();
  const authContent = content[lang];
  const history = useHistory();
  const { run, isLoading } = useAsync();
  const { addToast } = useToasts();

  const registerSchema = Yup.object({
    name: Yup.string().required(authContent.required),
    email: Yup.string()
      .email(authContent.required)
      .required(authContent.required),
    password: Yup.string().required(authContent.required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], authContent.notMatch)
      .required(authContent.required),
  });

  const avatarHandler = (e, formik) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("viewAvatar", e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    formik.setFieldValue("avatar", e.target.files[0]);
  };

  const handleOnSubmit = (values) => {
    const newUser = new FormData();
    newUser.append("name", values.name);
    newUser.append("email", values.email);
    newUser.append("password", values.password);
    newUser.append("avatar", values.avatar);

    run(registerUser(newUser))
      .then(({ data }) => {
        addToast(data.message, { appearance: "success" });
        history.push(routes.login);
      })
      .catch((e) => {
        console.log(e);
        e?.errors?.map((err) => addToast(err.message, { appearance: "error" }));
      });
    // Auth.setToken('token')
    // history.push(routes.main)
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          viewAvatar: "",
          avatar: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.submitForm}>
            <div className="text-center my-10">
              <Image
                src={
                  formik.values.viewAvatar ||
                  "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                }
                size="tiny"
                circular
                avatar
                className="w-24 h-24 -mt-2"
              />
              <input
                id="edit-avatar"
                name="editAvatar"
                type="file"
                accept="*/*"
                className="sr-only"
                onChange={(e) => avatarHandler(e, formik)}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
              <label
                htmlFor="edit-avatar"
                className="relative cursor-pointer rounded-md font-medium file-upload my-5"
              >
                <div className="absolute -bottom-9 ltr:right-0 rtl:left-0 bg-white flex items-center justify-center p-1 rounded-full">
                  <AiFillEdit
                    onChange={avatarHandler}
                    name="editAvatar"
                    size={20}
                    className="text-primaryRedColor-default"
                  />
                </div>
              </label>
            </div>
            <Form.Field required>
              <FormikControl
                name="name"
                label={authContent.fullName}
                control="input"
              />
            </Form.Field>

            <Form.Field required>
              <FormikControl
                name="email"
                label={authContent.email}
                control="input"
                type="email"
              />
            </Form.Field>

            <Form.Field required>
              <FormikControl
                name="password"
                label={authContent.password}
                control="input"
                type="password"
              />
            </Form.Field>

            <Form.Field required>
              <FormikControl
                name="confirmPassword"
                label={authContent.confirmPassword}
                control="input"
                type="password"
              />
            </Form.Field>

            <div className="text-center">
              <Button
                content={authContent.register}
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                color="teal"
              />
              <Button
                content={authContent.login}
                className="bg-transparent"
                disabled={isLoading}
                onClick={() => history.push(routes.login)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;

import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";
import FormikControl from "../../components/formik/FormikControl";
import { useLanguage } from "../../context/languageContext";
import { content } from "../../localization/content";
import routes from "../../routes";
import * as Yup from "yup";
import Auth from "../../config/auth";
import useAsync from "../../hooks/useAsync";
import { useToasts } from "react-toast-notifications";
import { loginUser } from "../../services/auth-service";
import { useUser } from "../../context/UserContext";

const LoginPage = () => {
  const [lang] = useLanguage();
  const authContent = content[lang];
  const history = useHistory();
  const { run, isLoading } = useAsync();
  const { addToast } = useToasts();
  const [user, setUser] = useUser();

  const loginSchema = Yup.object({
    email: Yup.string()
      .email(authContent.required)
      .required(authContent.required),
    password: Yup.string().required(authContent.required),
  });

  const handleOnSubmit = (values) => {
    run(loginUser(values))
      .then(({ data }) => {
        Auth.setToken(data.data.token);
        setUser(
          JSON.stringify({
            _id: data.data._id,
            name: data.data.name,
            email: data.data.email,
            avatar: data.data.avatar,
          })
        );
        history.push(routes.main);
        addToast(data.message, { appearance: "success" });
      })
      .catch((e) => {
        console.log(e);
        return e?.errors?.map((err) =>
          addToast(err.message, { appearance: "error" })
        );
      });
    // Auth.setToken("token");
    // history.push(routes.main);
  };

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleOnSubmit}
      >
        {(formik) => (
          <Form loading={false} onSubmit={formik.submitForm}>
            <Form.Field required>
              <FormikControl
                control="input"
                label={authContent.email}
                name="email"
              />
            </Form.Field>

            <Form.Field required>
              <FormikControl
                control="input"
                label={authContent.password}
                type="password"
                name="password"
              />
            </Form.Field>

            <div className="text-center">
              <Button
                content={authContent.login}
                type="submit"
                disabled={isLoading}
                loading={isLoading}
                color="google plus"
              />
              <Button
                content={authContent.register}
                className="bg-transparent"
                disabled={isLoading}
                onClick={() => history.push(routes.register)}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;

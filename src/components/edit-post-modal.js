import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Button, Form, Modal } from "semantic-ui-react";
import StateContext from "../context/stateContext";
import useAsync from "../hooks/useAsync";
import { updatePost } from "../services/posts-service";
import FormikControl from "./formik/FormikControl";

const EditPostModal = () => {
  const [open, setOpen] = useState(false);
  const { showModal, setShowModal, setUpdate } = useContext(StateContext);
  const { run, isLoading } = useAsync();
  const { addToast } = useToasts();

  useEffect(() => {
    if (["editPost"].includes(showModal.modalName)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showModal]);

  const handleOnSubmit = (values) => {
    const editPostContent = {
      title: values.editTitle,
      body: values.editBody,
      postId: showModal?.data?._id,
    };

    run(updatePost(editPostContent))
      .then(({ data }) => {
        addToast(data?.message, { appearance: "success" });
        setUpdate((prev) => !prev);
        setShowModal({ modalName: [], data: null });
      })
      .catch((e) => {
        console.log(e);
        e?.errors?.map((err) =>
          addToast(err?.message, { appearance: "error" })
        );
      });
  };
  return (
    <Modal
      onClose={() =>
        setShowModal({
          modalName: showModal.modalName?.slice(0, 1),
          data: null,
        })
      }
      closeIcon
      className="main-font"
      open={open}
      size="large"
    >
      <Modal.Header>Edit Post</Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{
            editTitle: showModal?.data?.title || "",
            editBody: showModal?.data?.body || "",
          }}
          enableReinitialize
          onSubmit={handleOnSubmit}
        >
          {(formik) => (
            <Form loading={isLoading} onSubmit={formik.submitForm}>
              <Form.Field required>
                <FormikControl
                  name="editTitle"
                  control={"input"}
                  label="Post Title"
                />
              </Form.Field>
              <Form.Field required>
                <FormikControl
                  name="editBody"
                  control={"textarea"}
                  label="Post Body"
                />
              </Form.Field>

              <div className="text-center mt-20">
                <Modal.Actions>
                  <Button
                    content="Confirm Edit"
                    labelPosition="right"
                    icon="checkmark"
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    color="teal"
                  />
                  <Button
                    color="red"
                    icon="times"
                    onClick={() => setShowModal({ modalName: [], data: null })}
                    content="Discard Changes"
                    disabled={isLoading}
                    basic
                  />
                </Modal.Actions>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Content>
    </Modal>
  );
};

export default EditPostModal;

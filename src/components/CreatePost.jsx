import { Button, Container } from "@chakra-ui/react";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { useCreatePostMutation } from "../store/slices/postsApi";
import { useState } from "react";

const initialValues = { title: "", body: "", userId: "ME" };

const CreatePost = () => {
  const navigate = useNavigate();
  const redirect = () => navigate("/");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [errorMessage, setErrorMessage] = useState(null);

  const createPostHandler = async ({ title, body, userId }) => {
    const newPost = { title, body, userId };
    try {
      setErrorMessage(null);
      await createPost(newPost).unwrap();
      redirect();
    } catch (err) {
      setErrorMessage(
        "Ошибка при создании поста: " + (err.message || "Неизвестная ошибка")
      );
      console.error("Ошибка при создании поста:", err);
    }
  };

  return (
    <Container>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          createPostHandler(values).finally(() => setSubmitting(false));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className="create-post-form" onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                required
              />
            </label>

            <label>
              Body:
              <textarea
                style={{
                  height: "200px",
                }}
                name="body"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                required
              />
            </label>

            <div className="actions">
              <Button type="submit" disabled={isLoading || isSubmitting}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
              <Button variant={"outline"} onClick={redirect}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CreatePost;

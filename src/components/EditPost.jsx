import { Button } from "@chakra-ui/react";
import { Formik } from "formik";
import { useEditPostMutation } from "../store/slices/postsApi";
import PropTypes from "prop-types";

const EditPost = ({ post, setOpen }) => {
  const [editPost, { isLoading }] = useEditPostMutation();

  const editPostHandler = async ({ title, body }) => {
    try {
      await editPost({ id: post.id, title, body }).unwrap();
      setOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Formik
      initialValues={{ title: post.title, body: post.body }}
      onSubmit={(values, { setSubmitting }) => {
        editPostHandler(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <label>
            Title:
            <input
              style={{
                width: "100%",
                border: "1px solid #ccc",
              }}
              name="title"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
          </label>
          <label>
            Body:
            <textarea
              style={{
                border: "1px solid #ccc",
                height: "200px",
                width: "100%",
              }}
              name="body"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.body}
            />
          </label>
          <Button type="submit" disabled={isLoading || isSubmitting}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

EditPost.propTypes = {
  post: PropTypes.object,
  setOpen: PropTypes.func,
};

export default EditPost;

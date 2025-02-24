import PropTypes from "prop-types";
import { Box, List } from "@chakra-ui/react";
import { LuCircleCheck } from "react-icons/lu";
import { useGetCommentsQuery } from "../store/slices/commentsApi";

const Comments = ({ post }) => {
  const { data: comments = [] } = useGetCommentsQuery(post.id);

  return (
    <div className="comments">
      <span className="title">Comments:</span>
      {comments.length === 0 ? (
        <Box background="tomato" width="100%" padding="4" color="white">
          No comments yet
        </Box>
      ) : (
        comments.map((comment) => (
          <List.Root key={comment.id} gap="2" variant="unordered">
            <List.Item>
              <List.Indicator asChild color="green.500">
                <LuCircleCheck />
              </List.Indicator>
              {comment.body}
            </List.Item>
            <List.Root ps="5">
              <List.Item className="name">{comment.name}</List.Item>
              <List.Item className="email">{comment.email}</List.Item>
            </List.Root>
          </List.Root>
        ))
      )}
    </div>
  );
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;

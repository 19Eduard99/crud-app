import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../store/slices/postsApi";
import { Container, Button } from "@chakra-ui/react";
import { SkeletonText } from "../components/ui/skeleton";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../components/ui/accordion";
import Drawer from "./Drawer";
import Comments from "./Comments";
import { useMemo } from "react";

const AllPosts = () => {
  const { data: posts = [], isLoading } = useGetPostsQuery();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const reversedPosts = useMemo(() => [...posts].reverse(), [posts]);
  return (
    <Container>
      <AccordionRoot collapsible>
        {isLoading && <SkeletonText noOfLines={100} gap="5" />}
        {reversedPosts.map((post) => (
          <AccordionItem key={post.id} value={post.id}>
            <AccordionItemTrigger>
              <span className="title">Title:</span>
              {post.title}
            </AccordionItemTrigger>
            <AccordionItemContent>
              <div>
                <span className="title">Body:</span>
                {post.body}
              </div>
              <div className="actions">
                <Drawer post={post} />
                <Button
                  onClick={() => deletePost(post.id)}
                  colorPalette={"red"}
                  variant="outline"
                  size="md"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
              <Comments post={post} />
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Container>
  );
};

export default AllPosts;

import {
  Button,
  DrawerContext,
  DrawerHeader,
  DrawerTitle,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "../components/ui/drawer";
import EditPost from "./EditPost";
import { useState } from "react";

const Drawer = ({ post }) => {
  const [open, setOpen] = useState(false);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button colorPalette={"green"} variant="outline" size="sm">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerContext>
          {() => (
            <>
              <DrawerHeader>
                <DrawerTitle>{`Edit Post`}</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <EditPost post={post} setOpen={setOpen} />
              </DrawerBody>
            </>
          )}
        </DrawerContext>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

Drawer.propTypes = {
  post: PropTypes.object,
};

export default Drawer;

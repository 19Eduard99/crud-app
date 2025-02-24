import { Routes, Route } from "react-router";
import AllPosts from "./components/AllPosts";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="create" element={<CreatePost />} />
      </Routes>
    </>
  );
};

export default App;

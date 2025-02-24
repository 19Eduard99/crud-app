import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="header">
      <nav className="navigation">
        <NavLink to="/">All Posts</NavLink>
        <NavLink to="/create">Create Post</NavLink>
      </nav>
    </header>
  );
};

export default Header;

import { Outlet, Link } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <ul className="flex gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
            <ul className="list-disc">
              <li>
                <Link to="/profile/settings">Settings</Link>
              </li>

            </ul>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;

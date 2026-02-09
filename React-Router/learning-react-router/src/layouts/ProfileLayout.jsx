import { Outlet, Link } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div>
      <h2 className="text-yellow-500 text-4xl">Profile Overview</h2>
      <Link to="settings">Settings</Link>
      <Outlet />
    </div>
  );
};

export default ProfileLayout;
import { Link } from "react-router-dom";
import authStore from "../stores/authStore";
import logo from "../assets/logo.png";
export default function Header() {
  const store = authStore();
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <Link to="/">
          <img src={logo} alt="logo" className="w-4/12" />
        </Link>
      </div>
      <div className="">
        <ul className="flex gap-5">
          <li>
            <Link to="/">
              <button className="btn btn-outline">home</button>
            </Link>
          </li>
          {store.loggedIn ? (
            <>
              <li>
                <Link to="/logout">
                  <button className="btn btn-outline">logout</button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  {" "}
                  <button className="btn btn-outline">login</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  {" "}
                  <button className="btn btn-outline">signup</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

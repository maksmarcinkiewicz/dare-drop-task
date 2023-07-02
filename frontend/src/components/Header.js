import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/">Streamers Spotlight App</Link>
      </div>
      <div className="">
        <ul className="flex gap-5">
          <li>
            <Link to="/">
              <button className="btn btn-outline">home</button>
            </Link>
          </li>
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
          <li>
            <Link to="/logout">
              {" "}
              <button className="btn btn-outline">logout</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

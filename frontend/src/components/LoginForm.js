import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
    navigate("/");
  };
  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          onChange={store.updateLoginForm}
          value={store.loginForm.email}
          type="email"
          name="email"
          className="input input-bordered w-full max-w-xs"
          placeholder="email@email.com"
        />
        <input
          onChange={store.updateLoginForm}
          value={store.loginForm.password}
          type="password"
          name="password"
          className="input input-bordered w-full max-w-xs"
          placeholder="password"
        />
        <button type="submit" className="btn btn-outline ">
          Login
        </button>
      </form>
    </div>
  );
}

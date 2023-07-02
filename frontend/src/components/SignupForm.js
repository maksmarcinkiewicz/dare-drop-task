import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await store.signup();
    navigate("/login");
  };
  return (
    <div className="flex justify-center items-center">
      {" "}
      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.email}
          type="email"
          name="email"
          className="input input-bordered w-full max-w-xs"
          placeholder="email@email.com"
        />
        <input
          onChange={store.updateSignupForm}
          value={store.signupForm.password}
          type="password"
          name="password"
          className="input input-bordered w-full max-w-xs"
          placeholder="password"
        />
        <button className="btn btn-outline " type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
}

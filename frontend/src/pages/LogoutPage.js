import { useEffect } from "react";
import authStore from "../stores/authStore";

export default function LogoutPage() {
  const store = authStore();
  useEffect(() => {
    store.logout();
  }, []);
  return (
    <div className="flex items-center justify-center mt-56 text-5xl">
      YOU ARE NOW LOGGED OUT
    </div>
  );
}

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUser } from "./context/userContext";
import { required } from "./utils/validation";
import Profile from "./components/Profile";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface ErrorState {
  name: string | null;
  email: string | null;
  password: string | null;
}

export default function App() {
  const { user, logout, login } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorState>({
    name: null,
    email: null,
    password: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: ErrorState = {
      name: required(formData.name, "Please enter your name!"),
      email: required(formData.email, "Please enter your email!"),
      password: required(formData.password, "Please enter your password"),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err !== null)) {
      return;
    }

    console.log(formData);
    login({
      id: Date.now(),
      email: formData.email,
      name: formData.name,
      password: formData.password,
    });

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="text-center">
      <nav className="flex items-center justify-between !px-5 bg-black text-white !py-5">
        <span>My App</span>
        {user ? (
          <button className="cursor-pointer" onClick={logout}>
            Logout
          </button>
        ) : (
          <p>You are not logged in!</p>
        )}
      </nav>

      {user ? (
        <Profile />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="!mt-20 flex flex-col gap-5 items-center"
        >
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              className={`bg-[#e5e5e5] !p-4 w-100 outline-none rounded-2xl text-black placeholder:text-black ${
                errors.name && "!border !border-red-500"
              }`}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <span className="text-red-500 !mr-auto">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className={`bg-[#e5e5e5] !p-4 w-100 outline-none rounded-2xl text-black placeholder:text-black ${
                errors.email && "!border !border-red-500"
              }`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500 !mr-auto">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Password"
              className={`bg-[#e5e5e5] !p-4 w-100 outline-none rounded-2xl text-black placeholder:text-black ${
                errors.password && "!border !border-red-500"
              }`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500 !mr-auto">{errors.password}</span>
            )}
          </div>
          <button className="bg-black !py-3 !px-9 text-white font-medium rounded-3xl border-none cursor-pointer">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

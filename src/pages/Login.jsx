import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ThemeToggle from "../components/ThemeToggle";
import { FaGoogle } from "react-icons/fa";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!form.email || !form.password) {
      toast.error("Please fill all required fields");
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    }

    if (
      form.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Invalid email format";
      toast.error("Invalid email format");
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        storedUser?.email === form.email &&
        storedUser?.password === form.password
      ) {
        toast.success("Login successful");
      } else {
        toast.error("Wrong email or password");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl animate-fadeIn">

        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <p className="text-red-500 text-sm">
            {errors.email}
          </p>

          <div className="relative mt-4">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 border rounded"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

          <p className="text-red-500 text-sm">
            {errors.password}
          </p>

          <div className="flex justify-between mt-4 text-sm">
            <label>
              <input
                type="checkbox"
                onChange={(e) =>
                  setForm({
                    ...form,
                    remember: e.target.checked,
                  })
                }
              />
              Remember Me
            </label>

            <button type="button">
              Forgot Password?
            </button>
          </div>

          <button
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <button
            type="button"
            className="w-full mt-3 border py-3 rounded flex justify-center items-center gap-2"
          >
            <FaGoogle />
            Continue with Google
          </button>

        </form>

        <p className="text-center mt-4">
          Don't you have an account?
          <Link
            to="/signup"
            className="text-blue-600 ml-1"
          >
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
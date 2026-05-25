import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const err = {};

    if (!form.name) err.name = "Name is required";

    if (!form.email) err.email = "Email is required";

    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      err.email = "Invalid email format";
      toast.error("Invalid email format");
    }

    if (form.password.length < 8) {
      err.password = "Password must contain 8 characters";
    }

    if (form.password !== form.confirmPassword) {
      err.confirmPassword = "Passwords do not match";

      toast.error("Passwords do not match");
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      );

      toast.success("Signup successful");

      setLoading(false);

      navigate("/");
    }, 1500);
  };

  return (
<div className="min-h-[calc(100vh-72px)] flex justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Signup
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            className="w-full border p-3 rounded mt-3"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <p className="text-red-500 text-sm">{errors.name}</p>

          <input
            placeholder="Email"
            className="w-full border p-3 rounded mt-3"
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <p className="text-red-500 text-sm">{errors.email}</p>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border p-3 rounded mt-3"
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <p className="text-red-500 text-sm">{errors.password}</p>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full border p-3 rounded mt-3"
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />

          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>

          <button
            type="button"
            className="mt-2 text-blue-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>

          <button className="w-full bg-green-600 text-white py-3 rounded mt-4">
            {loading ? "Loading..." : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link to="/" className="text-blue-600 dark:text-blue-400 ml-1">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

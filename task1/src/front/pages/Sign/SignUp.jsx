import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputField({ type, name, placeholder, value, onChange, error }) {
  return (
    <div className="flex-1">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full p-4 rounded-lg bg-gray-900 border ${
          error ? "border-red-500" : "border-violet"
        } text-white placeholder-violet`}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default function SignUp() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (isSignUp) {
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";

      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
    }

    return newErrors;
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  if (isSignUp) {
    console.log("Sign up data:", formData);
    // Ici tu pourrais envoyer la requête API pour créer le compte
  } else {
    console.log("Sign in data:", formData);
  }

  // Naviguer vers store dans les deux cas
  navigate("/store");
};

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Form Section */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="font-modern-negra text-4xl mb-2">
              {isSignUp ? "Create account" : "Sign in"}
            </h1>
            <p className="font-modern-negra text-gray-400">Just do it</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            {/* Password + Confirm Password */}
            <div className="flex gap-4">
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              {isSignUp && (
                <InputField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              )}
            </div>

            {isSignUp && (
              <InputField
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
              />
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-white focus:ring-white mr-2"
                  />
                  <span className="text-gray-400">Remember me</span>
                </label>
                <button className="text-gray-400 hover:text-violet">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="font-modern-negra w-full bg-violet text-black py-4 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              {isSignUp ? "Create account" : "Sign in"}
            </button>

            <div className="text-center">
              <p className="text-gray-400">
                {isSignUp
                  ? "Already have an account?"
                  : "Don’t have an account yet?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-white font-modern-negra hover:underline"
                >
                  {isSignUp ? "Sign in" : "Create an account"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex flex-1 items-center pl-[20%]">
        <div className="w-full h-full relative overflow-hidden">
          <video
            src="/videos/nikeSign.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-[70%] h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
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
    console.log("Données de connexion :", formData);
    navigate("/store");
  };

  const inputClass = (error) =>
    `w-full p-4 rounded-lg bg-gray-900 border ${
      error ? "border-red-500" : "border-violet"
    } text-white placeholder-violet focus:outline-none focus:border-white transition-colors`;

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Section Formulaire */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="font-modern-negra text-4xl mb-2">Sign in</h1>
            <p className="font-modern-negra text-gray-400">just do it</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass(errors.email)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={inputClass(errors.password)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-white focus:ring-white focus:ring-2 mr-2"
                />
                <span className="text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-gray-400 hover:text-violet transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="font-modern-negra w-full bg-violet text-black py-4 rounded-lg font-semibold hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Sign in
            </button>

            {/* Redirection */}
            <div className="text-center">
              <p className="text-gray-400">
                Don’t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-white font-modern-negra hover:text-violet transition-colors"
                >
                  Create an account
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Section Vidéo */}
      <div className="flex flex-1 justify-center items-center justify-end">
        <div className="w-full h-full relative overflow-hidden ml-[20%]">
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

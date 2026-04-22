import { useContext, useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { authContext } from "../../controllers/AuthController";
import { validateSignIn, type ValidationError } from "../../utils/validation";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(authContext)!;

  const handleSubmit = async function (e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      // Validate input
      const validationErrors = validateSignIn(email, password);

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      // Perform sign in
      const result = await signIn(email, password);
      
      if (!result.success) {
        // Special case for unverified email
        if (result.error?.includes("Email not confirmed")) {
          setErrors([{ field: "form", message: "Please verify your email before signing in. Check your inbox for a link." }]);
        } else {
          setErrors([{ field: "form", message: result.error || "Invalid credentials" }]);
        }
      } else {
        // Clear form on success
        setEmail("");
        setPassword("");
        // Navigate to home after successful signin
        navigate("/home");
      }
    } catch (error) {
      setErrors([{ field: "form", message: "An unexpected error occurred" }]);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get error for a specific field
  const getFieldError = (fieldName: string): string | null => {
    const error = errors.find((err) => err.field === fieldName);
    return error ? error.message : null;
  };

  return (
    <div className="bg-bg-color min-h-screen pt-32 pb-20 px-6 text-white overflow-hidden">
      <div className="flex justify-center items-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-linear-to-r from-white to-white/40 bg-clip-text text-transparent">
            Welcome Back
          </h1>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Display form errors */}
            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
                {errors.map((error, idx) => (
                  <p key={idx} className="text-red-400 text-sm">
                    {error.message}
                  </p>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter your Email"
                className={`bg-white/5 border rounded-xl px-4 py-4 focus:bg-white/10 focus:outline-none transition-all duration-300 ${
                  getFieldError("email")
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                }`}
                required
              />
              {getFieldError("email") && (
                <span className="text-red-400 text-xs">{getFieldError("email")}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="••••••••"
                className={`bg-white/5 border rounded-xl px-4 py-4 focus:bg-white/10 focus:outline-none transition-all duration-300 ${
                  getFieldError("password")
                    ? "border-red-500/50 focus:border-red-500"
                    : "border-white/10 focus:border-primary"
                }`}
                required
              />
              {getFieldError("password") && (
                <span className="text-red-400 text-xs">{getFieldError("password")}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-primary text-bg-color font-black py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Access Library"}
            </button>

            <button
              type="button"
              className="mt-2 bg-transparent text-white/40 py-2 rounded-md hover:text-primary transition-colors cursor-pointer uppercase text-[10px] tracking-widest font-bold"
              onClick={() => {
                navigate("/sign-up");
              }}
            >
              New to the archive? Sign Up
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

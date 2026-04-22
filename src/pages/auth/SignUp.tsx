import { useContext, useState, type SubmitEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { authContext } from "../../controllers/AuthController";
import { validateSignUp, type ValidationError } from "../../utils/validation";

export default function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const [verificationRequired, setVerificationRequired] = useState(false);
  const { signUp } = useContext(authContext)!;

  const handleSubmit = async function (e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors([]);
    setVerificationRequired(false);
    setLoading(true);

    try {
      // Validate input
      const validationErrors = validateSignUp(email, password, confirmPassword, userName);

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }

      // Perform sign up
      const result = await signUp(email, password, userName);
      if (!result.success) {
        setErrors([{ field: "form", message: result.error || "Signup failed" }]);
      } else if (result.needsVerification) {
        setVerificationRequired(true);
        // Clear form on success
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUserName("");
      } else {
        // Clear form on success
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUserName("");
        // Navigate to home after successful signup
        navigate("/home");
      }
    } catch (error) {
      setErrors([{ field: "form", message: "An unexpected error occurred" }]);
      console.log(error);
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
            Join CineBase
          </h1>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Verification message */}
            {verificationRequired && (
              <div className="bg-primary/20 border border-primary/50 rounded-xl p-6 text-center">
                <p className="text-primary font-bold mb-2">Check your inbox!</p>
                <p className="text-white/80 text-sm">
                  We've sent a verification link to your email. Please verify your account to continue.
                </p>
              </div>
            )}

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
              <label htmlFor="username" className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                placeholder="Enter your username"
                className={`bg-white/5 border rounded-xl px-4 py-4 focus:bg-white/10 focus:outline-none transition-all duration-300 ${getFieldError("username")
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-primary"
                  }`}
                required
              />
              {getFieldError("username") && (
                <span className="text-red-400 text-xs">{getFieldError("username")}</span>
              )}
            </div>

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
                className={`bg-white/5 border rounded-xl px-4 py-4 focus:bg-white/10 focus:outline-none transition-all duration-300 ${getFieldError("email")
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
                className={`bg-white/5 border rounded-xl px-4 py-4 focus:bg-white/10 focus:outline-none transition-all duration-300 ${getFieldError("password")
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-primary"
                  }`}
                required
              />
              {getFieldError("password") && (
                <span className="text-red-400 text-xs">{getFieldError("password")}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="text-xs font-bold text-primary uppercase tracking-[0.2em]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="••••••••"
                className={`bg-white/5 border rounded-xl px-4 py-4 focus:bg-white/10 focus:outline-none transition-all duration-300 ${getFieldError("confirmPassword")
                  ? "border-red-500/50 focus:border-red-500"
                  : "border-white/10 focus:border-primary"
                  }`}
                required
              />
              {getFieldError("confirmPassword") && (
                <span className="text-red-400 text-xs">{getFieldError("confirmPassword")}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-primary text-bg-color font-black py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <button
              type="button"
              className="mt-2 bg-transparent text-white/40 py-2 rounded-md hover:text-primary transition-colors cursor-pointer uppercase text-[10px] tracking-widest font-bold"
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Already a member? Sign In
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Zap,
  Mail,
  Lock,
  User,
  Shield,
  AlertCircle,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const watchPassword = watch("password");
  const watchRole = watch("role");

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      const axiosErr = err;
      const msg =
        axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        "Registration failed. Please try again.";
      setServerError(msg);
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[rgba(232,255,71,0.25)] focus:border-[rgba(232,255,71,0.4)]";
  const inputStyle = (hasError) => ({
    background: "var(--input)",
    border: `1px solid ${hasError ? "rgba(255,68,68,0.5)" : "var(--border)"}`,
    color: "var(--foreground)",
    fontFamily: "var(--font-body)",
  });

  // Password strength
  const getStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    // if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    // if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = getStrength(watchPassword);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ff4444", "#f59e0b", "#3b82f6", "#4ade80"][
    strength
  ];

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <div className="text-center px-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              background: "rgba(74,222,128,0.1)",
              border: "1px solid rgba(74,222,128,0.3)",
            }}
          >
            <CheckCircle2 size={36} style={{ color: "#4ade80" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Account Created!
          </h2>
          <p
            className="text-sm mb-1"
            style={{ color: "var(--muted-foreground)" }}
          >
            Your account has been created successfully.
          </p>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Redirecting to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)" }}
    >
      {/* ── Left decorative panel ── */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(232,255,71,0.06) 0%, transparent 60%)",
          }}
        />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary)" }}
          >
            <Zap size={18} fill="black" style={{ color: "black" }} />
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Learn<span style={{ color: "var(--primary)" }}>Hub</span>
          </span>
        </Link>

        {/* Center */}
        <div className="relative z-10">
          <h1
            className="text-4xl font-bold leading-[1.15] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Join thousands of
            <span className="block gradient-text">learners & educators</span>
          </h1>
          <p
            className="text-sm leading-relaxed mb-10"
            style={{ color: "var(--muted-foreground)" }}
          >
            Create your account and start publishing courses, tracking progress,
            and building your community today.
          </p>

          {/* Feature list */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: "🎥",
                title: "Upload unlimited courses",
                sub: "HD video hosting included",
              },
              {
                icon: "👥",
                title: "Manage your students",
                sub: "Built-in analytics & insights",
              },
              {
                icon: "🛡️",
                title: "Role-based access",
                sub: "Admin & user permissions",
              },
            ].map(({ icon, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                }}
              >
                <span className="text-xl">{icon}</span>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          className="text-xs relative z-10"
          style={{ color: "var(--muted-foreground)" }}
        >
          © {new Date().getFullYear()} LearnHub. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-8 lg:hidden"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <Zap size={15} fill="black" style={{ color: "black" }} />
            </div>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Learn<span style={{ color: "var(--primary)" }}>Hub</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              Create account
            </h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold transition-opacity hover:opacity-70"
                style={{ color: "var(--primary)" }}
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Server error */}
          {serverError && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6 text-sm"
              style={{
                background: "rgba(255,68,68,0.08)",
                border: "1px solid rgba(255,68,68,0.25)",
                color: "#ff6b6b",
              }}
            >
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {/* Name */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  className={inputBase}
                  style={inputStyle(!!errors.name)}
                  {...register("name", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                  })}
                />
              </div>
              {errors.name && (
                <p
                  className="flex items-center gap-1.5 text-xs mt-1.5"
                  style={{ color: "var(--destructive)" }}
                >
                  <AlertCircle size={11} />
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="john@example.com"
                  className={inputBase}
                  style={inputStyle(!!errors.email)}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p
                  className="flex items-center gap-1.5 text-xs mt-1.5"
                  style={{ color: "var(--destructive)" }}
                >
                  <AlertCircle size={11} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["user", "admin"].map((role) => (
                  <label
                    key={role}
                    className="relative flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      background:
                        watchRole === role
                          ? "rgba(232,255,71,0.06)"
                          : "var(--input)",
                      border: `1px solid ${watchRole === role ? "rgba(232,255,71,0.35)" : "var(--border)"}`,
                    }}
                  >
                    <input
                      type="radio"
                      value={role}
                      className="sr-only"
                      {...register("role", { required: true })}
                    />
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background:
                          watchRole === role
                            ? "rgba(232,255,71,0.15)"
                            : "rgba(255,255,255,0.04)",
                      }}
                    >
                      {role === "user" ? (
                        <User
                          size={15}
                          style={{
                            color:
                              watchRole === role
                                ? "var(--primary)"
                                : "var(--muted-foreground)",
                          }}
                        />
                      ) : (
                        <Shield
                          size={15}
                          style={{
                            color:
                              watchRole === role
                                ? "var(--primary)"
                                : "var(--muted-foreground)",
                          }}
                        />
                      )}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold capitalize"
                        style={{
                          color:
                            watchRole === role
                              ? "var(--primary)"
                              : "var(--foreground)",
                        }}
                      >
                        {role}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {role === "user" ? "Course access" : "Full control"}
                      </p>
                    </div>
                    {watchRole === role && (
                      <div
                        className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "var(--primary)" }}
                      >
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path
                            d="M1 3L3 5L7 1"
                            stroke="black"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className={`${inputBase} pr-11`}
                  style={inputStyle(!!errors.password)}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <p
                  className="flex items-center gap-1.5 text-xs mt-1.5"
                  style={{ color: "var(--destructive)" }}
                >
                  <AlertCircle size={11} />
                  {errors.password.message}
                </p>
              )}
              {/* Strength bar */}
              {watchPassword && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background:
                            i <= strength ? strengthColor : "var(--border)",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColor }}>
                    {strengthLabel} password
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{
                  color: "var(--muted-foreground)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat your password"
                  className={`${inputBase} pr-11`}
                  style={inputStyle(!!errors.confirmPassword)}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) =>
                      val === watchPassword || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p
                  className="flex items-center gap-1.5 text-xs mt-1.5"
                  style={{ color: "var(--destructive)" }}
                >
                  <AlertCircle size={11} />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                background: "var(--primary)",
                color: "black",
                fontFamily: "var(--font-display)",
                boxShadow: "0 0 30px rgba(232,255,71,0.12)",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div
              className="flex-1 h-px"
              style={{ background: "var(--border)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--muted-foreground)" }}
            >
              or
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--border)" }}
            />
          </div>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-display)",
            }}
          >
            ← Back to Sign In
          </Link>

          <p
            className="text-center text-xs mt-6"
            style={{ color: "var(--muted-foreground)" }}
          >
            By registering you agree to our{" "}
            <span
              className="underline cursor-pointer hover:opacity-70"
              style={{ color: "var(--primary)" }}
            >
              Terms
            </span>{" "}
            and{" "}
            <span
              className="underline cursor-pointer hover:opacity-70"
              style={{ color: "var(--primary)" }}
            >
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

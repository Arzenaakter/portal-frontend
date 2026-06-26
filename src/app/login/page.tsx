"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Zap,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { loginApi, setToken, setUser, isAuthenticated } from "@/lib/auth";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: { email: "", password: "" },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) router.replace("/admin");
  }, [router]);

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const res = await loginApi(data);
      setToken(res.token);
      setUser(res.user);
      router.push("/admin");
    } catch (err: unknown) {
      // Axios error shape
      const axiosErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      const msg =
        axiosErr?.response?.data?.message ||
        axiosErr?.response?.data?.error ||
        axiosErr?.message ||
        "Something went wrong. Please try again.";
      setServerError(msg);
    }
  };

  const inputBase =
    "w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-200";
  const inputStyle = {
    background: "var(--input)",
    border: "1px solid var(--border)",
    color: "var(--foreground)",
    fontFamily: "var(--font-body)",
  };
  const inputFocusClass =
    "focus:ring-2 focus:ring-[rgba(232,255,71,0.25)] focus:border-[rgba(232,255,71,0.4)]";

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "var(--background)" }}
    >
      {/* ── Left panel (decorative) ── */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden flex-col justify-between p-12"
        style={{
          background: "var(--card)",
          borderRight: "1px solid var(--border)",
        }}
      >
        {/* Background glow */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(232,255,71,0.07) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(71,200,232,0.04)" }}
        />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
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
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{
              background: "rgba(232,255,71,0.08)",
              color: "var(--primary)",
              border: "1px solid rgba(232,255,71,0.15)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--primary)" }}
            />
            Admin Portal
          </div>

          <h1
            className="text-5xl font-bold leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Manage your
            <span className="block gradient-text">learning platform</span>
            with ease.
          </h1>

          <p
            className="text-base leading-relaxed mb-10"
            style={{ color: "var(--muted-foreground)" }}
          >
            Upload courses, track student progress, and grow your community —
            all from one powerful dashboard.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            {[
              { val: "500+", label: "Courses" },
              { val: "50k+", label: "Students" },
              { val: "4.9★", label: "Rating" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div
                  className="text-2xl font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--primary)",
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div
          className="relative z-10 rounded-2xl p-5"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: "var(--muted-foreground)" }}
          >
            &quot;LearnHub transformed how we deliver technical education. The
            admin tools are intuitive and powerful.&quot;
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--primary)", color: "black" }}
            >
              Y
            </div>
            <div>
              <p
                className="text-xs font-semibold"
                style={{ color: "var(--foreground)" }}
              >
                Arzena Akter
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--muted-foreground)" }}
              >
                Platform Administrator
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel (form) ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-10 lg:hidden">
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
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2
              className="text-3xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--foreground)",
              }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Sign in to your admin account to continue
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

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
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
                  placeholder="admin@learnhub.com"
                  className={`${inputBase} ${inputFocusClass}`}
                  style={{
                    ...inputStyle,
                    borderColor: errors.email
                      ? "rgba(255,68,68,0.5)"
                      : undefined,
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
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

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block text-xs font-semibold uppercase tracking-wider"
                  style={{
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-medium transition-opacity hover:opacity-70"
                  style={{ color: "var(--primary)" }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--muted-foreground)" }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••••"
                  className={`${inputBase} pr-11 ${inputFocusClass}`}
                  style={{
                    ...inputStyle,
                    borderColor: errors.password
                      ? "rgba(255,68,68,0.5)"
                      : undefined,
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: "var(--muted-foreground)" }}
                  tabIndex={-1}
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
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="peer sr-only" id="remember" />
                <div
                  className="w-4 h-4 rounded flex items-center justify-center transition-all peer-checked:opacity-100"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--input)",
                  }}
                >
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    className="opacity-0 peer-checked:opacity-100"
                  >
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#e8ff47"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <span
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Remember me for 30 days
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                background: "var(--primary)",
                color: "black",
                fontFamily: "var(--font-display)",
                boxShadow: "0 0 30px rgba(232,255,71,0.15)",
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
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

          {/* Back to site */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted-foreground)",
              fontFamily: "var(--font-display)",
            }}
          >
            ← Back to Homepage
          </Link>

          <p
            className="text-center text-xs mt-8"
            style={{ color: "var(--muted-foreground)" }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ color: "var(--primary)" }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

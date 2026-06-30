import { Zap } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
        style={{ background: "var(--primary)" }}
      >
        <Zap
          size={16}
          style={{ color: "var(--background)" }}
          fill="currentColor"
        />
      </div>
      <span
        className="text-lg font-bold"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--foreground)",
        }}
      >
        Learn<span style={{ color: "var(--primary)" }}>Hub</span>
      </span>
    </Link>
  );
};

export default Logo;

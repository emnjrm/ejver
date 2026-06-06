import { Link, useRouter, useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import sssLogo from "@/assets/SSS_logo.svg";
import { motion } from "framer-motion";

interface Props {
  user?: { email?: string | null } | null;
  isAdmin?: boolean;
}

export function SssHeader({ user, isAdmin }: Props) {
  const router = useRouter();
  const location = useLocation();

  async function signOut() {
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="no-print">
      {/* Top navy band */}
      <div className="bg-sss-navy-dark text-white text-xs">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <span className="opacity-90">Republic of the Philippines</span>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <span className="opacity-80 hidden sm:inline">{user.email}</span>
                <button onClick={signOut} className="underline hover:opacity-80">
                  Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link to="/auth" className="hover:underline">
                  Sign In
                </Link>
                <Link to="/auth" className="hover:underline">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main brand band */}
      <div className="bg-sss-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <img src={sssLogo} alt="SSS seal" className="h-14 w-14 bg-white rounded-sm p-1" />
          <div className="flex-1">
            <div className="text-[10px] tracking-widest uppercase opacity-80">
              Republic of the Philippines
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Social Security System</h1>
            <div className="text-xs opacity-90">Member Services Portal</div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Band */}
      {user && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 flex gap-1 pt-3">
            {[
              { to: "/dashboard", label: "My Applications" },
              { to: "/apply", label: "Apply" },
              ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
              { to: "/settings", label: "Settings" }
            ].map((link) => {
              const isActive = location.pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-5 py-3 text-sm font-bold transition-colors rounded-t-lg
                    ${isActive 
                      ? "bg-white text-[#1a365d]" 
                      : "text-gray-500 hover:text-gray-700 bg-transparent"
                    }
                  `}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="mainNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-[#e09f3e]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

export function SssFooter() {
  return (
    <footer className="no-print mt-12 border-t bg-sss-navy-dark text-white/80 text-xs">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-end gap-2">
        <span>SSS Copyright © 2026</span>
      </div>
    </footer>
  );
}

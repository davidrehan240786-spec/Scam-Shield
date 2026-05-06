import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

/**
 * Handles the OAuth redirect callback from Supabase.
 * Waits for the session to be established, syncs Google profile
 * data into the profiles table, then redirects to the dashboard.
 */
export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase JS automatically picks up the token from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Auth callback error:", error.message);
          navigate("/login");
          return;
        }

        if (session?.user) {
          const user = session.user;
          const meta = user.user_metadata;

          // Upsert profile with latest Google data
          await supabase.from("profiles").upsert(
            {
              id: user.id,
              full_name: meta?.full_name || meta?.name || null,
              avatar_url: meta?.avatar_url || meta?.picture || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "id" }
          );

          navigate("/dashboard", { replace: true });
        } else {
          // No session yet — wait for auth state change
          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
              if (event === "SIGNED_IN" && session?.user) {
                const user = session.user;
                const meta = user.user_metadata;

                await supabase.from("profiles").upsert(
                  {
                    id: user.id,
                    full_name: meta?.full_name || meta?.name || null,
                    avatar_url: meta?.avatar_url || meta?.picture || null,
                    updated_at: new Date().toISOString(),
                  },
                  { onConflict: "id" }
                );

                subscription.unsubscribe();
                navigate("/dashboard", { replace: true });
              }
            }
          );

          // Timeout fallback — redirect to login after 10s
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 10000);
        }
      } catch (err) {
        console.error("Auth callback failed:", err);
        navigate("/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="size-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        <p className="text-white/60 animate-pulse font-medium tracking-wide">
          Completing sign in...
        </p>
      </div>
    </div>
  );
}

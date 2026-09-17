import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Profile = { id: string; display_name: string };

type AuthValue = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthValue>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signOut: async () => {},
  refreshProfile: async () => {},
});

const NAME_STORAGE_KEY = "stillpoint:name";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (userId: string, fallbackName: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name")
      .eq("id", userId)
      .maybeSingle();

    if (data) {
      setProfile(data as Profile);
      return;
    }

    const stored = window.localStorage.getItem(NAME_STORAGE_KEY);
    const rawName = stored || fallbackName || "Friend";
    const display_name =
      (rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase()).slice(0, 40);
    const { data: created } = await supabase
      .from("profiles")
      .insert({ id: userId, display_name })
      .select("id, display_name")
      .maybeSingle();
    setProfile((created as Profile) ?? { id: userId, display_name });
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
      if (nextSession?.user) {
        const u = nextSession.user;
        const fallback =
          (u.user_metadata?.display_name as string) ||
          (u.user_metadata?.full_name as string) ||
          (u.email ? u.email.split("@")[0] : "Friend");
        setTimeout(() => void loadProfile(u.id, fallback), 0);
      } else {
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      if (data.session?.user) {
        const u = data.session.user;
        const fallback =
          (u.user_metadata?.display_name as string) ||
          (u.user_metadata?.full_name as string) ||
          (u.email ? u.email.split("@")[0] : "Friend");
        void loadProfile(u.id, fallback);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const value: AuthValue = {
    user: session?.user ?? null,
    session,
    profile,
    loading,
    signOut: async () => {
      await supabase.auth.signOut();
      setProfile(null);
    },
    refreshProfile: async () => {
      if (session?.user) await loadProfile(session.user.id, "Friend");
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

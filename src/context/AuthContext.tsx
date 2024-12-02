import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";

type Role = "admin" | "user";

type AuthContextType = {
  user: User | null;
  role: Role | null;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data.session?.user || null;
      setUser(currentUser);

      // Si un utilisateur est connecté, récupérer son rôle
      if (currentUser) {
        void fetchRole(currentUser.id);
      }
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user || null;
        setUser(currentUser);

        if (currentUser) {
          void fetchRole(currentUser.id);
        } else {
          setRole(null);
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe(); // Nettoyage de l'abonnement
    };
  }, []);

  const fetchRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching role:", error.message);
      } else {
        setRole(data.role as Role);
      }
    } catch (err) {
      console.error("Unexpected error fetching role:", err);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

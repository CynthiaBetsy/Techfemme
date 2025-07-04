import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc as firestoreDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

// Authenticated user shape
export interface AuthUser {
  uid: string;
  email: string | null;
  firstname?: string;
  isAdmin: boolean;
}

// Context value type
export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
}

// Create and export context
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
});
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch and set user data from Firestore
  const fetchUser = async (firebaseUser: FirebaseUser) => {
    try {
      const snap = await getDoc(firestoreDoc(db, "users", firebaseUser.uid));
      const data = snap.exists() ? (snap.data() as Partial<AuthUser> & { role?: string }) : {};
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        firstname: data.firstname,
        isAdmin: data.role === "admin",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser({ uid: firebaseUser.uid, email: firebaseUser.email, isAdmin: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        fetchUser(firebaseUser);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
};
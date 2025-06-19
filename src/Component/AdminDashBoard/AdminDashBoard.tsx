import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; 
import UserTable from "./UserTable";
import { User } from "firebase/auth";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.displayName || "Admin"}</p>
          <UserTable/>
        </div>
      )}
    </div>
  );
}
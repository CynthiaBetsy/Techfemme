import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "sonner";

export interface Course {
  id: string;
  title: string;
  completion: number;
  students: number;
  status: "Active" | "Inactive";
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "courses"));
        setCourses(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Course, "id">) }))
        );
      } catch (err) {
        console.error(err);
        toast.error("Could not load courses.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const deleteCourse = useCallback(
    async (id: string) => {
      if (!window.confirm("Are you sure you want to delete this course?")) return;
      try {
        await deleteDoc(doc(db, "courses", id));
        setCourses((cs) => cs.filter((c) => c.id !== id));
        toast.success("Course deleted.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete.");
      }
    },
    []
  );

  return { courses, loading, deleteCourse };
}

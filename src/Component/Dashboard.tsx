import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {Card,CardContent,CardDescription,CardHeader, CardTitle,} from "../Component/ui/Card"; 
import {Avatar,AvatarFallback,AvatarImage,} from "../Component/ui/Avatar";
import { Button } from "../Component/ui/Button";
import { Progress } from "../Component/ui/Progress";
import {Tabs,TabsList,TabsTrigger,TabsContent,} from "../Component/ui/Tabs";
import Badge from "../Component/ui/badge";
import { Calendar, BookOpen, Award } from "lucide-react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL,} from "firebase/storage";
import { db } from "../firebase";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  estimatedTime: string;
  nextLesson: string;
}

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  country: string;
  avatar?: string;
  occupation?: string;
  joinDate: string;
  streak: number;
  totalHours: number;
  certificates: number;
  enrolledCourses: string[];
  studySchedule?: string;
  bio?: string;
}

const cardClass = "bg-white/80 backdrop-blur-sm border-purple-200";
const textPurple = "text-purple-800";

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <Card className={cardClass}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={textPurple}>{course.title}</CardTitle>
          <Badge className="bg-purple-100 text-purple-700">
            {course.progress}% Complete
          </Badge>
        </div>
        <CardDescription>
          {course.completedLessons} of {course.totalLessons} lessons completed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={course.progress} className="h-2" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-purple-600">Estimated Time</p>
            <p className="font-medium text-purple-800">
              {course.estimatedTime}
            </p>
          </div>
          <div>
            <p className="text-purple-600">Next Lesson</p>
            <p className="font-medium text-purple-800">{course.nextLesson}</p>
          </div>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [scheduleTime, setScheduleTime] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);

          // Temporary mocked course data based on enrolledCourses
          const mockedCourses = userData.enrolledCourses.map((course, idx) => ({
            id: `${idx}`,
            title: course,
            progress: 40,
            completedLessons: 4,
            totalLessons: 10,
            estimatedTime: "2 weeks",
            nextLesson: "Lesson 5",
          }));

          setCourses(mockedCourses);
          setScheduleTime(userData.studySchedule || "");
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const isNewUser = () => {
    if (!user?.joinDate) return false;
    const joinTime = new Date(user.joinDate).getTime();
    const now = new Date().getTime();
    return (now - joinTime) / 1000 / 60 < 1;
  };

  const handleSchedule = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser && scheduleTime) {
      try {
        await updateDoc(doc(db, "users", currentUser.uid), {
          studySchedule: scheduleTime,
        });
        toast.success("Study time scheduled!");
      } catch {
        toast.error("Failed to schedule study time");
      }
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (e.target.files?.[0] && currentUser) {
      try {
        const file = e.target.files[0];
        const storage = getStorage();
        const avatarRef = ref(storage, `avatars/${currentUser.uid}`);
        await uploadBytes(avatarRef, file);
        const avatarUrl = await getDownloadURL(avatarRef);

        const updatedUser = { ...user!, avatar: avatarUrl };
        await updateDoc(doc(db, "users", currentUser.uid), {
          avatar: avatarUrl,
        });
        setUser(updatedUser);
        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload profile picture.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
      console.error(error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <motion.div className="max-w-6xl mx-auto px-4 py-8 dark:bg-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      {/* Greeting Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
        <div className="relative group">
          <Avatar className="h-24 w-24 ring-4 ring-purple-300 dark:ring-purple-600 shadow-md">
            <AvatarImage src={user.avatar || undefined} alt={user.firstname} />
            <AvatarFallback>{user.firstname?.[0]}</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full cursor-pointer">
            <label htmlFor="avatar-upload" className="text-sm text-white font-medium cursor-pointer">Change</label>
            <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <h1>{isNewUser() ? `Welcome, ${user.firstname} 👋` : `Welcome back, ${user.firstname} 👋`}</h1>
          <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200">{user.enrolledCourses.join(", ")}</h3>
          {user.bio && <p className="text-sm mt-2 text-purple-800 italic dark:text-purple-300">{user.bio}</p>}
          <p className="text-sm text-purple-600 dark:text-purple-400">Member since {new Date(user.joinDate).toLocaleDateString()}</p>

        </div>
      </div>

      {/* Quick Actions */}
      <Card className={`${cardClass} shadow-sm mb-10`}>
        <CardHeader>
          <CardTitle className={textPurple}>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button variant="outline" className="flex items-center gap-2 w-full border-purple-300 text-purple-700 hover:bg-purple-50">
            <BookOpen className="h-5 w-5" />
            <span>Browse New Courses</span>
          </Button>

          <div className="flex flex-col gap-2 border border-purple-300 rounded-md p-3 text-purple-700">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <label htmlFor="studyTime" className="text-sm font-medium">Schedule Study Time</label>
            </div>
            <input
              id="studyTime"
              type="datetime-local"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="rounded border border-purple-300 p-1 text-sm"
            />
            <Button onClick={handleSchedule} className="bg-purple-600 text-white hover:bg-purple-700">Schedule</Button>
          </div>

          <Button variant="outline" className="flex items-center gap-2 w-full border-purple-300 text-purple-700 hover:bg-purple-50">
            <Award className="h-5 w-5" />
            <span>View Certificates</span>
          </Button>
        </CardContent>
      </Card>

      {/* Progress Tabs */}
      <Tabs defaultValue="courses" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-800">Your Progress</h2>
          <TabsList className="bg-purple-500 rounded-md p-1">
            <TabsTrigger value="courses" className="px-4 py-1 text-sm cursor-pointer">Courses</TabsTrigger>
            <TabsTrigger value="achievements" className="px-4 py-1 text-sm cursor-pointer">Achievements</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="courses">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {courses.length > 0 ? (
              courses.map((course) => <CourseCard key={course.id} course={course} />)
            ) : (
              <div className="col-span-full text-center text-purple-500 py-8">
                You are not enrolled in any courses yet.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "First Course Completed", description: "Completed Graphic Design course", earned: true },
              { title: "Warrior", description: "Completed 7 days of learning", earned: false },
              { title: "Master", description: "Complete 5 technical courses", earned: false },
            ].map((item, idx) => (
              <Card key={idx} className={`bg-white/80 backdrop-blur-sm border-purple-200 ${item.earned ? "" : "opacity-60"}`}>
                <CardContent className="p-6 text-center">
                  <Award className={`h-12 w-12 mx-auto mb-4 ${item.earned ? "text-yellow-500" : "text-gray-400"}`} />
                  <h3 className={`font-semibold mb-2 ${item.earned ? "text-purple-800" : "text-gray-600"}`}>{item.title}</h3>
                  <p className={`text-sm ${item.earned ? "text-purple-600" : "text-gray-500"}`}>{item.description}</p>
                  <Badge className={`mt-2 ${item.earned ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-600"}`}>{item.earned ? "Earned" : "Locked"}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Logout */}
      <div className="mt-10 flex justify-end">
        <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">
          Log Out
        </Button>
      </div>
    </motion.div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Component/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../Component/ui/Avatar";
import { Button } from "../Component/ui/Button";
import { Progress } from "../Component/ui/Progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Component/ui/Tabs";
import Badge from "../Component/ui/badge";
import { Calendar, BookOpen, Award } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";

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
  email: string;
  phone: string;
  avatar?: string;
  occupation: string;
  joinDate: string;
  streak: number;
  totalHours: number;
  certificates: number;
  enrolledCourses: Course[];
}

const cardClass = "bg-white/80 backdrop-blur-sm border-purple-200";
const textPurple = "text-purple-800";

const CourseCard = ({ course }: { course: Course }) => (
  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.4 }}>
    <Card className={cardClass}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={textPurple}>{course.title}</CardTitle>
          <Badge className="bg-purple-100 text-purple-700">{course.progress}% Complete</Badge>
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
            <p className="font-medium text-purple-800">{course.estimatedTime}</p>
          </div>
          <div>
            <p className="text-purple-600">Next Lesson</p>
            <p className="font-medium text-purple-800">{course.nextLesson}</p>
          </div>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Continue Learning</Button>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ firstname: "", phone: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser(userData);
          setFormData({ firstname: userData.firstname, phone: userData.phone });
          setCourses(userData.enrolledCourses || []);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser && user) {
      let avatarUrl = user.avatar;
      if (avatarFile) {
        const storage = getStorage();
        const avatarRef = ref(storage, `avatars/${currentUser.uid}`);
        await uploadBytes(avatarRef, avatarFile);
        avatarUrl = await getDownloadURL(avatarRef);
      }

      const updatedUser = { ...user, ...formData, avatar: avatarUrl };
      await setDoc(doc(db, "users", currentUser.uid), updatedUser);
      setUser(updatedUser);
      setIsEditing(false);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
  <motion.div className="max-w-6xl mx-auto px-4 py-8">
    {/* Profile Section */}
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
      <div className="relative">
        <Avatar className="h-24 w-24 ring-4 ring-purple-200 shadow-md">
          <AvatarImage src={user.avatar || undefined} alt={user.firstname} />
          <AvatarFallback>{user.firstname?.[0]}</AvatarFallback>
        </Avatar>
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="absolute top-full left-0 mt-2 text-sm"
          />
        )}
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-purple-700">Email</label>
          <p className="text-sm text-purple-600">{user.email}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-purple-700">Phone</label>
          {isEditing ? (
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 border border-purple-300 rounded p-2 w-full text-sm"
            />
          ) : (
            <p className="text-sm text-purple-600">{user.phone}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-purple-700">First Name</label>
          {isEditing ? (
            <input
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="mt-1 border border-purple-300 rounded p-2 w-full text-sm"
            />
          ) : (
            <p className="text-sm text-purple-600">{user.firstname}</p>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-purple-700">Member Since</label>
          <p className="text-sm text-purple-600">{new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>

    <div className="flex justify-end mb-6">
      {isEditing ? (
        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSave}>
          Save Profile
        </Button>
      ) : (
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      )}
    </div>

    {/* Quick Actions */}
    <Card className={`${cardClass} shadow-sm mb-10`}>
      <CardHeader>
        <CardTitle className={textPurple}>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <BookOpen className="h-5 w-5" />, label: "Browse New Courses" },
          { icon: <Calendar className="h-5 w-5" />, label: "Schedule Study Time" },
          { icon: <Award className="h-5 w-5" />, label: "View Certificates" }
        ].map((action, idx) => (
          <Button
            key={idx}
            variant="outline"
            className="flex items-center gap-2 w-full border-purple-300 text-purple-700 hover:bg-purple-50"
          >
            {action.icon}
            <span>{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>

    {/* Tabs Section */}
    <Tabs defaultValue="courses" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-800">Your Progress</h2>
        <TabsList className="bg-purple-50 rounded-md p-1">
          <TabsTrigger value="courses" className="px-4 py-1 text-sm">Courses</TabsTrigger>
          <TabsTrigger value="achievements" className="px-4 py-1 text-sm">Achievements</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="courses">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            { title: "Week Warrior", description: "Completed 7 days of learning", earned: false },
            { title: "Tech Master", description: "Complete 5 technical courses", earned: false }
          ].map((item, idx) => (
            <Card
              key={idx}
              className={`bg-white/80 backdrop-blur-sm border-purple-200 ${item.earned ? "" : "opacity-60"}`}
            >
              <CardContent className="p-6 text-center">
                <Award className={`h-12 w-12 mx-auto mb-4 ${item.earned ? "text-yellow-500" : "text-gray-400"}`} />
                <h3 className={`font-semibold mb-2 ${item.earned ? "text-purple-800" : "text-gray-600"}`}>
                  {item.title}
                </h3>
                <p className={`text-sm ${item.earned ? "text-purple-600" : "text-gray-500"}`}>
                  {item.description}
                </p>
                <Badge className={`mt-2 ${item.earned ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-600"}`}>
                  {item.earned ? "Earned" : "Locked"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  </motion.div>
);

};

export default Dashboard;

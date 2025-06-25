import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../Component/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../Component/ui/Avatar";
import { Button } from "../Component/ui/Button";
import { Progress } from "../Component/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Component/ui/Tabs";
import Badge from "../Component/ui/badge";
import { Calendar, Clock, BookOpen, Award, TrendingUp } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; 
import { useEffect, useState } from "react";

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

const StatCard = ({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) => (
  <Card className={cardClass}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-purple-600 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${textPurple}`}>{value}</p>
        </div>
        {icon}
      </div>
    </CardContent>
  </Card>
);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const local = localStorage.getItem("user");
        if (local) {
          setUser(JSON.parse(local));
          setLoading(false);
        } else {
          try {
            const docRef = doc(db, "users", firebaseUser.uid);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
              const data = snapshot.data() as User;
              localStorage.setItem("user", JSON.stringify(data));
              setUser(data);
            } else {
              console.error("User document not found in Firestore.");
            }
          } catch (err) {
            console.error("Error fetching user data:", err);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-purple-600">Loading...</div>;
  }

  if (!user) {
    return <div className="text-red-600 text-center mt-10">User not found. Please log in again.</div>;
  }

  const courses = user.enrolledCourses || [];

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-pink-50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1>Welcome, {user.firstname}</h1>
          <p>Email: {user.email}</p>
          <p className="text-purple-600">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Hours" value={user.totalHours} icon={<Clock className="h-8 w-8 text-purple-500" />} />
          <StatCard label="Learning Streak" value={`${user.streak} days`} icon={<TrendingUp className="h-8 w-8 text-purple-500" />} />
          <StatCard label="Courses" value={courses.length} icon={<BookOpen className="h-8 w-8 text-purple-500" />} />
          <StatCard label="Certificates" value={user.certificates} icon={<Award className="h-8 w-8 text-purple-500" />} />
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm cursor-pointer">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className={`lg:col-span-2 ${cardClass}`}>
                <CardHeader>
                  <CardTitle className={textPurple}>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/default-avatar.png"} alt={user.firstname} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        <h1>Welcome, {user?.firstname?.split?.(" ")[0] || "User"}!</h1>
<p>Email: {user?.email || "No email found"}</p>
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800">{user.firstname}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium text-purple-700">Email</label><p className="text-purple-600">{user.email}</p></div>
                    <div><label className="text-sm font-medium text-purple-700">Phone</label><p className="text-purple-600">{user.phone}</p></div>
                    <div><label className="text-sm font-medium text-purple-700">Member Since</label><p className="text-purple-600">{new Date(user.joinDate).toLocaleDateString()}</p></div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer ">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card className={cardClass}>
                <CardHeader><CardTitle className={textPurple}>Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {[{ icon: <BookOpen className="mr-2 h-4 w-4" />, label: "Browse New Courses" },
                    { icon: <Calendar className="mr-2 h-4 w-4" />, label: "Schedule Study Time" },
                    { icon: <Award className="mr-2 h-4 w-4" />, label: "View Certificates" }
                  ].map((action, idx) => (
                    <Button key={idx} variant="outline" className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50 cursor-pointer">
                      {action.icon}{action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              {[{ title: "First Course Completed", description: "Completed Graphic Design course", earned: true },
                { title: "Week Warrior", description: "Complete 7 days of learning", earned: false },
                { title: "Tech Master", description: "Complete 5 technical courses", earned: false }
              ].map((item, idx) => (
                <Card key={idx} className={`bg-white/80 backdrop-blur-sm border-purple-200 ${item.earned ? "" : "opacity-50"}`}>
                  <CardContent className="p-6 text-center">
                    <Award className={`h-12 w-12 mx-auto mb-4 ${item.earned ? "text-yellow-500" : "text-gray-400"}`} />
                    <h3 className={`font-semibold mb-2 ${item.earned ? "text-purple-800" : "text-gray-600"}`}>{item.title}</h3>
                    <p className={`text-sm ${item.earned ? "text-purple-600" : "text-gray-500"}`}>{item.description}</p>
                    <Badge className={`mt-2 ${item.earned ? "bg-yellow-100 text-yellow-800" : "bg-gray-200 text-gray-600"}`}>
                      {item.earned ? "Earned" : "Locked"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Dashboard;

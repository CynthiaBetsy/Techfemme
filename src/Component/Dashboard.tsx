import React from "react";
import { motion } from "framer-motion";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "../Component/ui/Card";
import {Avatar,AvatarFallback,AvatarImage,} from "../Component/ui/Avatar";
import { Button } from "../Component/ui/Button";
import { Progress } from "../Component/ui/Progress";
import {Tabs,TabsContent,TabsList,TabsTrigger} from "../Component/ui/Tabs";
import  Badge  from "../Component/ui/badge";
import {Calendar,Clock,BookOpen,Award,TrendingUp} from "lucide-react";

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
  name: string;
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

interface DashboardProps {
  user: User;
  courses: Course[];
}

const cardClass = "bg-white/80 backdrop-blur-sm border-purple-200";
const textPurple = "text-purple-800";

const Dashboard: React.FC<DashboardProps> = ({ user, courses }) => {
  if (!user) return <p>Loading user data...</p>;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-pink-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textPurple} mb-2`}>
            Welcome back, {user.name}!
          </h1>
          <p className="text-purple-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Hours",
              value: user.totalHours,
              icon: <Clock className="h-8 w-8 text-purple-500" />,
            },
            {
              label: "Learning Streak",
              value: `${user.streak} days`,
              icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
            },
            {
              label: "Courses",
              value: user.enrolledCourses.length,
              icon: <BookOpen className="h-8 w-8 text-purple-500" />,
            },
            {
              label: "Certificates",
              value: user.certificates,
              icon: <Award className="h-8 w-8 text-purple-500" />,
            },
          ].map((stat, index) => (
            <Card className={cardClass} key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 mb-1">{stat.label}</p>
                    <p className={`text-2xl font-bold ${textPurple}`}>{stat.value}</p>
                  </div>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className={`lg:col-span-2 ${cardClass}`}>
                <CardHeader>
                  <CardTitle className={textPurple}>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800">{user.name}</h3>
                      <p className="text-purple-600">{user.occupation}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Email", value: user.email },
                      { label: "Phone", value: user.phone },
                      {
                        label: "Member Since",
                        value: new Date(user.joinDate).toLocaleDateString(),
                      },
                      { label: "Occupation", value: user.occupation },
                    ].map((info, i) => (
                      <div key={i}>
                        <label className="text-sm font-medium text-purple-700">{info.label}</label>
                        <p className="text-purple-600">{info.value}</p>
                      </div>
                    ))}
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className={cardClass}>
                <CardHeader>
                  <CardTitle className={textPurple}>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: <BookOpen className="mr-2 h-4 w-4" />, label: "Browse New Courses" },
                    { icon: <Calendar className="mr-2 h-4 w-4" />, label: "Schedule Study Time" },
                    { icon: <Award className="mr-2 h-4 w-4" />, label: "View Certificates" },
                  ].map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      {action.icon}
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className={cardClass}>
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
                        <p className="font-medium text-purple-800">{course.estimatedTime}</p>
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
              ))}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
         <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-purple-800 mb-2">First Course Completed</h3>
                  <p className="text-sm text-purple-600">Completed Graphic Design course</p>
                  <Badge className="mt-2 bg-yellow-100 text-yellow-800">Earned</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 opacity-50">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-600 mb-2">Week Warrior</h3>
                  <p className="text-sm text-gray-500">Complete 7 days of learning</p>
                  <Badge variant="secondary" className="mt-2">Locked</Badge>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 opacity-50">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-600 mb-2">Tech Master</h3>
                  <p className="text-sm text-gray-500">Complete 5 technical courses</p>
                  <Badge variant="secondary" className="mt-2">Locked</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Dashboard;

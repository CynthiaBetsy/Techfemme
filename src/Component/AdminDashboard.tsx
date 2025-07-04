import React from "react";
import {Card,  CardContent,  CardDescription,  CardHeader,  CardTitle,} from "../Component/ui/Card";
import {Table,TableBody, TableCell,TableHead,TableHeader,TableRow,} from "../Component/ui/Table";
import { Button } from "../Component/ui/Button";
import  Badge  from "../Component/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { useCourses } from "../hooks/useCourses";

const AdminDashboard: React.FC = () => {
  const { courses, loading, deleteCourse } = useCourses();

  if (loading) {
    return <p className="text-center py-10">Loading courses…</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Management</CardTitle>
          <CardDescription>Overview of all Techfemme courses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-purple-800">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.completion}% complete
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{course.students}</TableCell>
                    <TableCell>
                      <Badge
                        variant={course.status === "Active" ? "default" : "secondary"}
                        className={
                          course.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-600"
                        }
                      >
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500">
                    No courses found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

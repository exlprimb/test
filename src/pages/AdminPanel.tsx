import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  MoreVertical,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Plus
} from "lucide-react";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  // Mock data
  const stats = {
    totalUsers: 15420,
    totalCourses: 89,
    pendingApprovals: 23,
    monthlyRevenue: 45600
  };

  const pendingCourses = [
    {
      id: 1,
      title: "Advanced Python Programming",
      author: "Alice Smith",
      submittedDate: "2024-01-15",
      category: "Programming",
      status: "pending"
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      author: "Bob Johnson",
      submittedDate: "2024-01-14",
      category: "Marketing",
      status: "pending"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      author: "Carol Williams",
      submittedDate: "2024-01-13",
      category: "Design",
      status: "pending"
    }
  ];

  const allCourses = [
    {
      id: 1,
      title: "React Development Masterclass",
      author: "John Doe",
      students: 1520,
      rating: 4.8,
      status: "published",
      lastUpdated: "2024-01-10"
    },
    {
      id: 2,
      title: "Python for Data Science",
      author: "Jane Smith",
      students: 2340,
      rating: 4.6,
      status: "published",
      lastUpdated: "2024-01-08"
    },
    {
      id: 3,
      title: "Machine Learning Basics",
      author: "Mike Brown",
      students: 890,
      rating: 4.7,
      status: "draft",
      lastUpdated: "2024-01-05"
    }
  ];

  const allUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "student",
      joinDate: "2024-01-01",
      coursesEnrolled: 5,
      status: "active"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      role: "instructor",
      joinDate: "2023-12-15",
      coursesCreated: 3,
      status: "active"
    },
    {
      id: 3,
      name: "Carol Wilson",
      email: "carol@example.com",
      role: "student",
      joinDate: "2024-01-05",
      coursesEnrolled: 2,
      status: "active"
    }
  ];

  const handleApproveCourse = (courseId: number) => {
    console.log("Approving course:", courseId);
    // Implement course approval logic
  };

  const handleRejectCourse = (courseId: number) => {
    console.log("Rejecting course:", courseId);
    // Implement course rejection logic
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Panel
            </h1>
            <p className="text-muted-foreground">
              Manage courses, users, and platform content
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Courses
                    </p>
                    <p className="text-2xl font-bold">{stats.totalCourses}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Pending Approvals
                    </p>
                    <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                  </div>
                  <FileText className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Monthly Revenue
                    </p>
                    <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Course approved</p>
                          <p className="text-sm text-muted-foreground">React Development Masterclass</p>
                        </div>
                        <div className="text-xs text-muted-foreground">2h ago</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New user registered</p>
                          <p className="text-sm text-muted-foreground">alice@example.com</p>
                        </div>
                        <div className="text-xs text-muted-foreground">4h ago</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <FileText className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Course submission</p>
                          <p className="text-sm text-muted-foreground">Python for Data Science</p>
                        </div>
                        <div className="text-xs text-muted-foreground">6h ago</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Course
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Review Submissions
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Courses</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Course
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.author}</TableCell>
                          <TableCell>{course.students.toLocaleString()}</TableCell>
                          <TableCell>{course.rating}</TableCell>
                          <TableCell>
                            <Badge variant={course.status === "published" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{course.lastUpdated}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Users</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          className="pl-8"
                        />
                      </div>
                      <Button size="sm" variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "instructor" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            {"coursesEnrolled" in user ? `${user.coursesEnrolled} courses` : `${user.coursesCreated} created`}
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{user.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approvals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Course Approvals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingCourses.map((course) => (
                      <div key={course.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              By {course.author} • Submitted {course.submittedDate}
                            </p>
                            <Badge variant="outline" className="mt-2">
                              {course.category}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => console.log("Preview course", course.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRejectCourse(course.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApproveCourse(course.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;

import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp,
  Play,
  Upload,
  MessageSquare
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const userStats = {
    coursesEnrolled: 12,
    coursesCompleted: 8,
    totalHours: 45,
    certificates: 5
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "React Development",
      progress: 75,
      instructor: "John Doe",
      nextLesson: "React Hooks",
      dueDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Python for Data Science",
      progress: 40,
      instructor: "Jane Smith",
      nextLesson: "Pandas DataFrame",
      dueDate: "2024-01-20"
    }
  ];

  const recentActivity = [
    { action: "Completed lesson", course: "React Development", time: "2 hours ago" },
    { action: "Started new course", course: "Python for Data Science", time: "1 day ago" },
    { action: "Earned certificate", course: "HTML & CSS Basics", time: "3 days ago" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, Student!
            </h1>
            <p className="text-muted-foreground">
              Continue your learning journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Courses Enrolled
                    </p>
                    <p className="text-2xl font-bold">{userStats.coursesEnrolled}</p>
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
                      Completed
                    </p>
                    <p className="text-2xl font-bold">{userStats.coursesCompleted}</p>
                  </div>
                  <Award className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Learning Hours
                    </p>
                    <p className="text-2xl font-bold">{userStats.totalHours}</p>
                  </div>
                  <Clock className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Certificates
                    </p>
                    <p className="text-2xl font-bold">{userStats.certificates}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b">
              <nav className="flex space-x-8">
                {["overview", "courses", "activity", "upload"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Continue Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              by {course.instructor}
                            </p>
                          </div>
                          <Badge variant="outline">{course.progress}%</Badge>
                        </div>
                        <Progress value={course.progress} className="mb-2" />
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Next: {course.nextLesson}
                          </div>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.course}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "upload" && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Course Material</CardTitle>
                <p className="text-muted-foreground">
                  Share your knowledge with the community. All uploads require admin approval.
                </p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Upload Course Material</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop your files here, or click to browse
                  </p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Supported formats: PDF, DOC, PPT, MP4, MP3, Images
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

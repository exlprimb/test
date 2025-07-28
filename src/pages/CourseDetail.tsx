import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import CommentSystem from "@/components/CommentSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Download,
  Share2,
  Heart,
  CheckCircle
} from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock auth state

  // Mock course data
  const course = {
    id: parseInt(id || "1"),
    title: "React Development Masterclass",
    description: "Learn React from the ground up with hands-on projects and real-world examples. This comprehensive course covers everything from basic components to advanced patterns.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Web Development",
    instructor: "John Doe",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    duration: "24 hours",
    students: 15420,
    rating: 4.8,
    price: "Free",
    level: "Intermediate",
    isPremium: false,
    totalLessons: 48,
    completedLessons: 12,
    lastUpdated: "December 2024",
    language: "English",
    skills: ["React", "JavaScript", "Modern Web Development", "Component Architecture"],
    requirements: ["Basic JavaScript knowledge", "HTML & CSS fundamentals", "Computer with internet connection"]
  };

  const lessons = [
    { id: 1, title: "Introduction to React", duration: "15:30", isCompleted: true, isFree: true },
    { id: 2, title: "Setting up Development Environment", duration: "12:45", isCompleted: true, isFree: true },
    { id: 3, title: "Your First Component", duration: "18:20", isCompleted: false, isFree: false },
    { id: 4, title: "Props and State", duration: "22:15", isCompleted: false, isFree: false },
    { id: 5, title: "Event Handling", duration: "16:30", isCompleted: false, isFree: false },
  ];

  const materials = [
    { name: "React Cheat Sheet.pdf", size: "2.4 MB", type: "PDF" },
    { name: "Project Source Code.zip", size: "15.8 MB", type: "ZIP" },
    { name: "Design Assets.figma", size: "8.2 MB", type: "FIGMA" },
  ];

  const progress = (course.completedLessons / course.totalLessons) * 100;

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold mb-4">Login Required</h1>
              <p className="text-muted-foreground mb-8">
                You need to login to access course details and materials.
              </p>
              <Button>Login to Continue</Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {course.category}
                  </Badge>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    {course.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{course.instructor}</p>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {isEnrolled && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="aspect-video mb-4 bg-muted rounded-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold mb-4">{course.price}</div>
                    <div className="space-y-3 mb-6">
                      {!isEnrolled ? (
                        <Button 
                          className="w-full" 
                          onClick={() => setIsEnrolled(true)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" />
                          Enroll Now
                        </Button>
                      ) : (
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Level:</span>
                        <span>{course.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Language:</span>
                        <span>{course.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Updated:</span>
                        <span>{course.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="comments">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lessons.map((lesson, index) => (
                      <div 
                        key={lesson.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:bg-muted/50 ${
                          currentLesson === index ? 'bg-muted' : ''
                        }`}
                        onClick={() => setCurrentLesson(index)}
                      >
                        <div className="flex items-center gap-3">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Play className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {lesson.duration}
                              {!lesson.isFree && !isEnrolled && (
                                <Badge variant="outline" className="ml-2">Premium</Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Download className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{material.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.type} • {material.size}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.skills.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {course.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <CommentSystem courseId={course.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;
import { useState } from "react";
import Layout from "@/components/Layout";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookOpen, Users, Clock, Star } from "lucide-react";

// Definisikan tipe data untuk Course
interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  price: string;
  level: string;
  isPremium: boolean;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data - in real app this would come from Supabase
  const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript to build modern websites.",
      thumbnail: "/placeholder.svg",
      category: "Programming",
      instructor: "John Doe",
      duration: "8 weeks",
      students: 1234,
      rating: 4.8,
      price: "Free",
      level: "Beginner",
      isPremium: false
    },
    {
      id: 2,
      title: "Advanced React Development",
      description: "Master React hooks, context, and advanced patterns for professional development.",
      thumbnail: "/placeholder.svg",
      category: "Programming",
      instructor: "Jane Smith",
      duration: "12 weeks",
      students: 856,
      rating: 4.9,
      price: "Premium",
      level: "Advanced",
      isPremium: true
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      description: "Learn SEO, social media marketing, and digital advertising strategies.",
      thumbnail: "/placeholder.svg",
      category: "Marketing",
      instructor: "Mike Johnson",
      duration: "6 weeks",
      students: 2341,
      rating: 4.7,
      price: "Free",
      level: "Beginner",
      isPremium: false
    },
    {
      id: 4,
      title: "Data Science with Python",
      description: "Explore data analysis, machine learning, and visualization with Python.",
      thumbnail: "/placeholder.svg",
      category: "Data Science",
      instructor: "Sarah Wilson",
      duration: "16 weeks",
      students: 945,
      rating: 4.8,
      price: "Premium",
      level: "Intermediate",
      isPremium: true
    }
  ];

  const categories = ["all", "Programming", "Marketing", "Data Science", "Design", "Business"];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Learn Without Limits
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover thousands of courses from expert instructors and advance your career
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button size="lg">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">1,000+</h3>
                <p className="text-muted-foreground">Courses</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">50,000+</h3>
                <p className="text-muted-foreground">Students</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">24/7</h3>
                <p className="text-muted-foreground">Access</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">4.8</h3>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4 md:mb-0">
                Popular Courses
              </h2>
              
              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  className="bg-background border border-input rounded-md px-3 py-2 text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No courses found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BookOpen, Users, Clock, Star } from "lucide-react";

// Definisikan tipe data untuk Course agar sesuai dengan backend
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

  // State untuk menampung data dari API
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect untuk mengambil data kategori saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(["all", ...data]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // useEffect untuk mengambil data kursus setiap kali ada perubahan pada search atau filter
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      const params = new URLSearchParams({
        search: searchTerm,
        category: selectedCategory,
      });

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/courses?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // --- LANGKAH DEBUGGING ---
        // Baris ini akan menampilkan data mentah dari API di konsol browser.
        console.log("Data diterima dari API:", data); 
        
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, selectedCategory]);

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

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Loading courses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}

            {!isLoading && courses.length === 0 && (
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

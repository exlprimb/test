
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen,
  Lock,
  Eye
} from "lucide-react";

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

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/80 text-foreground">
              {course.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            {course.isPremium && (
              <Badge className="bg-primary text-primary-foreground">
                Premium
              </Badge>
            )}
          </div>
          {!isAuthenticated && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-center">
                <Lock className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Login to access</p>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {course.description}
          </p>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="font-medium">By {course.instructor}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course.students.toLocaleString()}
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{course.rating}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="font-bold text-lg text-foreground">
            {course.price}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to={`/course/${course.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Link>
            </Button>
            {isAuthenticated && (
              <Button size="sm" asChild>
                <Link to={`/course/${course.id}`}>
                  <BookOpen className="h-4 w-4 mr-1" />
                  View
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;

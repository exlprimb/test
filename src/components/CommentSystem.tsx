import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Reply, 
  ThumbsUp, 
  ThumbsDown,
  MoreVertical,
  Flag
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
  id: number;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  replies: Comment[];
  isInstructor?: boolean;
}

interface CommentSystemProps {
  courseId: number;
}

const CommentSystem = ({ courseId }: CommentSystemProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Alice Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: "This course is amazing! The explanations are very clear and the examples are practical. I've learned so much about React hooks and state management.",
      timestamp: "2 hours ago",
      likes: 12,
      dislikes: 0,
      replies: [
        {
          id: 2,
          author: "John Doe",
          authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          content: "Thank you Alice! I'm glad you're finding the course helpful. Feel free to ask if you have any questions about the upcoming advanced topics.",
          timestamp: "1 hour ago",
          likes: 8,
          dislikes: 0,
          replies: [],
          isInstructor: true
        }
      ]
    },
    {
      id: 3,
      author: "Bob Smith",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: "I'm struggling with the useEffect lesson. Could someone explain the dependency array concept again?",
      timestamp: "4 hours ago",
      likes: 5,
      dislikes: 0,
      replies: [
        {
          id: 4,
          author: "Carol Wilson",
          authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
          content: "Hi Bob! The dependency array tells React when to run the effect. If you pass an empty array [], it runs only once. If you include variables, it runs when those variables change.",
          timestamp: "3 hours ago",
          likes: 15,
          dislikes: 0,
          replies: []
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: "Current User",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: newComment,
      timestamp: "just now",
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (parentId: number) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: "Current User",
      authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: replyContent,
      timestamp: "just now",
      likes: 0,
      dislikes: 0,
      replies: []
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    }));

    setReplyContent("");
    setReplyTo(null);
  };

  const handleLike = (commentId: number, isReply: boolean = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply.id === commentId 
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
  };

  const CommentItem = ({ comment, isReply = false, parentId }: { 
    comment: Comment; 
    isReply?: boolean; 
    parentId?: number;
  }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : ''}`}>
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.authorAvatar} alt={comment.author} />
          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{comment.author}</span>
              {comment.isInstructor && (
                <Badge variant="secondary" className="text-xs">Instructor</Badge>
              )}
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className="text-xs h-auto p-1"
            >
              <ThumbsUp className="h-3 w-3 mr-1" />
              {comment.likes}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-auto p-1"
            >
              <ThumbsDown className="h-3 w-3 mr-1" />
              {comment.dislikes}
            </Button>
            
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                className="text-xs h-auto p-1"
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-1">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {replyTo === comment.id && (
            <div className="mt-3">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px]"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <Button 
                  size="sm" 
                  onClick={() => handleAddReply(comment.id)}
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => setReplyTo(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map(reply => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  isReply={true} 
                  parentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discussion ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Textarea
                placeholder="Share your thoughts about this course..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              <Button 
                className="mt-2" 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
              >
                Post Comment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {comments.map(comment => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <CommentItem comment={comment} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentSystem;
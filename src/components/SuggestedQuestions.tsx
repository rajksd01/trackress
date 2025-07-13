import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Lightbulb, 
  ExternalLink, 
  BookmarkPlus, 
  RefreshCw,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

interface SuggestedQuestion {
  id: string;
  title: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  estimatedTime: string;
  acceptance: number;
  trending?: boolean;
  link: string;
  reason: string;
}

const SuggestedQuestions = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock suggested questions data
  const suggestedQuestions: SuggestedQuestion[] = [
    {
      id: '1',
      title: 'Two Sum II - Input Array Is Sorted',
      platform: 'LeetCode',
      difficulty: 'Medium',
      tags: ['Array', 'Two Pointers', 'Binary Search'],
      estimatedTime: '15 min',
      acceptance: 59.1,
      trending: true,
      link: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      reason: 'Similar to problems you struggled with'
    },
    {
      id: '2',
      title: 'Merge Two Sorted Lists',
      platform: 'LeetCode',
      difficulty: 'Easy',
      tags: ['Linked List', 'Recursion'],
      estimatedTime: '20 min',
      acceptance: 62.8,
      link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      reason: 'Good for practicing linked list fundamentals'
    },
    {
      id: '3',
      title: 'Binary Tree Level Order Traversal',
      platform: 'LeetCode',
      difficulty: 'Medium',
      tags: ['Tree', 'BFS', 'Binary Tree'],
      estimatedTime: '25 min',
      acceptance: 66.4,
      link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      reason: 'Strengthen your tree traversal skills'
    },
    {
      id: '4',
      title: 'Valid Parentheses',
      platform: 'LeetCode',
      difficulty: 'Easy',
      tags: ['String', 'Stack'],
      estimatedTime: '10 min',
      acceptance: 40.5,
      trending: true,
      link: 'https://leetcode.com/problems/valid-parentheses/',
      reason: 'Essential stack problem'
    },
    {
      id: '5',
      title: 'Longest Common Subsequence',
      platform: 'LeetCode',
      difficulty: 'Medium',
      tags: ['String', 'Dynamic Programming'],
      estimatedTime: '30 min',
      acceptance: 58.7,
      link: 'https://leetcode.com/problems/longest-common-subsequence/',
      reason: 'Challenge your DP understanding'
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Hard': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Suggested Questions
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hover:bg-primary/10"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestedQuestions.map((question) => (
            <div
              key={question.id}
              className="group p-4 rounded-lg border border-border bg-card hover:bg-muted/30 transition-all duration-200 hover:shadow-medium"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium group-hover:text-primary transition-colors">
                      {question.title}
                    </h3>
                    {question.trending && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="font-medium">{question.platform}</span>
                    <Badge 
                      variant="outline" 
                      className={getDifficultyColor(question.difficulty)}
                    >
                      {question.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {question.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {question.acceptance}% acceptance
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {question.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs bg-primary/10 text-primary hover:bg-primary/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground italic">
                    💡 {question.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 hover:bg-primary hover:text-primary-foreground"
                  onClick={() => window.open(question.link, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  Solve on {question.platform}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-primary/10 hover:text-primary"
                >
                  <BookmarkPlus className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Lightbulb className="w-4 h-4" />
            <span className="font-medium text-sm">Smart Recommendations</span>
          </div>
          <p className="text-xs text-muted-foreground">
            These suggestions are based on your solving patterns, weak areas, and trending problems in the community.
            Practice regularly to improve your problem-solving skills!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedQuestions;
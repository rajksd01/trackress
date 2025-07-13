import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Calendar,
  Clock,
  BarChart3,
  Filter
} from 'lucide-react';
import SearchFilters from '@/components/SearchFilters';
import SuggestedQuestions from '@/components/SuggestedQuestions';

interface Question {
  id: string;
  title: string;
  platform: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  solvedAt: string;
  timeSpent: string;
  status: 'Solved' | 'Attempted' | 'Review Needed';
  link: string;
  confusionLevel: 'Low' | 'Medium' | 'High';
}

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState('recent');

  // Mock questions data
  const questions: Question[] = [
    {
      id: '1',
      title: 'Two Sum',
      platform: 'LeetCode',
      difficulty: 'Easy',
      tags: ['Array', 'Hash Table'],
      solvedAt: '2024-01-15',
      timeSpent: '15 min',
      status: 'Solved',
      link: 'https://leetcode.com/problems/two-sum/',
      confusionLevel: 'Low'
    },
    {
      id: '2',
      title: 'Add Two Numbers',
      platform: 'LeetCode',
      difficulty: 'Medium',
      tags: ['Linked List', 'Math', 'Recursion'],
      solvedAt: '2024-01-14',
      timeSpent: '45 min',
      status: 'Review Needed',
      link: 'https://leetcode.com/problems/add-two-numbers/',
      confusionLevel: 'High'
    },
    {
      id: '3',
      title: 'Longest Substring Without Repeating Characters',
      platform: 'LeetCode',
      difficulty: 'Medium',
      tags: ['Hash Table', 'String', 'Sliding Window'],
      solvedAt: '2024-01-13',
      timeSpent: '30 min',
      status: 'Solved',
      link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      confusionLevel: 'Medium'
    },
    {
      id: '4',
      title: 'Median of Two Sorted Arrays',
      platform: 'LeetCode',
      difficulty: 'Hard',
      tags: ['Array', 'Binary Search', 'Divide and Conquer'],
      solvedAt: '2024-01-12',
      timeSpent: '90 min',
      status: 'Attempted',
      link: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
      confusionLevel: 'High'
    },
    {
      id: '5',
      title: 'Binary Search',
      platform: 'GeeksforGeeks',
      difficulty: 'Easy',
      tags: ['Array', 'Binary Search'],
      solvedAt: '2024-01-11',
      timeSpent: '20 min',
      status: 'Solved',
      link: 'https://www.geeksforgeeks.org/binary-search/',
      confusionLevel: 'Low'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'Hard': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Solved': return 'bg-success/10 text-success border-success/20';
      case 'Attempted': return 'bg-warning/10 text-warning border-warning/20';
      case 'Review Needed': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted';
    }
  };

  const getConfusionColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-success/10 text-success';
      case 'Medium': return 'bg-warning/10 text-warning';
      case 'High': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Questions</h1>
        <p className="text-muted-foreground">
          Track and manage all your coding problems in one place
        </p>
      </div>

      {/* Search and Filters */}
      <SearchFilters 
        onFiltersChange={setFilters}
        onSearchChange={setSearchTerm}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{questions.length}</p>
                    <p className="text-sm text-muted-foreground">Total Questions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {questions.filter(q => q.status === 'Solved').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Solved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-0">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/10 rounded-lg">
                    <Clock className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {questions.filter(q => q.status === 'Review Needed').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Need Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions Cards */}
          <div className="space-y-4">
            {questions.map((question) => (
              <Card key={question.id} className="group hover:shadow-large transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                        {question.title}
                      </h3>
                      
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span className="font-medium">{question.platform}</span>
                        <Badge 
                          variant="outline" 
                          className={getDifficultyColor(question.difficulty)}
                        >
                          {question.difficulty}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(question.status)}
                        >
                          {question.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="bg-primary/10 text-primary hover:bg-primary/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(question.solvedAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {question.timeSpent}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getConfusionColor(question.confusionLevel)}`}></div>
                          {question.confusionLevel} confusion
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground"
                      onClick={() => window.open(question.link, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Problem
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Suggested Questions Sidebar */}
        <div className="lg:col-span-1">
          <SuggestedQuestions />
        </div>
      </div>
    </div>
  );
};

export default Questions;
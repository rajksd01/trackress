import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  Plus,
  Brain,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with real data later
  const stats = {
    totalSolved: 248,
    weeklyGoal: 10,
    currentStreak: 7,
    accuracy: 85
  };

  const difficultyStats = [
    { name: 'Easy', count: 120, color: 'bg-success', percentage: 48 },
    { name: 'Medium', count: 98, color: 'bg-warning', percentage: 40 },
    { name: 'Hard', count: 30, color: 'bg-destructive', percentage: 12 }
  ];

  const recentActivity = [
    { id: 1, title: 'Two Sum', platform: 'LeetCode', difficulty: 'Easy', time: '2 hours ago', status: 'solved' },
    { id: 2, title: 'Binary Tree Traversal', platform: 'GeeksforGeeks', difficulty: 'Medium', time: '5 hours ago', status: 'review' },
    { id: 3, title: 'Maximum Subarray', platform: 'LeetCode', difficulty: 'Medium', time: '1 day ago', status: 'solved' }
  ];

  const upcomingReviews = [
    { id: 1, title: 'Merge Sort', dueDate: 'Today', priority: 'high' },
    { id: 2, title: 'Graph DFS', dueDate: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Dynamic Programming', dueDate: 'In 2 days', priority: 'low' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
          <p className="text-white/80 mb-4">Ready to tackle some coding challenges today?</p>
          <div className="flex gap-3">
            <Button variant="secondary" className="bg-white/20 text-white border-0 hover:bg-white/30">
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
            <Button variant="ghost" className="text-white border-white/20 hover:bg-white/10">
              <Brain className="w-4 h-4 mr-2" />
              Take Quiz
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-0 hover:shadow-large transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Solved</CardTitle>
            <Trophy className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSolved}</div>
            <p className="text-xs text-muted-foreground">+12 from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 hover:shadow-large transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
            <Target className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.weeklyGoal}</div>
            <div className="mt-2">
              <Progress value={70} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">7/10 completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 hover:shadow-large transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 hover:shadow-large transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <TrendingUp className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accuracy}%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Difficulty Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Difficulty Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {difficultyStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{stat.name}</span>
                  <span className="text-sm text-muted-foreground">{stat.count}</span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    {activity.status === 'solved' ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning" />
                    )}
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.platform}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.difficulty === 'Easy' ? 'secondary' : activity.difficulty === 'Medium' ? 'default' : 'destructive'}>
                      {activity.difficulty}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Upcoming Reviews
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingReviews.map((review) => (
              <div key={review.id} className="p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{review.title}</h4>
                  <Badge variant={review.priority === 'high' ? 'destructive' : review.priority === 'medium' ? 'default' : 'secondary'}>
                    {review.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{review.dueDate}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
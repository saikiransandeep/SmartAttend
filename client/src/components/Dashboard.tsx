import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  UserCheck, 
  AlertTriangle,
  Plus,
  Eye,
  BarChart3,
  Clock
} from "lucide-react";
import { AttendanceChart } from "./AttendanceChart";

interface DashboardProps {
  userRole: string;
}

export function Dashboard({ userRole }: DashboardProps) {
  // todo: remove mock functionality
  const getDashboardStats = () => {
    switch (userRole) {
      case 'faculty':
        return {
          title: "Faculty Dashboard",
          stats: [
            { label: "My Classes", value: "5", icon: BookOpen, color: "text-chart-1" },
            { label: "Today's Classes", value: "3", icon: Calendar, color: "text-chart-2" },
            { label: "Students", value: "150", icon: Users, color: "text-chart-3" },
            { label: "Avg. Attendance", value: "87%", icon: TrendingUp, color: "text-chart-4" },
          ],
          quickActions: [
            { label: "Mark Attendance", icon: UserCheck, action: () => console.log("Mark attendance clicked") },
            { label: "View Classes", icon: BookOpen, action: () => console.log("View classes clicked") },
            { label: "Analytics", icon: BarChart3, action: () => console.log("Analytics clicked") },
          ]
        };

      case 'student':
        return {
          title: "Student Dashboard",
          stats: [
            { label: "Overall Attendance", value: "89%", icon: TrendingUp, color: "text-chart-2" },
            { label: "Present Days", value: "42", icon: UserCheck, color: "text-chart-1" },
            { label: "Total Classes", value: "47", icon: Calendar, color: "text-chart-3" },
            { label: "Subjects", value: "6", icon: BookOpen, color: "text-chart-4" },
          ],
          quickActions: [
            { label: "View Attendance", icon: BarChart3, action: () => console.log("View attendance clicked") },
            { label: "Timetable", icon: Calendar, action: () => console.log("Timetable clicked") },
            { label: "Subjects", icon: BookOpen, action: () => console.log("Subjects clicked") },
          ]
        };

      case 'hod':
        return {
          title: "HoD Dashboard",
          stats: [
            { label: "Department Classes", value: "25", icon: BookOpen, color: "text-chart-1" },
            { label: "Faculty Members", value: "12", icon: Users, color: "text-chart-2" },
            { label: "Total Students", value: "450", icon: Users, color: "text-chart-3" },
            { label: "Avg. Attendance", value: "85%", icon: TrendingUp, color: "text-chart-4" },
          ],
          quickActions: [
            { label: "Department Reports", icon: BarChart3, action: () => console.log("Reports clicked") },
            { label: "Manage Faculty", icon: Users, action: () => console.log("Manage faculty clicked") },
            { label: "View Analytics", icon: TrendingUp, action: () => console.log("Analytics clicked") },
          ]
        };

      default:
        return {
          title: "Dashboard",
          stats: [],
          quickActions: []
        };
    }
  };

  const dashboardData = getDashboardStats();

  // todo: remove mock functionality
  const recentActivities = [
    { id: 1, activity: "Marked attendance for CS-A", time: "10 minutes ago", type: "success" },
    { id: 2, activity: "New student added to database", time: "1 hour ago", type: "info" },
    { id: 3, activity: "Low attendance alert for CS-B", time: "2 hours ago", type: "warning" },
    { id: 4, activity: "Monthly report generated", time: "1 day ago", type: "info" },
  ];

  const upcomingClasses = userRole === 'faculty' ? [
    { id: 1, subject: "Data Structures", section: "CS-A", time: "2:00 PM", room: "Lab 1" },
    { id: 2, subject: "Algorithms", section: "CS-B", time: "3:30 PM", room: "Room 201" },
    { id: 3, subject: "Database Systems", section: "CS-A", time: "Tomorrow 9:00 AM", room: "Room 105" },
  ] : [];

  // todo: remove mock functionality
  const chartData = {
    bar: [
      { name: 'Mon', value: 85 },
      { name: 'Tue', value: 92 },
      { name: 'Wed', value: 78 },
      { name: 'Thu', value: 88 },
      { name: 'Fri', value: 95 },
    ],
    line: [
      { name: 'Week 1', value: 85 },
      { name: 'Week 2', value: 88 },
      { name: 'Week 3', value: 82 },
      { name: 'Week 4', value: 90 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">{dashboardData.title}</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your attendance system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.stats.map((stat, index) => (
          <Card key={index} className="hover-elevate">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      {dashboardData.quickActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {dashboardData.quickActions.map((action, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  onClick={action.action}
                  data-testid={`button-${action.label.toLowerCase().replace(' ', '-')}`}
                  className="flex items-center gap-2"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts and Upcoming Classes */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <AttendanceChart
            title="Weekly Attendance Trend"
            description="Attendance percentage for this week"
            type="bar"
            data={chartData.bar}
          />
        </div>

        <div className="space-y-4">
          {/* Upcoming Classes (for faculty) */}
          {upcomingClasses.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Upcoming Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingClasses.map((class_) => (
                  <div key={class_.id} className="p-3 border rounded-lg hover-elevate">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{class_.subject}</p>
                        <p className="text-sm text-muted-foreground">{class_.section}</p>
                        <p className="text-sm text-muted-foreground">{class_.room}</p>
                      </div>
                      <Badge variant="outline">{class_.time}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 hover-elevate rounded">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-chart-2' :
                    activity.type === 'warning' ? 'bg-chart-3' : 'bg-chart-1'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.activity}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <AttendanceChart
        title="Monthly Attendance Trend"
        description="Attendance trend over the last 4 weeks"
        type="line"
        data={chartData.line}
        height={250}
      />
    </div>
  );
}
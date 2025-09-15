import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LoginForm } from "@/components/LoginForm";
import { Dashboard } from "@/components/Dashboard";
import { AttendanceMarking } from "@/components/AttendanceMarking";
import { StudentManagement } from "@/components/StudentManagement";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotFound from "@/pages/not-found";

interface User {
  username: string;
  role: string;
  name: string;
  email: string;
}

function Router({ user }: { user: User | null }) {
  // todo: remove mock functionality - sample class info
  const classInfo = {
    subject: "Computer Science Fundamentals",
    section: "CS-A Year 2", 
    date: "March 15, 2024",
    time: "10:00 AM - 11:00 AM",
    totalStudents: 10
  };

  if (!user) {
    return <Route component={NotFound} />;
  }

  return (
    <Switch>
      <Route path="/" component={() => <Dashboard userRole={user.role} />} />
      <Route path="/dashboard" component={() => <Dashboard userRole={user.role} />} />
      <Route path="/attendance" component={() => <AttendanceMarking classInfo={classInfo} />} />
      <Route path="/students" component={() => <StudentManagement userRole={user.role} />} />
      <Route path="/manage/students" component={() => <StudentManagement userRole={user.role} />} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (credentials: { username: string; password: string; role: string }) => {
    // todo: remove mock functionality - simulate login
    const mockUser: User = {
      username: credentials.username,
      role: credentials.role,
      name: credentials.role === 'faculty' ? 'Dr. Sarah Johnson' :
            credentials.role === 'student' ? 'John Smith' :
            credentials.role === 'hod' ? 'Prof. Michael Davis' :
            credentials.role === 'class_incharge' ? 'Dr. Emily Wilson' :
            'Dr. Robert Brown',
      email: `${credentials.username}@university.edu`
    };
    setUser(mockUser);
    console.log('User logged in:', mockUser);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  // Custom sidebar width for the attendance system
  const style = {
    "--sidebar-width": "18rem",       // 288px for better content organization
    "--sidebar-width-icon": "4rem",   // default icon width
  };

  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LoginForm onLogin={handleLogin} />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar 
              userRole={user.role} 
              userName={user.name} 
              userEmail={user.email} 
            />
            <div className="flex flex-col flex-1">
              <header className="flex items-center justify-between p-4 border-b bg-background">
                <div className="flex items-center gap-2">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="hidden sm:block">
                    <h2 className="text-lg font-semibold">Smart Attendance System</h2>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    Welcome, {user.name}
                  </span>
                  <ThemeToggle />
                  <button
                    onClick={handleLogout}
                    className="text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded hover-elevate"
                    data-testid="button-logout"
                  >
                    Logout
                  </button>
                </div>
              </header>
              <main className="flex-1 overflow-auto p-6 bg-background">
                <Router user={user} />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
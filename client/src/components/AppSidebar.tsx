import { 
  Calendar, 
  Home, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  User, 
  Building2, 
  UserCheck,
  GraduationCap,
  ChevronRight,
  Plus,
  FileText,
  HelpCircle,
  ClipboardList,
  UserCog
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AppSidebarProps {
  userRole: string;
  userName: string;
  userEmail: string;
}

export function AppSidebar({ userRole, userName, userEmail }: AppSidebarProps) {
  // Menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { title: "Dashboard", url: "/dashboard", icon: Home },
      { title: "Attendance Records", url: "/attendance-records", icon: ClipboardList },
    ];

    const roleSpecificItems = {
      faculty: [
        { title: "Mark Attendance", url: "/attendance", icon: UserCheck },
        { title: "Student Management", url: "/students", icon: Users },
        { title: "Course Management", url: "/courses", icon: BookOpen },
        { title: "Reports", url: "/reports", icon: FileText },
      ],
      student: [
        { title: "My Attendance", url: "/my-attendance", icon: BarChart3 },
        { title: "Timetable", url: "/timetable", icon: Calendar },
        { title: "Subjects", url: "/subjects", icon: BookOpen },
      ],
      class_incharge: [
        { title: "Mark Attendance", url: "/attendance", icon: UserCheck },
        { title: "Student Management", url: "/students", icon: Users },
        { title: "Course Management", url: "/courses", icon: BookOpen },
        { title: "Reports", url: "/reports", icon: FileText },
      ],
      hod: [
        { title: "Faculty Management", url: "/faculty", icon: UserCog },
        { title: "Student Management", url: "/students", icon: Users },
        { title: "Course Management", url: "/courses", icon: BookOpen },
        { title: "Reports", url: "/reports", icon: FileText },
      ],
      principal: [
        { title: "Faculty Management", url: "/faculty", icon: UserCog },
        { title: "Student Management", url: "/students", icon: Users },
        { title: "Course Management", url: "/courses", icon: BookOpen },
        { title: "Reports", url: "/reports", icon: FileText },
      ],
    };

    return [
      ...commonItems,
      ...(roleSpecificItems[userRole as keyof typeof roleSpecificItems] || []),
    ];
  };

  const managementItems = userRole !== 'student' ? [
    {
      title: "Management",
      items: [
        ...(userRole === 'faculty' || userRole === 'class_incharge' ? [
          { title: "Students", url: "/manage/students", icon: Users },
        ] : []),
        ...(userRole === 'hod' || userRole === 'principal' ? [
          { title: "Departments", url: "/manage/departments", icon: Building2 },
          { title: "Sections", url: "/manage/sections", icon: GraduationCap },
        ] : []),
        ...(userRole === 'principal' ? [
          { title: "Faculty", url: "/manage/faculty", icon: User },
        ] : []),
      ]
    }
  ] : [];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/user.jpg" alt={userName} />
            <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {userRole.replace('_', ' ')}
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {getMenuItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {managementItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} data-testid={`link-${item.title.toLowerCase().replace(' ', '-')}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/settings" data-testid="link-settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/help" data-testid="link-help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
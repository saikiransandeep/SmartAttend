import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Moon, 
  Sun, 
  Save,
  Camera,
  Smartphone,
  Mail,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  employeeId?: string;
  avatar?: string;
}

interface Preferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  attendanceReminders: boolean;
  weeklyReports: boolean;
}

export function Settings() {
  const { toast } = useToast();
  
  // todo: remove mock functionality
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    phone: '+1234567890',
    department: 'Computer Science',
    role: 'faculty',
    employeeId: 'EMP001'
  });

  const [preferences, setPreferences] = useState<Preferences>({
    theme: 'system',
    language: 'en',
    timezone: 'UTC+05:30',
    emailNotifications: true,
    smsNotifications: false,
    attendanceReminders: true,
    weeklyReports: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated profile:', profile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: "Error", 
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    console.log('Password change requested');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast({
      title: "Password Updated",
      description: "Your password has been successfully changed.",
    });
  };

  const handlePreferencesUpdate = () => {
    console.log('Updated preferences:', preferences);
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been successfully updated.",
    });
  };

  const handleAvatarChange = () => {
    console.log('Avatar change requested');
    toast({
      title: "Feature Coming Soon",
      description: "Avatar upload functionality will be available soon.",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your personal and professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-lg">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                <Badge variant="secondary" className="mt-1">
                  {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                </Badge>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAvatarChange}
                data-testid="button-change-avatar"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </div>

          <Separator />

          {/* Profile Form */}
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                  data-testid="input-profile-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  data-testid="input-profile-email"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  data-testid="input-profile-phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={profile.department}
                  disabled={true}
                  data-testid="input-profile-department"
                />
              </div>
            </div>

            {profile.employeeId && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={profile.employeeId}
                    disabled={true}
                    data-testid="input-profile-employee-id"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    disabled={true}
                    data-testid="input-profile-role"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {!isEditing ? (
                <Button 
                  type="button" 
                  onClick={() => setIsEditing(true)}
                  data-testid="button-edit-profile"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button type="submit" data-testid="button-save-profile">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
          <CardDescription>Update your account password for better security</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                data-testid="input-current-password"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  data-testid="input-new-password"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  data-testid="input-confirm-password"
                  required
                />
              </div>
            </div>

            <Button type="submit" data-testid="button-change-password">
              <Shield className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Preferences & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications & Preferences
          </CardTitle>
          <CardDescription>Configure your notification preferences and app settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Appearance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select 
                  value={preferences.theme} 
                  onValueChange={(value: 'light' | 'dark' | 'system') => 
                    setPreferences(prev => ({ ...prev, theme: value }))
                  }
                >
                  <SelectTrigger data-testid="select-theme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select 
                  value={preferences.language} 
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                >
                  <SelectTrigger data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select 
                value={preferences.timezone} 
                onValueChange={(value) => setPreferences(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger data-testid="select-timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC+05:30">UTC+05:30 (IST)</SelectItem>
                  <SelectItem value="UTC+00:00">UTC+00:00 (GMT)</SelectItem>
                  <SelectItem value="UTC-05:00">UTC-05:00 (EST)</SelectItem>
                  <SelectItem value="UTC-08:00">UTC-08:00 (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Notification Settings */}
          <div className="space-y-4">
            <h4 className="font-medium">Notifications</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <Label>Email Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, emailNotifications: checked }))
                  }
                  data-testid="switch-email-notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <Label>SMS Notifications</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive SMS alerts for critical attendance updates
                  </p>
                </div>
                <Switch
                  checked={preferences.smsNotifications}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, smsNotifications: checked }))
                  }
                  data-testid="switch-sms-notifications"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label>Attendance Reminders</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get reminders to mark attendance for your classes
                  </p>
                </div>
                <Switch
                  checked={preferences.attendanceReminders}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, attendanceReminders: checked }))
                  }
                  data-testid="switch-attendance-reminders"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <Label>Weekly Reports</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive weekly attendance summary reports
                  </p>
                </div>
                <Switch
                  checked={preferences.weeklyReports}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, weeklyReports: checked }))
                  }
                  data-testid="switch-weekly-reports"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handlePreferencesUpdate} data-testid="button-save-preferences">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data & Privacy
          </CardTitle>
          <CardDescription>Manage your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Export Data</h4>
              <p className="text-sm text-muted-foreground">
                Download a copy of all your data
              </p>
            </div>
            <Button variant="outline" data-testid="button-export-data">
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" data-testid="button-delete-account">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
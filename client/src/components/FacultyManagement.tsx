import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Filter,
  Users,
  BookOpen,
  Mail,
  Phone,
  Calendar,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Faculty {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  subjects: string[];
  status: 'Active' | 'Inactive';
  joinDate: string;
  avatar?: string;
}

export function FacultyManagement() {
  // todo: remove mock functionality
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      phone: '+1234567890',
      department: 'Computer Science',
      designation: 'Professor',
      subjects: ['Data Structures', 'Algorithms', 'Database Systems'],
      status: 'Active',
      joinDate: '2020-08-15',
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Prof. Michael Davis',
      email: 'michael.davis@university.edu',
      phone: '+1234567891',
      department: 'Computer Science',
      designation: 'Associate Professor',
      subjects: ['Machine Learning', 'AI Fundamentals'],
      status: 'Active',
      joinDate: '2019-01-10',
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'Dr. Emily Wilson',
      email: 'emily.wilson@university.edu',
      phone: '+1234567892',
      department: 'Mechanical Engineering',
      designation: 'Assistant Professor',
      subjects: ['Thermodynamics', 'Fluid Mechanics'],
      status: 'Active',
      joinDate: '2021-07-01',
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'Prof. Robert Brown',
      email: 'robert.brown@university.edu',
      phone: '+1234567893',
      department: 'Electrical Engineering',
      designation: 'Professor',
      subjects: ['Circuit Analysis', 'Digital Electronics', 'Control Systems'],
      status: 'Active',
      joinDate: '2018-03-20',
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@university.edu',
      phone: '+1234567894',
      department: 'Mathematics',
      designation: 'Associate Professor',
      subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
      status: 'Inactive',
      joinDate: '2017-09-05',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Faculty>>({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    subjects: [],
    status: 'Active'
  });

  const departments = Array.from(new Set(faculty.map(f => f.department)));
  
  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === "all" || member.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || member.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const handleAddFaculty = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      subjects: [],
      status: 'Active'
    });
    setIsAddingFaculty(true);
    setIsEditing(false);
  };

  const handleEditFaculty = (member: Faculty) => {
    setFormData(member);
    setSelectedFaculty(member);
    setIsAddingFaculty(true);
    setIsEditing(true);
  };

  const handleDeleteFaculty = (facultyId: string) => {
    setFaculty(prev => prev.filter(f => f.id !== facultyId));
    console.log("Delete faculty", facultyId);
  };

  const handleViewProfile = (member: Faculty) => {
    setSelectedFaculty(member);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedFaculty) {
      // Update existing faculty
      setFaculty(prev => prev.map(f => 
        f.id === selectedFaculty.id ? { ...f, ...formData } : f
      ));
      console.log("Updated faculty", formData);
    } else {
      // Add new faculty
      const newFaculty: Faculty = {
        ...formData as Faculty,
        id: (faculty.length + 1).toString(),
        employeeId: `EMP${String(faculty.length + 1).padStart(3, '0')}`,
        joinDate: new Date().toISOString().split('T')[0],
      };
      setFaculty(prev => [...prev, newFaculty]);
      console.log("Added new faculty", newFaculty);
    }
    
    setIsAddingFaculty(false);
    setSelectedFaculty(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Faculty Management</h1>
          <p className="text-muted-foreground">
            Manage faculty members, their subjects, and department assignments
          </p>
        </div>
        <Button 
          onClick={handleAddFaculty}
          data-testid="button-add-faculty"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Faculty
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Faculty</p>
                <p className="text-2xl font-bold">{faculty.length}</p>
              </div>
              <Users className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Faculty</p>
                <p className="text-2xl font-bold text-chart-2">
                  {faculty.filter(f => f.status === 'Active').length}
                </p>
              </div>
              <User className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{departments.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Professors</p>
                <p className="text-2xl font-bold">
                  {faculty.filter(f => f.designation.includes('Professor')).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-chart-4" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Faculty List</CardTitle>
              <CardDescription>
                {filteredFaculty.length} of {faculty.length} faculty members shown
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search faculty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                  data-testid="input-search-faculty"
                />
              </div>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-department">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32" data-testid="select-filter-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" data-testid="button-export">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredFaculty.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{member.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={member.status === 'Active' ? 'border-chart-2 text-chart-2' : 'border-muted text-muted-foreground'}
                      >
                        {member.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{member.employeeId}</span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {member.department}
                      </span>
                      <span>{member.designation}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {member.subjects.slice(0, 3).map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {member.subjects.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{member.subjects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewProfile(member)}
                    data-testid={`button-view-${member.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditFaculty(member)}
                    data-testid={`button-edit-${member.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteFaculty(member.id)}
                    data-testid={`button-delete-${member.id}`}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Faculty Dialog */}
      <Dialog open={isAddingFaculty} onOpenChange={setIsAddingFaculty}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Faculty' : 'Add New Faculty'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update faculty member information' : 'Enter the details for the new faculty member'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                  data-testid="input-faculty-name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                  data-testid="input-faculty-email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                  data-testid="input-faculty-phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select 
                  value={formData.department || ''} 
                  onValueChange={(value) => setFormData(prev => ({...prev, department: value}))}
                >
                  <SelectTrigger data-testid="select-faculty-department">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Select 
                  value={formData.designation || ''} 
                  onValueChange={(value) => setFormData(prev => ({...prev, designation: value}))}
                >
                  <SelectTrigger data-testid="select-faculty-designation">
                    <SelectValue placeholder="Select Designation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Professor">Professor</SelectItem>
                    <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                    <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                    <SelectItem value="Lecturer">Lecturer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status || 'Active'} 
                  onValueChange={(value: 'Active' | 'Inactive') => setFormData(prev => ({...prev, status: value}))}
                >
                  <SelectTrigger data-testid="select-faculty-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddingFaculty(false)}
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-save-faculty">
                {isEditing ? 'Update' : 'Add'} Faculty
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Faculty Profile Dialog */}
      {selectedFaculty && !isAddingFaculty && (
        <Dialog open={!!selectedFaculty} onOpenChange={() => setSelectedFaculty(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedFaculty.avatar} />
                  <AvatarFallback>{selectedFaculty.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div>{selectedFaculty.name}</div>
                  <div className="text-sm text-muted-foreground font-normal">{selectedFaculty.employeeId}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Designation</Label>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.designation}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Join Date</Label>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={selectedFaculty.status === 'Active' ? 'bg-chart-2/10 text-chart-2' : 'bg-muted'}>
                    {selectedFaculty.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Subjects Teaching</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFaculty.subjects.map((subject) => (
                    <Badge key={subject} variant="secondary">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedFaculty(null)}>
                Close
              </Button>
              <Button onClick={() => handleEditFaculty(selectedFaculty)}>
                Edit Faculty
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
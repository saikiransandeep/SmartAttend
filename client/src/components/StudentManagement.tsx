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
  GraduationCap,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  phone: string;
  section: string;
  year: number;
  department: string;
  status: 'Active' | 'Inactive';
  attendancePercentage: number;
  avatar?: string;
  dateOfBirth?: string;
  address?: string;
}

interface StudentManagementProps {
  userRole: string;
}

export function StudentManagement({ userRole }: StudentManagementProps) {
  // todo: remove mock functionality
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      rollNo: '21CS001',
      name: 'Alice Johnson',
      email: 'alice.johnson@university.edu',
      phone: '+1234567890',
      section: 'CS-A',
      year: 2,
      department: 'Computer Science',
      status: 'Active',
      attendancePercentage: 89,
      dateOfBirth: '2003-05-15',
      address: '123 Main St, City'
    },
    {
      id: '2',
      rollNo: '21CS002',
      name: 'Bob Smith',
      email: 'bob.smith@university.edu',
      phone: '+1234567891',
      section: 'CS-A',
      year: 2,
      department: 'Computer Science',
      status: 'Active',
      attendancePercentage: 92,
      dateOfBirth: '2003-03-22',
      address: '456 Oak Ave, City'
    },
    {
      id: '3',
      rollNo: '21CS003',
      name: 'Carol Davis',
      email: 'carol.davis@university.edu',
      phone: '+1234567892',
      section: 'CS-B',
      year: 2,
      department: 'Computer Science',
      status: 'Active',
      attendancePercentage: 76,
      dateOfBirth: '2003-08-10',
      address: '789 Pine Rd, City'
    },
    {
      id: '4',
      rollNo: '21CS004',
      name: 'David Wilson',
      email: 'david.wilson@university.edu',
      phone: '+1234567893',
      section: 'CS-A',
      year: 2,
      department: 'Computer Science',
      status: 'Active',
      attendancePercentage: 94,
      dateOfBirth: '2003-01-28',
      address: '321 Elm St, City'
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSection, setFilterSection] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterSection === "all" || student.section === filterSection;
    
    return matchesSearch && matchesFilter;
  });

  const sections = Array.from(new Set(students.map(s => s.section)));

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-chart-2 bg-chart-2/10";
    if (percentage >= 75) return "text-chart-3 bg-chart-3/10";
    return "text-destructive bg-destructive/10";
  };

  const handleAddStudent = () => {
    setIsAddingStudent(true);
    console.log("Add student clicked");
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    console.log("Edit student", student.name);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    console.log("Delete student", studentId);
  };

  const handleViewProfile = (student: Student) => {
    setSelectedStudent(student);
    console.log("View profile", student.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Student Management</h1>
          <p className="text-muted-foreground">
            Manage student information and track attendance
          </p>
        </div>
        {userRole !== 'student' && (
          <Button 
            onClick={handleAddStudent}
            data-testid="button-add-student"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                <p className="text-2xl font-bold">{students.filter(s => s.status === 'Active').length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Attendance</p>
                <p className="text-2xl font-bold">
                  {Math.round(students.reduce((sum, s) => sum + s.attendancePercentage, 0) / students.length)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Attendance</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.attendancePercentage < 75).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Students List</CardTitle>
              <CardDescription>
                {filteredStudents.length} of {students.length} students shown
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                  data-testid="input-search-students"
                />
              </div>
              
              <Select value={filterSection} onValueChange={setFilterSection}>
                <SelectTrigger className="w-full sm:w-40" data-testid="select-filter-section">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {sections.map((section) => (
                    <SelectItem key={section} value={section}>{section}</SelectItem>
                  ))}
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
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{student.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={student.status === 'Active' ? 'border-chart-2 text-chart-2' : 'border-muted text-muted-foreground'}
                      >
                        {student.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{student.rollNo}</span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {student.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {student.section}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={cn("font-medium", getAttendanceColor(student.attendancePercentage))}>
                    {student.attendancePercentage}% Attendance
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewProfile(student)}
                      data-testid={`button-view-${student.id}`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {userRole !== 'student' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditStudent(student)}
                          data-testid={`button-edit-${student.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteStudent(student.id)}
                          data-testid={`button-delete-${student.id}`}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Profile Dialog */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedStudent.avatar} />
                  <AvatarFallback>{selectedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div>{selectedStudent.name}</div>
                  <div className="text-sm text-muted-foreground font-normal">{selectedStudent.rollNo}</div>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Section</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.section}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Year</Label>
                  <p className="text-sm text-muted-foreground">Year {selectedStudent.year}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Attendance</Label>
                  <p className={cn("text-sm font-medium", getAttendanceColor(selectedStudent.attendancePercentage))}>
                    {selectedStudent.attendancePercentage}%
                  </p>
                </div>
              </div>
              
              {selectedStudent.dateOfBirth && (
                <div>
                  <Label className="text-sm font-medium">Date of Birth</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.dateOfBirth}</p>
                </div>
              )}
              
              {selectedStudent.address && (
                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.address}</p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
              {userRole !== 'student' && (
                <Button onClick={() => handleEditStudent(selectedStudent)}>
                  Edit Student
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
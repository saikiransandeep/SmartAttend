import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BookOpen,
  Users,
  Clock,
  GraduationCap,
  User
} from "lucide-react";

interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  semester: number;
  year: number;
  facultyAssigned: string;
  facultyName: string;
  sections: string[];
  status: 'Active' | 'Inactive';
}

export function CourseManagement() {
  // todo: remove mock functionality
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      name: 'Data Structures and Algorithms',
      description: 'Fundamental concepts of data structures including arrays, linked lists, stacks, queues, trees, and graphs.',
      credits: 4,
      department: 'Computer Science',
      semester: 3,
      year: 2,
      facultyAssigned: 'EMP001',
      facultyName: 'Dr. Sarah Johnson',
      sections: ['CS-A', 'CS-B'],
      status: 'Active'
    },
    {
      id: '2',
      code: 'CS201',
      name: 'Database Management Systems',
      description: 'Comprehensive study of database design, SQL, normalization, and database administration.',
      credits: 3,
      department: 'Computer Science',
      semester: 4,
      year: 2,
      facultyAssigned: 'EMP001',
      facultyName: 'Dr. Sarah Johnson',
      sections: ['CS-A'],
      status: 'Active'
    },
    {
      id: '3',
      code: 'ML301',
      name: 'Machine Learning Fundamentals',
      description: 'Introduction to machine learning algorithms, supervised and unsupervised learning techniques.',
      credits: 4,
      department: 'Computer Science',
      semester: 5,
      year: 3,
      facultyAssigned: 'EMP002',
      facultyName: 'Prof. Michael Davis',
      sections: ['CS-A', 'CS-B'],
      status: 'Active'
    },
    {
      id: '4',
      code: 'ME201',
      name: 'Thermodynamics',
      description: 'Laws of thermodynamics, thermodynamic processes, and engineering applications.',
      credits: 3,
      department: 'Mechanical Engineering',
      semester: 3,
      year: 2,
      facultyAssigned: 'EMP003',
      facultyName: 'Dr. Emily Wilson',
      sections: ['ME-A', 'ME-B'],
      status: 'Active'
    },
    {
      id: '5',
      code: 'EE101',
      name: 'Circuit Analysis',
      description: 'Basic electrical circuits, Ohms law, Kirchhoffs laws, and circuit analysis techniques.',
      credits: 4,
      department: 'Electrical Engineering',
      semester: 2,
      year: 1,
      facultyAssigned: 'EMP004',
      facultyName: 'Prof. Robert Brown',
      sections: ['EE-A'],
      status: 'Active'
    },
    {
      id: '6',
      code: 'CS102',
      name: 'Object Oriented Programming',
      description: 'Programming concepts using object-oriented approach with Java/C++.',
      credits: 3,
      department: 'Computer Science',
      semester: 2,
      year: 1,
      facultyAssigned: '',
      facultyName: 'Unassigned',
      sections: [],
      status: 'Inactive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showAssignFaculty, setShowAssignFaculty] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Course>>({
    code: '',
    name: '',
    description: '',
    credits: 1,
    department: '',
    semester: 1,
    year: 1,
    status: 'Active',
    sections: []
  });

  // todo: remove mock functionality
  const availableFaculty = [
    { id: 'EMP001', name: 'Dr. Sarah Johnson', department: 'Computer Science' },
    { id: 'EMP002', name: 'Prof. Michael Davis', department: 'Computer Science' },
    { id: 'EMP003', name: 'Dr. Emily Wilson', department: 'Mechanical Engineering' },
    { id: 'EMP004', name: 'Prof. Robert Brown', department: 'Electrical Engineering' },
    { id: 'EMP005', name: 'Dr. Lisa Anderson', department: 'Mathematics' }
  ];

  const departments = Array.from(new Set(courses.map(c => c.department)));
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filterDepartment === "all" || course.department === filterDepartment;
    const matchesYear = filterYear === "all" || course.year.toString() === filterYear;
    const matchesStatus = filterStatus === "all" || course.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesYear && matchesStatus;
  });

  const handleAddCourse = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      credits: 1,
      department: '',
      semester: 1,
      year: 1,
      status: 'Active',
      sections: []
    });
    setIsAddingCourse(true);
    setIsEditing(false);
  };

  const handleEditCourse = (course: Course) => {
    setFormData(course);
    setSelectedCourse(course);
    setIsAddingCourse(true);
    setIsEditing(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    console.log("Delete course", courseId);
  };

  const handleViewCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleAssignFaculty = (course: Course) => {
    setSelectedCourse(course);
    setShowAssignFaculty(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedCourse) {
      setCourses(prev => prev.map(c => 
        c.id === selectedCourse.id ? { 
          ...c, 
          ...formData,
          facultyName: formData.facultyAssigned ? 
            availableFaculty.find(f => f.id === formData.facultyAssigned)?.name || 'Unassigned' : 'Unassigned'
        } : c
      ));
      console.log("Updated course", formData);
    } else {
      const newCourse: Course = {
        ...formData as Course,
        id: (courses.length + 1).toString(),
        facultyAssigned: '',
        facultyName: 'Unassigned',
        sections: []
      };
      setCourses(prev => [...prev, newCourse]);
      console.log("Added new course", newCourse);
    }
    
    setIsAddingCourse(false);
    setSelectedCourse(null);
  };

  const handleFacultyAssignment = (facultyId: string, sections: string[]) => {
    if (selectedCourse) {
      const faculty = availableFaculty.find(f => f.id === facultyId);
      setCourses(prev => prev.map(c => 
        c.id === selectedCourse.id ? {
          ...c,
          facultyAssigned: facultyId,
          facultyName: faculty?.name || 'Unassigned',
          sections: sections
        } : c
      ));
      setShowAssignFaculty(false);
      setSelectedCourse(null);
      console.log("Assigned faculty", facultyId, "to sections", sections);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Course Management</h1>
          <p className="text-muted-foreground">
            Manage subjects, courses, and faculty assignments
          </p>
        </div>
        <Button 
          onClick={handleAddCourse}
          data-testid="button-add-course"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold text-chart-2">
                  {courses.filter(c => c.status === 'Active').length}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold text-chart-3">
                  {courses.filter(c => c.facultyAssigned).length}
                </p>
              </div>
              <Users className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unassigned</p>
                <p className="text-2xl font-bold text-destructive">
                  {courses.filter(c => !c.facultyAssigned).length}
                </p>
              </div>
              <User className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Courses List</CardTitle>
              <CardDescription>
                {filteredCourses.length} of {courses.length} courses shown
              </CardDescription>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                  data-testid="input-search-courses"
                />
              </div>
              
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-full sm:w-48" data-testid="select-filter-department">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-full sm:w-24" data-testid="select-filter-year">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1">Year 1</SelectItem>
                  <SelectItem value="2">Year 2</SelectItem>
                  <SelectItem value="3">Year 3</SelectItem>
                  <SelectItem value="4">Year 4</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32" data-testid="select-filter-status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 border rounded-lg hover-elevate"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{course.code} - {course.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={course.status === 'Active' ? 'border-chart-2 text-chart-2' : 'border-muted text-muted-foreground'}
                    >
                      {course.status}
                    </Badge>
                    {!course.facultyAssigned && (
                      <Badge variant="destructive" className="text-xs">
                        Unassigned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {course.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      Year {course.year}, Sem {course.semester}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.credits} Credits
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {course.facultyName}
                    </span>
                  </div>
                  {course.sections.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {course.sections.map((section) => (
                        <Badge key={section} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewCourse(course)}
                    data-testid={`button-view-${course.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAssignFaculty(course)}
                    data-testid={`button-assign-${course.id}`}
                  >
                    <Users className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditCourse(course)}
                    data-testid={`button-edit-${course.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCourse(course.id)}
                    data-testid={`button-delete-${course.id}`}
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

      {/* Add/Edit Course Dialog */}
      <Dialog open={isAddingCourse} onOpenChange={setIsAddingCourse}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Course' : 'Add New Course'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update course information' : 'Enter the details for the new course'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Course Code *</Label>
                <Input
                  id="code"
                  value={formData.code || ''}
                  onChange={(e) => setFormData(prev => ({...prev, code: e.target.value}))}
                  data-testid="input-course-code"
                  placeholder="e.g., CS101"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credits">Credits *</Label>
                <Select 
                  value={formData.credits?.toString() || '1'} 
                  onValueChange={(value) => setFormData(prev => ({...prev, credits: parseInt(value)}))}
                >
                  <SelectTrigger data-testid="select-course-credits">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Credit</SelectItem>
                    <SelectItem value="2">2 Credits</SelectItem>
                    <SelectItem value="3">3 Credits</SelectItem>
                    <SelectItem value="4">4 Credits</SelectItem>
                    <SelectItem value="5">5 Credits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Course Name *</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                data-testid="input-course-name"
                placeholder="e.g., Data Structures and Algorithms"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                data-testid="input-course-description"
                placeholder="Brief description of the course..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select 
                  value={formData.department || ''} 
                  onValueChange={(value) => setFormData(prev => ({...prev, department: value}))}
                >
                  <SelectTrigger data-testid="select-course-department">
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
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Select 
                  value={formData.year?.toString() || '1'} 
                  onValueChange={(value) => setFormData(prev => ({...prev, year: parseInt(value)}))}
                >
                  <SelectTrigger data-testid="select-course-year">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Year 1</SelectItem>
                    <SelectItem value="2">Year 2</SelectItem>
                    <SelectItem value="3">Year 3</SelectItem>
                    <SelectItem value="4">Year 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester *</Label>
                <Select 
                  value={formData.semester?.toString() || '1'} 
                  onValueChange={(value) => setFormData(prev => ({...prev, semester: parseInt(value)}))}
                >
                  <SelectTrigger data-testid="select-course-semester">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Semester 1</SelectItem>
                    <SelectItem value="2">Semester 2</SelectItem>
                    <SelectItem value="3">Semester 3</SelectItem>
                    <SelectItem value="4">Semester 4</SelectItem>
                    <SelectItem value="5">Semester 5</SelectItem>
                    <SelectItem value="6">Semester 6</SelectItem>
                    <SelectItem value="7">Semester 7</SelectItem>
                    <SelectItem value="8">Semester 8</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status || 'Active'} 
                onValueChange={(value: 'Active' | 'Inactive') => setFormData(prev => ({...prev, status: value}))}
              >
                <SelectTrigger data-testid="select-course-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddingCourse(false)}
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-save-course">
                {isEditing ? 'Update' : 'Add'} Course
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Faculty Assignment Dialog */}
      <Dialog open={showAssignFaculty} onOpenChange={setShowAssignFaculty}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Faculty</DialogTitle>
            <DialogDescription>
              Assign faculty and sections for {selectedCourse?.code} - {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Faculty</Label>
              <Select onValueChange={(facultyId) => {
                const sections = ['CS-A', 'CS-B', 'ME-A', 'ME-B', 'EE-A']; // todo: dynamic sections
                handleFacultyAssignment(facultyId, sections.slice(0, 2));
              }}>
                <SelectTrigger data-testid="select-assign-faculty">
                  <SelectValue placeholder="Choose faculty member" />
                </SelectTrigger>
                <SelectContent>
                  {availableFaculty.map((faculty) => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name} - {faculty.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignFaculty(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Details Dialog */}
      {selectedCourse && !isAddingCourse && !showAssignFaculty && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedCourse.code} - {selectedCourse.name}</DialogTitle>
              <DialogDescription>Course details and information</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Course Code</Label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Credits</Label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.credits}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Department</Label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Year & Semester</Label>
                  <p className="text-sm text-muted-foreground">Year {selectedCourse.year}, Semester {selectedCourse.semester}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Faculty Assigned</Label>
                  <p className="text-sm text-muted-foreground">{selectedCourse.facultyName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Badge className={selectedCourse.status === 'Active' ? 'bg-chart-2/10 text-chart-2' : 'bg-muted'}>
                    {selectedCourse.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="text-sm text-muted-foreground mt-1">{selectedCourse.description}</p>
              </div>
              
              {selectedCourse.sections.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Assigned Sections</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCourse.sections.map((section) => (
                      <Badge key={section} variant="secondary">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>
              <Button onClick={() => handleEditCourse(selectedCourse)}>
                Edit Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
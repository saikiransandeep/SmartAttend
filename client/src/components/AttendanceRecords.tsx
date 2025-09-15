import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Search, 
  Filter, 
  Download, 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AttendanceRecord {
  id: string;
  studentName: string;
  rollNo: string;
  subject: string;
  section: string;
  department: string;
  date: string;
  time: string;
  status: 'Present' | 'Absent' | 'OD';
  markedBy: string;
}

export function AttendanceRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // todo: remove mock functionality
  const [records] = useState<AttendanceRecord[]>([
    {
      id: "1",
      studentName: "Alice Johnson",
      rollNo: "21CS001",
      subject: "Data Structures",
      section: "CS-A",
      department: "Computer Science",
      date: "2024-03-15",
      time: "10:00 AM",
      status: "Present",
      markedBy: "Dr. Smith"
    },
    {
      id: "2", 
      studentName: "Bob Smith",
      rollNo: "21CS002",
      subject: "Data Structures",
      section: "CS-A",
      department: "Computer Science",
      date: "2024-03-15",
      time: "10:00 AM",
      status: "Absent",
      markedBy: "Dr. Smith"
    },
    {
      id: "3",
      studentName: "Carol Davis",
      rollNo: "21CS003",
      subject: "Algorithms",
      section: "CS-B",
      department: "Computer Science",
      date: "2024-03-14",
      time: "2:00 PM",
      status: "Present",
      markedBy: "Prof. Johnson"
    },
    {
      id: "4",
      studentName: "David Wilson",
      rollNo: "21CS004",
      subject: "Database Systems",
      section: "CS-A",
      department: "Computer Science",
      date: "2024-03-14",
      time: "11:30 AM",
      status: "OD",
      markedBy: "Dr. Brown"
    },
    {
      id: "5",
      studentName: "Emily Brown",
      rollNo: "21CS005",
      subject: "Machine Learning",
      section: "CS-A",
      department: "Computer Science",
      date: "2024-03-13",
      time: "9:00 AM",
      status: "Present",
      markedBy: "Dr. Wilson"
    },
    {
      id: "6",
      studentName: "Frank Miller",
      rollNo: "21ME001",
      subject: "Thermodynamics",
      section: "ME-A",
      department: "Mechanical Engineering",
      date: "2024-03-15",
      time: "1:00 PM",
      status: "Present",
      markedBy: "Prof. Taylor"
    },
    {
      id: "7",
      studentName: "Grace Taylor",
      rollNo: "21ME002",
      subject: "Fluid Mechanics",
      section: "ME-A", 
      department: "Mechanical Engineering",
      date: "2024-03-14",
      time: "3:00 PM",
      status: "Absent",
      markedBy: "Dr. Anderson"
    },
    {
      id: "8",
      studentName: "Henry Anderson",
      rollNo: "21EE001",
      subject: "Circuit Analysis",
      section: "EE-A",
      department: "Electrical Engineering",
      date: "2024-03-15",
      time: "11:00 AM",
      status: "Present",
      markedBy: "Prof. Davis"
    },
    {
      id: "9",
      studentName: "Ivy Thomas",
      rollNo: "21EE002",
      subject: "Digital Electronics",
      section: "EE-A",
      department: "Electrical Engineering",
      date: "2024-03-13",
      time: "2:30 PM",
      status: "OD",
      markedBy: "Dr. Martinez"
    },
    {
      id: "10",
      studentName: "Jack Martinez",
      rollNo: "21CS006",
      subject: "Operating Systems",
      section: "CS-B",
      department: "Computer Science",
      date: "2024-03-12",
      time: "10:30 AM",
      status: "Present",
      markedBy: "Prof. Wilson"
    },
    {
      id: "11",
      studentName: "Kate Johnson",
      rollNo: "21CS007",
      subject: "Software Engineering",
      section: "CS-B",
      department: "Computer Science",
      date: "2024-03-12",
      time: "2:00 PM",
      status: "Absent",
      markedBy: "Dr. Thompson"
    },
    {
      id: "12",
      studentName: "Liam Davis",
      rollNo: "21ME003",
      subject: "Manufacturing Processes",
      section: "ME-B",
      department: "Mechanical Engineering",
      date: "2024-03-11",
      time: "9:30 AM",
      status: "Present",
      markedBy: "Prof. Lee"
    }
  ]);

  const departments = Array.from(new Set(records.map(r => r.department)));
  const subjects = Array.from(new Set(records.map(r => r.subject)));

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === "all" || record.department === selectedDepartment;
    const matchesSubject = selectedSubject === "all" || record.subject === selectedSubject;
    const matchesStatus = selectedStatus === "all" || record.status === selectedStatus;
    
    const recordDate = new Date(record.date);
    const matchesDateFrom = !dateFrom || recordDate >= dateFrom;
    const matchesDateTo = !dateTo || recordDate <= dateTo;
    
    return matchesSearch && matchesDepartment && matchesSubject && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'Present': return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
      case 'Absent': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'OD': return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedSubject("all");
    setSelectedStatus("all");
    setDateFrom(undefined);
    setDateTo(undefined);
    setCurrentPage(1);
  };

  const exportData = (format: 'pdf' | 'excel') => {
    console.log(`Exporting attendance records as ${format}`);
    // todo: implement actual export functionality
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Attendance Records</h1>
          <p className="text-muted-foreground">
            View and filter student attendance records across all subjects and departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => exportData('excel')}
            data-testid="button-export-excel"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </Button>
          <Button 
            variant="outline" 
            onClick={() => exportData('pdf')}
            data-testid="button-export-pdf"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-sm text-muted-foreground">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-chart-2">
              {records.filter(r => r.status === 'Present').length}
            </div>
            <p className="text-sm text-muted-foreground">Present</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-destructive">
              {records.filter(r => r.status === 'Absent').length}
            </div>
            <p className="text-sm text-muted-foreground">Absent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-chart-3">
              {records.filter(r => r.status === 'OD').length}
            </div>
            <p className="text-sm text-muted-foreground">On Duty</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>Filter attendance records by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search student, roll no, subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-records"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger data-testid="select-department">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger data-testid="select-subject">
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger data-testid="select-status">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="OD">On Duty</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                    data-testid="button-date-from"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Date To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                    data-testid="button-date-to"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={clearFilters} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                Showing {paginatedRecords.length} of {filteredRecords.length} records
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Student</th>
                  <th className="text-left p-3 font-medium">Roll No</th>
                  <th className="text-left p-3 font-medium">Subject</th>
                  <th className="text-left p-3 font-medium">Section</th>
                  <th className="text-left p-3 font-medium">Department</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Time</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Marked By</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecords.map((record) => (
                  <tr key={record.id} className="border-b hover-elevate">
                    <td className="p-3 font-medium">{record.studentName}</td>
                    <td className="p-3 text-muted-foreground">{record.rollNo}</td>
                    <td className="p-3">{record.subject}</td>
                    <td className="p-3">{record.section}</td>
                    <td className="p-3 text-sm">{record.department}</td>
                    <td className="p-3">{format(new Date(record.date), "MMM dd, yyyy")}</td>
                    <td className="p-3">{record.time}</td>
                    <td className="p-3">
                      <Badge className={cn("border", getStatusColor(record.status))}>
                        {record.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-muted-foreground">{record.markedBy}</td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        data-testid={`button-view-${record.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  data-testid="button-first-page"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  data-testid="button-prev-page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  data-testid="button-next-page"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  data-testid="button-last-page"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
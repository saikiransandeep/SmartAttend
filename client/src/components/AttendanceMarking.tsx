import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCheck, UserX, Search, Calendar, Clock, Users, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  rollNo: string;
  name: string;
  avatar?: string;
  status: 'Present' | 'Absent' | 'OD' | null;
}

interface AttendanceMarkingProps {
  classInfo: {
    subject: string;
    section: string;
    date: string;
    time: string;
    totalStudents: number;
  };
}

export function AttendanceMarking({ classInfo }: AttendanceMarkingProps) {
  // todo: remove mock functionality
  const [students, setStudents] = useState<Student[]>([
    { id: '1', rollNo: '21CS001', name: 'Alice Johnson', status: null },
    { id: '2', rollNo: '21CS002', name: 'Bob Smith', status: null },
    { id: '3', rollNo: '21CS003', name: 'Carol Davis', status: null },
    { id: '4', rollNo: '21CS004', name: 'David Wilson', status: null },
    { id: '5', rollNo: '21CS005', name: 'Emily Brown', status: null },
    { id: '6', rollNo: '21CS006', name: 'Frank Miller', status: null },
    { id: '7', rollNo: '21CS007', name: 'Grace Taylor', status: null },
    { id: '8', rollNo: '21CS008', name: 'Henry Anderson', status: null },
    { id: '9', rollNo: '21CS009', name: 'Ivy Thomas', status: null },
    { id: '10', rollNo: '21CS010', name: 'Jack Martinez', status: null },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [markingMode, setMarkingMode] = useState<"individual" | "bulk">("individual");

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAttendance = (studentId: string, status: 'Present' | 'Absent' | 'OD') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
    console.log(`Marked ${studentId} as ${status}`);
  };

  const bulkMarkAll = (status: 'Present' | 'Absent') => {
    setStudents(prev => prev.map(student => ({ ...student, status })));
    console.log(`Bulk marked all as ${status}`);
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'Present': return <CheckCircle2 className="h-4 w-4 text-chart-2" />;
      case 'Absent': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'OD': return <AlertCircle className="h-4 w-4 text-chart-3" />;
      default: return null;
    }
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'Present': return 'bg-chart-2/10 text-chart-2 border-chart-2/20';
      case 'Absent': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'OD': return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const odCount = students.filter(s => s.status === 'OD').length;
  const unmarkedCount = students.filter(s => s.status === null).length;

  return (
    <div className="space-y-6">
      {/* Class Information Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {classInfo.subject} - {classInfo.section}
              </CardTitle>
              <CardDescription className="flex items-center gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {classInfo.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {classInfo.time}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {classInfo.totalStudents} Students
                </span>
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={cn("border", getStatusColor('Present'))}>
                Present: {presentCount}
              </Badge>
              <Badge variant="outline" className={cn("border", getStatusColor('Absent'))}>
                Absent: {absentCount}
              </Badge>
              <Badge variant="outline" className={cn("border", getStatusColor('OD'))}>
                OD: {odCount}
              </Badge>
              {unmarkedCount > 0 && (
                <Badge variant="outline">
                  Unmarked: {unmarkedCount}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-sm">
          <Label htmlFor="search" className="sr-only">Search students</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-students"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={markingMode} onValueChange={(value: "individual" | "bulk") => setMarkingMode(value)}>
            <SelectTrigger className="w-32" data-testid="select-marking-mode">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="bulk">Bulk Mode</SelectItem>
            </SelectContent>
          </Select>

          {markingMode === "bulk" && (
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={() => bulkMarkAll('Present')}
                data-testid="button-bulk-present"
                className="bg-chart-2/10 text-chart-2 hover:bg-chart-2/20 border border-chart-2/20"
              >
                Mark All Present
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => bulkMarkAll('Absent')}
                data-testid="button-bulk-absent"
              >
                Mark All Absent
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Student Attendance</CardTitle>
          <CardDescription>
            {filteredStudents.length} of {students.length} students shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 border rounded-lg hover-elevate"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {student.status && (
                    <Badge variant="outline" className={cn("border", getStatusColor(student.status))}>
                      {getStatusIcon(student.status)}
                      {student.status}
                    </Badge>
                  )}

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={student.status === 'Present' ? 'default' : 'outline'}
                      onClick={() => markAttendance(student.id, 'Present')}
                      data-testid={`button-present-${student.id}`}
                      className={student.status === 'Present' ? 'bg-chart-2 text-white hover:bg-chart-2/80' : ''}
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === 'Absent' ? 'destructive' : 'outline'}
                      onClick={() => markAttendance(student.id, 'Absent')}
                      data-testid={`button-absent-${student.id}`}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === 'OD' ? 'default' : 'outline'}
                      onClick={() => markAttendance(student.id, 'OD')}
                      data-testid={`button-od-${student.id}`}
                      className={student.status === 'OD' ? 'bg-chart-3 text-white hover:bg-chart-3/80' : ''}
                    >
                      OD
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline" data-testid="button-save-draft">
          Save as Draft
        </Button>
        <Button data-testid="button-submit-attendance">
          Submit Attendance
        </Button>
      </div>
    </div>
  );
}
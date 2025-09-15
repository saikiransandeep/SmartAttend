import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AttendanceChart } from "./AttendanceChart";
import { 
  Download, 
  Calendar as CalendarIcon,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportData {
  department: string;
  totalStudents: number;
  totalClasses: number;
  avgAttendance: number;
  presentStudents: number;
  absentStudents: number;
  odStudents: number;
}

export function Reports() {
  const [reportType, setReportType] = useState("attendance");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  // todo: remove mock functionality
  const [reportData] = useState<ReportData[]>([
    {
      department: "Computer Science",
      totalStudents: 150,
      totalClasses: 25,
      avgAttendance: 87,
      presentStudents: 130,
      absentStudents: 15,
      odStudents: 5
    },
    {
      department: "Mechanical Engineering",
      totalStudents: 120,
      totalClasses: 20,
      avgAttendance: 82,
      presentStudents: 98,
      absentStudents: 18,
      odStudents: 4
    },
    {
      department: "Electrical Engineering",
      totalStudents: 100,
      totalClasses: 18,
      avgAttendance: 89,
      presentStudents: 89,
      absentStudents: 8,
      odStudents: 3
    },
    {
      department: "Mathematics",
      totalStudents: 80,
      totalClasses: 15,
      avgAttendance: 91,
      presentStudents: 73,
      absentStudents: 5,
      odStudents: 2
    }
  ]);

  // todo: remove mock functionality
  const chartData = {
    departmentAttendance: reportData.map(dept => ({
      name: dept.department.replace(' ', '\n'),
      value: dept.avgAttendance
    })),
    attendanceDistribution: [
      { name: 'Present', value: reportData.reduce((sum, d) => sum + d.presentStudents, 0) },
      { name: 'Absent', value: reportData.reduce((sum, d) => sum + d.absentStudents, 0) },
      { name: 'OD', value: reportData.reduce((sum, d) => sum + d.odStudents, 0) }
    ],
    monthlyTrend: [
      { name: 'Jan', value: 85 },
      { name: 'Feb', value: 88 },
      { name: 'Mar', value: 87 },
      { name: 'Apr', value: 90 },
      { name: 'May', value: 89 },
      { name: 'Jun', value: 92 }
    ],
    subjectWiseAttendance: [
      { name: 'Data Structures', value: 92 },
      { name: 'Database Systems', value: 88 },
      { name: 'Machine Learning', value: 85 },
      { name: 'Thermodynamics', value: 87 },
      { name: 'Circuit Analysis', value: 90 }
    ]
  };

  const departments = Array.from(new Set(reportData.map(r => r.department)));
  const subjects = ['Data Structures', 'Database Systems', 'Machine Learning', 'Thermodynamics', 'Circuit Analysis'];

  const generateReport = (format: 'pdf' | 'excel') => {
    console.log(`Generating ${reportType} report as ${format}`, {
      department: selectedDepartment,
      subject: selectedSubject,
      dateFrom,
      dateTo
    });
    // todo: implement actual report generation
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return "text-chart-2 bg-chart-2/10";
    if (percentage >= 75) return "text-chart-3 bg-chart-3/10";
    return "text-destructive bg-destructive/10";
  };

  const totalStudents = reportData.reduce((sum, d) => sum + d.totalStudents, 0);
  const totalPresent = reportData.reduce((sum, d) => sum + d.presentStudents, 0);
  const totalAbsent = reportData.reduce((sum, d) => sum + d.absentStudents, 0);
  const totalOD = reportData.reduce((sum, d) => sum + d.odStudents, 0);
  const overallAttendance = Math.round((totalPresent / totalStudents) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate comprehensive attendance reports and view analytics
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-chart-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
                <p className="text-2xl font-bold text-chart-2">{overallAttendance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                <p className="text-2xl font-bold text-chart-2">{totalPresent}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Attendance</p>
                <p className="text-2xl font-bold text-destructive">
                  {reportData.filter(d => d.avgAttendance < 75).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Reports
          </CardTitle>
          <CardDescription>Configure and generate attendance reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger data-testid="select-report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Attendance Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Attendance</SelectItem>
                  <SelectItem value="defaulters">Defaulters Report</SelectItem>
                  <SelectItem value="department">Department-wise</SelectItem>
                  <SelectItem value="subject">Subject-wise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger data-testid="select-report-department">
                  <SelectValue />
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
                <SelectTrigger data-testid="select-report-subject">
                  <SelectValue />
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
              <Label>Date From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                    data-testid="button-report-date-from"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "PPP") : "Select date"}
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
                    data-testid="button-report-date-to"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "PPP") : "Select date"}
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

          <div className="flex gap-2 mt-6">
            <Button 
              onClick={() => generateReport('pdf')}
              data-testid="button-generate-pdf"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Generate PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => generateReport('excel')}
              data-testid="button-generate-excel"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart
          title="Department-wise Attendance"
          description="Average attendance percentage by department"
          type="bar"
          data={chartData.departmentAttendance}
          height={300}
        />
        
        <AttendanceChart
          title="Attendance Distribution"
          description="Overall attendance status breakdown"
          type="pie"
          data={chartData.attendanceDistribution}
          height={300}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart
          title="Monthly Attendance Trend"
          description="Attendance trend over the past 6 months"
          type="line"
          data={chartData.monthlyTrend}
          height={300}
        />
        
        <AttendanceChart
          title="Subject-wise Attendance"
          description="Attendance percentage by subject"
          type="bar"
          data={chartData.subjectWiseAttendance}
          height={300}
        />
      </div>

      {/* Department Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Department Summary
          </CardTitle>
          <CardDescription>Detailed breakdown by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Department</th>
                  <th className="text-left p-3 font-medium">Total Students</th>
                  <th className="text-left p-3 font-medium">Total Classes</th>
                  <th className="text-left p-3 font-medium">Avg. Attendance</th>
                  <th className="text-left p-3 font-medium">Present</th>
                  <th className="text-left p-3 font-medium">Absent</th>
                  <th className="text-left p-3 font-medium">On Duty</th>
                  <th className="text-left p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((dept) => (
                  <tr key={dept.department} className="border-b hover-elevate">
                    <td className="p-3 font-medium">{dept.department}</td>
                    <td className="p-3">{dept.totalStudents}</td>
                    <td className="p-3">{dept.totalClasses}</td>
                    <td className="p-3">
                      <Badge className={cn("border", getAttendanceColor(dept.avgAttendance))}>
                        {dept.avgAttendance}%
                      </Badge>
                    </td>
                    <td className="p-3 text-chart-2">{dept.presentStudents}</td>
                    <td className="p-3 text-destructive">{dept.absentStudents}</td>
                    <td className="p-3 text-chart-3">{dept.odStudents}</td>
                    <td className="p-3">
                      {dept.avgAttendance >= 85 ? (
                        <Badge className="bg-chart-2/10 text-chart-2">Good</Badge>
                      ) : dept.avgAttendance >= 75 ? (
                        <Badge className="bg-chart-3/10 text-chart-3">Average</Badge>
                      ) : (
                        <Badge variant="destructive">Poor</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Best Performing</p>
                <p className="font-semibold">{reportData.reduce((max, dept) => dept.avgAttendance > max.avgAttendance ? dept : max).department}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Needs Attention</p>
                <p className="font-semibold">{reportData.reduce((min, dept) => dept.avgAttendance < min.avgAttendance ? dept : min).department}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-1/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="font-semibold">{reportData.reduce((sum, d) => sum + d.totalClasses, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
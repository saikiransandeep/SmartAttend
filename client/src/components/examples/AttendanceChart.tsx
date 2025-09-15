import { AttendanceChart } from '../AttendanceChart'

export default function AttendanceChartExample() {
  // todo: remove mock functionality
  const barData = [
    { name: 'Mon', value: 85 },
    { name: 'Tue', value: 92 },
    { name: 'Wed', value: 78 },
    { name: 'Thu', value: 88 },
    { name: 'Fri', value: 95 },
  ]

  const pieData = [
    { name: 'Present', value: 75 },
    { name: 'Absent', value: 15 },
    { name: 'OD', value: 10 },
  ]

  const lineData = [
    { name: 'Week 1', value: 85 },
    { name: 'Week 2', value: 88 },
    { name: 'Week 3', value: 82 },
    { name: 'Week 4', value: 90 },
    { name: 'Week 5', value: 87 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AttendanceChart
        title="Daily Attendance"
        description="This week's attendance percentage"
        type="bar"
        data={barData}
      />
      <AttendanceChart
        title="Attendance Distribution"
        description="Overall attendance breakdown"
        type="pie"
        data={pieData}
      />
      <AttendanceChart
        title="Attendance Trend"
        description="Weekly attendance trend"
        type="line"
        data={lineData}
      />
    </div>
  )
}
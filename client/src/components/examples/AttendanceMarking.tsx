import { AttendanceMarking } from '../AttendanceMarking'

export default function AttendanceMarkingExample() {
  const classInfo = {
    subject: "Computer Science Fundamentals",
    section: "CS-A Year 2",
    date: "March 15, 2024",
    time: "10:00 AM - 11:00 AM",
    totalStudents: 10
  }

  return <AttendanceMarking classInfo={classInfo} />
}
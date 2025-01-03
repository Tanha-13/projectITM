import { Button } from "../ui/button";
import { SidebarInset } from "../ui/sidebar";
import { Calendar } from "../ui/calendar";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "@radix-ui/react-progress";
import { Badge, Bell, Calendar1, CheckCircle2, Clock, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { useState } from "react";

function StudentContent() {
  const currentUser = useSelector((state) => state.auth.user);
  console.log(currentUser);
  const [date, setDate] = useState(() => new Date());

  const project = {
    title: "AI in Healthcare",
    supervisor: "Dr. Jane Smith",
    progress: 60,
    nextMilestone: "Data Analysis Report",
    nextMilestoneDate: "2023-05-20",
  };

  const tasks = [
    { id: 1, title: "Literature Review", status: "completed" },
    { id: 2, title: "Data Collection", status: "in-progress" },
    { id: 3, title: "Methodology Write-up", status: "todo" },
  ];

  const meetings = [
    { id: 1, date: "2023-05-15", time: "14:00", type: "Project Review" },
    {
      id: 2,
      date: "2023-05-22",
      time: "11:00",
      type: "Data Analysis Discussion",
    },
  ];


  const notifications = [
    {
      id: 1,
      message: "New feedback on your latest submission",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Reminder: Project milestone due in 3 days",
      time: "1 day ago",
    },
  ];
  const formattedSemester = currentUser?.semester?.replace(/\s+/g, "-");
  console.log(formattedSemester);
  return (
    <div>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              {`Welcome ${currentUser.firstName} ${currentUser.lastName}`}
            </h1>
            <Button variant="default" className="w-auto">
              <Link to={`/student/${currentUser.id}/projects/${formattedSemester}/${currentUser.projectId}`}>View Full Project</Link>
            </Button>
          </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border inline-block max-w-72"
            />
          <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white"
                      >
                        <div className="flex items-center space-x-2">
                          {task.status === "completed" && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                          {task.status === "in-progress" && (
                            <Clock className="h-5 w-5 text-yellow-500" />
                          )}
                          {task.status === "todo" && (
                            <FileText className="h-5 w-5 text-gray-500" />
                          )}
                          <span className="font-medium">{task.title}</span>
                        </div>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "in-progress"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Meetings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {meetings.map((meeting) => (
                        <div
                          key={meeting.id}
                          className="flex items-center space-x-4 p-2 border-b last:border-b-0"
                        >
                          <Calendar1 className="h-4 w-4 text-blue-500" />
                          <div>
                            <p className="font-medium">{meeting.type}</p>
                            <p className="text-sm text-gray-500">
                              {meeting.date} at {meeting.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-4 p-2 border-b last:border-b-0"
                        >
                          <Bell className="h-4 w-4 text-blue-500 mt-1" />
                          <div>
                            <p className="font-medium">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}

export default StudentContent;

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Nusrat",
    student: 56,
    project: 23,
    thesis: 15,
  },
  {
    name: "Nafees ",
    student: 40,
    project: 25,
    thesis: 15,
  },
  {
    name: "Ashik",
    student: 45,
    project: 30,
    thesis: 15,
  },
  {
    name: "Masum",
    student: 67,
    project: 34,
    thesis: 90,
  },
  {
    name: "Moni",
    student: 78,
    project: 48,
    thesis: 21,
  },
];

function StudentChart() {
  return (
    <div className="w-full h-[400px] mt-20">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">Students Allocation</h1>
        <p className="text-gray-700 mb-4">
          A bar chart for student allocation based on Project and Thesis among
          Supervisors
        </p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="project" fill="#094074" />
          <Bar dataKey="thesis" fill="#3d9373" />
          <Bar dataKey="student" fill="#F76C5E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StudentChart;

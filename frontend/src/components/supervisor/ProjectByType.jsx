import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

function ProjectByType() {
  const [activeTab, setActiveTab] = useState("project");

  const tabs = ["project", "thesis"];

  const bgColors = [
    'bg-[#EB5B00]',
    'bg-[#AB4459]',
    'bg-[#8174A0]',
    'bg-[#AE445A]',
    'bg-[#3C552D]',
    'bg-[#3B1C32]',
    'bg-[#6A1E55]',
    'bg-[#B03052]',
    'bg-[#740938]',
    'bg-[#9A7E6F]',
    'bg-[#433878]',
    'bg-[#3A6D8C]',
    'bg-[#F05A7E]',
    'bg-[#F0A8D0]',
    'bg-[#E3A5C7]',
    'bg-[#131842]',
    'bg-[#FF4191]',
    'bg-[#E0A75E]',
  ];
  const randomColor = () => bgColors[Math.floor(Math.random()* bgColors.length)];

  const projectCards = [
    { title: "Project 1", description: "Description of Project 1" },
    { title: "Project 2", description: "Description of Project 2" },
    { title: "Project 3", description: "Description of Project 3" },
  ];

  const thesisCards = [
    {  title: "Thesis 1", description: "Description of Thesis 1" },
    { title: "Thesis 2", description: "Description of Thesis 2" },
    { title: "Thesis 3", description: "Description of Thesis 3" },
  ];
  return (
    <div className="">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 border-b-2 font-semibold w-full ${
              activeTab === tab
                ? "bg-[linear-gradient(to_right,_#094074,_#246953)] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } rounded-md`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(activeTab === "project" ? projectCards : thesisCards).map(
            (card, index) => (
              <Card className="overflow-hidden border-0" key={index}>
                <div className={`h-48 bg-[#EB5B40] transition-colors duration-300 hover:brightness-110`} />
                <CardContent className="bg-gray-200">
                  <p>{card.title}</p>
                  <p>{card.description}</p>
                </CardContent>
              </Card>

            )
          )}
        </div>

        <button className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
}

export default ProjectByType;

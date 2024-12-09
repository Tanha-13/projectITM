import { useState } from "react";

function ProjectByType() {
  const [activeTab, setActiveTab] = useState("project");

  const tabs = ["project", "thesis"];

  const projectCards = [
    { title: "Project 1", description: "Description of Project 1" },
    { title: "Project 2", description: "Description of Project 2" },
    { title: "Project 3", description: "Description of Project 3" },
  ];

  const thesisCards = [
    { title: "Thesis 1", description: "Description of Thesis 1" },
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
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
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

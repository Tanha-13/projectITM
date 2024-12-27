import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaTrash, FaUpload } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

function ProjectDetails() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});
  const [useCaseDiagram, setUseCaseDiagram] = useState(null);
  const [entityRelationDiagram, setEntityRelationDiagram] = useState(null);
  const [documentation, setDocumentation] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectOverview, setProjectOverview] = useState("");
  const [functionalRequirements, setFunctionalRequirements] = useState("");
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState("");
  const [completedSections, setCompletedSections] = useState({
    projectTitle: false,
    projectOverview: false,
    functionalRequirements: false,
    nonFunctionalRequirements: false,
    useCaseDiagram: false,
    entityRelationDiagram: false,
    documentation: false,

  });

  const currentUser = useSelector((state) => state.auth.user);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/projects/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching project");
        }
        const data = await response.json();
        setProject(data);
        setUseCaseDiagram(data.useCaseDiagram);
        setEntityRelationDiagram(data.entityRelationDiagram);
        setDocumentation(data.documentation);
        setFeedbackList(data.feedbackList || []);
        setCompletedSections(
          data.completedSections || {
            projectTitle: false,
          projectOverview: false,
          functionalRequirements: false,
          nonFunctionalRequirements: false,
            useCaseDiagram: false,
            entityRelationDiagram: false,
            documentation: false,
          }
        );
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching project details",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);
  console.log(project);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleFileChange = (e, setFile, maxSize) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > maxSize) {
        Swal.fire({
          title: "Error",
          text: `File size should not exceed ${maxSize / (1024 * 1024)} MB`,
          icon: "error",
        });
        return;
      }
      if (setFile !== setDocumentation && !file.type.startsWith("image/")) {
        Swal.fire({
          title: "Error",
          text: "Please upload an image file",
          icon: "error",
        });
        return;
      }
      setFile({
        file: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveFile = (setFile) => {
    setFile(null);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (useCaseDiagram && useCaseDiagram.file)
        formData.append("useCaseDiagram", useCaseDiagram.file);
      if (entityRelationDiagram && entityRelationDiagram.file)
        formData.append("entityRelationDiagram", entityRelationDiagram.file);
      if (documentation && documentation.file)
        formData.append("documentation", documentation.file);
      formData.append("feedback", feedback);
      formData.append("completedSections", JSON.stringify(completedSections));

      const response = await fetch(``, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error saving project data");
      }

      const updatedProject = await response.json();
      setUseCaseDiagram(updatedProject.useCaseDiagram);
      setEntityRelationDiagram(updatedProject.entityRelationDiagram);
      setDocumentation(updatedProject.documentation);
      setFeedbackList([
        ...feedbackList,
        { text: feedback, user: currentUser.name },
      ]);
      setFeedback("");
      setCompletedSections(updatedProject.completedSections);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Project details have been saved",
        showConfirmButton: true,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
  };

  const handleReply = (index) => {
    const updatedFeedbackList = [...feedbackList];
    updatedFeedbackList[index].replies = [
      ...(updatedFeedbackList[index].replies || []),
      { text: replyText, user: currentUser.name },
    ];
    setFeedbackList(updatedFeedbackList);
    setReplyText("");
  };

  const handleModify = (index) => {
    setFeedback(feedbackList[index].text);
    const updatedFeedbackList = feedbackList.filter((_, i) => i !== index);
    setFeedbackList(updatedFeedbackList);
  };

  const handleMarkAsComplete = (section) => {
    setCompletedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const calculateProgress = () => {
    const totalSections = Object.keys(completedSections).length;
    const completedCount =
      Object.values(completedSections).filter(Boolean).length;
    return (completedCount / totalSections) * 100;
  };

  const formatDate = (dateString) => {
  const date = new Date(dateString);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // For 11th to 19th
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${month} ${dayWithSuffix}, ${year}`;
};

  return (
    <div className="bg-gray-50 min-h-screen md:p-10">
      <Card className="p-2 rounded-none md:p-6">
        <div className="">
        <div className="flex justify-end">
        <Button>{`Export ${project.projectType === "Project" ? "Project" : "Thesis"}`}</Button>
        </div>
          <div className="mb-6 mt-4 text-center">
            <h1 className="text-4xl font-bold">{project.name}</h1>
            <h2 className="text-2xl font-bold mt-2">{project.title}</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-10">
            <Card className="grid gap-2 p-3 rounded-md max-h-48 min-h-44">
              <div className="grid grid-cols-2 items-center gap-2">
                <h3>Project Status</h3>
                <Badge className={`rounded-full font-medium text-base w-1/2 ${
                        project.status === "Not started"
                          ? "bg-gray-100 hover:bg-gray-200 text-gray-800 "
                          : project.status === "In progress"
                          ? "bg-blue-100 hover:bg-blue-200 text-blue-800"
                          : "bg-green-100 hover:bg-green-200 text-green-800"
                      }`}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        project.status === "Not started"
                          ? "bg-gray-500 "
                          : project.status === "In progress"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    />
                    {project.status}
                  </div>
                </Badge>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3>Project Start Date</h3>
                <span>{formatDate(project.startDate)}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3>Project End Date</h3>
                <span>{formatDate(project.endDate)}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3>Final Year Semester</h3>
                <span>{`${project.semester} ${project.year}`}</span>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <h3>Project Type</h3>
                <span className="border w-1/4 rounded-full ps-3 bg-primary text-white font-medium">{project.projectType}</span>
              </div>
            </Card>
            <Card className="mb-6 rounded-md min-h-48">
              <CardContent className="p-6 ">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Project Progress</h3>
                  <span className="font-semibold">
                    {Math.round(calculateProgress())}%
                  </span>
                </div>
                <Progress value={calculateProgress()} className="w-full" />
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 max-w-5xl mx-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Use Case Diagram</h3>
                <Button
                  variant={
                    completedSections.useCaseDiagram ? "outline" : "link"
                  }
                  onClick={() => handleMarkAsComplete("useCaseDiagram")}
                  className={
                    completedSections.useCaseDiagram
                      ? "text-white"
                      : "underline"
                  }
                >
                  {completedSections.useCaseDiagram ? (
                    <>
                      <FaCheck className="mr-2" /> Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors mb-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, setUseCaseDiagram, 1024 * 1024)
                  }
                  className="hidden"
                  id="use-case-upload"
                />
                <label htmlFor="use-case-upload" className="cursor-pointer">
                  <FaUpload className="mx-auto mb-2" size={24} />
                  <p>Choose Use Case Diagram to upload (Max 1MB)</p>
                </label>
              </div>
              {useCaseDiagram && (
                <div className="mt-4">
                  <img
                    src={
                      useCaseDiagram.preview ||
                      `http://localhost:3000/${useCaseDiagram.path}`
                    }
                    alt="Use Case Diagram"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFile(setUseCaseDiagram)}
                    className="mt-2"
                  >
                    <FaTrash className="mr-2" /> Remove
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 max-w-5xl mx-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  Entity Relation Diagram
                </h3>
                <Button
                  variant={
                    completedSections.entityRelationDiagram ? "outline" : "link"
                  }
                  onClick={() => handleMarkAsComplete("entityRelationDiagram")}
                  className={
                    completedSections.entityRelationDiagram
                      ? "text-white"
                      : "underline"
                  }
                >
                  {completedSections.entityRelationDiagram ? (
                    <>
                      <FaCheck className="mr-2" /> Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors mb-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(e, setEntityRelationDiagram, 1024 * 1024)
                  }
                  className="hidden"
                  id="er-diagram-upload"
                />
                <label htmlFor="er-diagram-upload" className="cursor-pointer">
                  <FaUpload className="mx-auto mb-2" size={24} />
                  <p>Choose Entity Relation Diagram to upload (Max 1MB)</p>
                </label>
              </div>
              {entityRelationDiagram && (
                <div className="mt-4">
                  <img
                    src={
                      entityRelationDiagram.preview ||
                      `http://localhost:3000/${entityRelationDiagram.path}`
                    }
                    alt="Entity Relation Diagram"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFile(setEntityRelationDiagram)}
                    className="mt-2"
                  >
                    <FaTrash className="mr-2" /> Remove
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6 max-w-5xl mx-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Documentation</h3>
                <Button
                  variant={completedSections.documentation ? "outline" : "link"}
                  onClick={() => handleMarkAsComplete("documentation")}
                  className={
                    completedSections.documentation ? "text-white" : "underline"
                  }
                >
                  {completedSections.documentation ? (
                    <>
                      <FaCheck className="mr-2" /> Completed
                    </>
                  ) : (
                    "Mark as Complete"
                  )}
                </Button>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors mb-4">
                <Input
                  type="file"
                  onChange={(e) =>
                    handleFileChange(e, setDocumentation, 2 * 1024 * 1024)
                  }
                  className="hidden"
                  id="documentation-upload"
                />
                <label
                  htmlFor="documentation-upload"
                  className="cursor-pointer"
                >
                  <FaUpload className="mx-auto mb-2" size={24} />
                  <p>Choose Documentation to upload (Max 2MB)</p>
                </label>
              </div>
              {documentation && (
                <div className="mt-4">
                  <p>
                    {documentation.file
                      ? documentation.file.name
                      : documentation.filename}
                  </p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFile(setDocumentation)}
                    className="mt-2"
                  >
                    <FaTrash className="mr-2" /> Remove
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-center space-x-4">
            <Button
              variant="destructive"
              onClick={() => {
                setUseCaseDiagram(project.useCaseDiagram);
                setEntityRelationDiagram(project.entityRelationDiagram);
                setDocumentation(project.documentation);
                setFeedback("");
                // setCompletedSections(project.completedSections);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                !useCaseDiagram &&
                !entityRelationDiagram &&
                !documentation &&
                feedback.trim() === ""
              }
            >
              Save All Changes
            </Button>
          </div>

          <Card className="mb-6 mt-6 max-w-5xl mx-auto">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Feedback</h3>
              </div>
              <Textarea
                placeholder="Provide feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
              <Button
                onClick={handleSave}
                className="mt-4"
                disabled={feedback.trim() === ""}
              >
                Submit Feedback
              </Button>

              <div className="mt-6">
                {feedbackList.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="font-semibold">{item.user}:</p>
                    <p>{item.text}</p>
                    <div className="mt-2">
                      <Textarea
                        placeholder="Reply to this feedback..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={2}
                      />
                      <Button
                        onClick={() => handleReply(index)}
                        className="mt-2"
                        disabled={replyText.trim() === ""}
                      >
                        Reply
                      </Button>
                      <Button
                        onClick={() => handleModify(index)}
                        className="mt-2 ml-2"
                      >
                        <FaEdit className="mr-2" /> Modify
                      </Button>
                    </div>
                    {item.replies &&
                      item.replies.map((reply, replyIndex) => (
                        <div
                          key={replyIndex}
                          className="bg-white p-2 rounded-lg mt-2"
                        >
                          <p className="font-semibold">{reply.user}:</p>
                          <p>{reply.text}</p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>
    </div>
  );
}

export default ProjectDetails;

import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaCheck, FaTrash, FaUpload, FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PdfFormat from '@/components/PdfFormat';

function ProjectDetails() {
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
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
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  const { projectId } = useParams();
  const currentUser = useSelector((state) => state.auth.user);

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
    setFile((prev) => {
      if (prev && prev.preview) {
        URL.revokeObjectURL(prev.preview);
      }
      return null;
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (useCaseDiagram && useCaseDiagram.file)
        formData.append("useCaseDiagram", useCaseDiagram.file);
      if (entityRelationDiagram && entityRelationDiagram.file)
        formData.append("entityRelationDiagram", entityRelationDiagram.file);
      if (documentation && documentation.file)
        formData.append("documentation", documentation.file);
      formData.append("feedback", feedback);
      formData.append("completedSections", JSON.stringify(completedSections));
      formData.append("title", projectTitle);
      formData.append("overview", projectOverview);
      formData.append("functionalRequirements", functionalRequirements);
      formData.append("nonFunctionalRequirements", nonFunctionalRequirements);

      const response = await fetch(
        `http://localhost:3000/api/projects/${projectId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Error saving project data");
      }

      const updatedProject = await response.json();
      setProject(updatedProject);
      setUseCaseDiagram(updatedProject.useCaseDiagram);
      setEntityRelationDiagram(updatedProject.entityRelationDiagram);
      setDocumentation(updatedProject.documentation);
      setFeedbackList(updatedProject.feedbackList || []);
      setCompletedSections(updatedProject.completedSections);
      setProjectTitle(updatedProject.title);
      setProjectOverview(updatedProject.overview);
      setFunctionalRequirements(updatedProject.functionalRequirements);
      setNonFunctionalRequirements(updatedProject.nonFunctionalRequirements);
      setFeedback("");

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Project details have been saved',
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save project details',
      });
    } finally {
      setLoading(false);
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
    setCompletedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const calculateProgress = () => {
    const totalSections = Object.keys(completedSections).length;
    const completedCount = Object.values(completedSections).filter(Boolean).length;
    return (completedCount / totalSections) * 100;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

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
        setProjectTitle(data.title || "");
        setProjectOverview(data.overview || "");
        setFunctionalRequirements(data.functionalRequirements || "");
        setNonFunctionalRequirements(data.nonFunctionalRequirements || "");
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen md:p-10">
      <Card className="p-2 rounded-sm md:p-6">
        <div className="">
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowPDFPreview(true)}>Preview PDF</Button>
            <PDFDownloadLink
              document={
                <PdfFormat 
                  project={{
                    ...project,
                    useCaseDiagram,
                    entityRelationDiagram,
                    documentation,
                    title: projectTitle,
                    overview: projectOverview,
                    functionalRequirements,
                    nonFunctionalRequirements,
                  }} 
                  studentName={currentUser.name} 
                  studentId={currentUser.studentId} 
                />
              }
              fileName={`${currentUser.name}-${currentUser.studentId}.pdf`}
            >
              {({ blob, url, loading, error }) => (
                <Button disabled={loading}>
                  {loading ? 'Generating PDF...' : `Export ${project.projectType === "Project" ? "Project" : "Thesis"}`}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
          <div className="my-6 text-center">
            <h1 className="text-2xl md:text-4xl font-bold">{project.name}</h1>
            <h2 className="text-xl md:text-2xl font-bold mt-2">{projectTitle}</h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 md:gap-10">
            <Card className="grid gap-2 p-3 rounded-md md:h-60">
              <div className="grid grid-cols-2 items-center gap-2">
                <h3>Project Status</h3>
                <Badge
                  className={`rounded-full font-medium text-sm xl:w-1/2 ${
                    project.status === "Not started"
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-800 "
                      : project.status === "In progress"
                      ? "bg-blue-100 hover:bg-blue-200 text-blue-800"
                      : "bg-green-100 hover:bg-green-200 text-green-800"
                  }`}
                >
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
                <span className="border lg:w-1/2 xl:w-1/4 rounded-full ps-3 bg-primary text-white font-medium">
                  {project.projectType}
                </span>
              </div>
            </Card>
            <Card className="mb-6 rounded-md md:h-60">
              <CardContent className="p-6 ">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Project Progress</h3>
                  <span className="font-semibold">
                    {Math.round(calculateProgress())}%
                  </span>
                </div>
                <p className="my-3">Project completion rate based on student work</p>
                <Progress value={calculateProgress()} className="w-full" />
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-md bg-gray-50 mt-5 p-1 md:p-5">
            <h1 className="font-semibold text-xl md:text-2xl ">Project Completion Work</h1>
            <Separator className="mb-10"/>
            <Card className="mb-6 max-w-5xl mx-auto">
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Project Title</h3>
                  <Button
                    variant={completedSections.projectTitle ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("projectTitle")}
                    className={completedSections.projectTitle ? "text-white" : "underline"}
                  >
                    {completedSections.projectTitle ? (
                      <>
                        <FaCheck className="" /> Completed
                      </>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="Enter project title"
                />
              </CardContent>
            </Card>

            <Card className="mb-6 max-w-5xl mx-auto">
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Project Overview</h3>
                  <Button
                    variant={completedSections.projectOverview ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("projectOverview")}
                    className={completedSections.projectOverview ? "text-white" : "underline"}
                  >
                    {completedSections.projectOverview ? (
                      <>
                        <FaCheck className="mr-2" /> Completed
                      </>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>
                <Textarea
                  value={projectOverview}
                  onChange={(e) => setProjectOverview(e.target.value)}
                  placeholder="Enter project overview"
                  rows={6}
                />
              </CardContent>
            </Card>

            <Card className="mb-6 max-w-5xl mx-auto">
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Functional Requirements</h3>
                  <Button
                    variant={completedSections.functionalRequirements ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("functionalRequirements")}
                    className={completedSections.functionalRequirements ? "text-white" : "underline"}
                  >
                    {completedSections.functionalRequirements ? (
                      <>
                        <FaCheck className="mr-2" /> Completed
                      </>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>
                <Textarea
                  value={functionalRequirements}
                  onChange={(e) => setFunctionalRequirements(e.target.value)}
                  placeholder="Enter functional requirements"
                  rows={15}
                />
              </CardContent>
            </Card>

            <Card className="mb-6 max-w-5xl mx-auto">
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Non-Functional Requirements</h3>
                  <Button
                    variant={completedSections.nonFunctionalRequirements ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("nonFunctionalRequirements")}
                    className={completedSections.nonFunctionalRequirements ? "text-white" : "underline"}
                  >
                    {completedSections.nonFunctionalRequirements ? (
                      <>
                        <FaCheck className="mr-2" /> Completed
                      </>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>
                <Textarea
                  value={nonFunctionalRequirements}
                  onChange={(e) => setNonFunctionalRequirements(e.target.value)}
                  placeholder="Enter non-functional requirements"
                  rows={10}
                />
              </CardContent>
            </Card>

            <Card className="mb-6 max-w-5xl mx-auto">
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Use Case Diagram</h3>
                  <Button
                    variant={completedSections.useCaseDiagram ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("useCaseDiagram")}
                    className={completedSections.useCaseDiagram ? "text-white" : "underline"}
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
                    onChange={(e) => handleFileChange(e, setUseCaseDiagram, 1024 * 1024)}
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
                      src={useCaseDiagram?.preview || `http://localhost:3000/${useCaseDiagram?.path}`}
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
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Entity Relation Diagram</h3>
                  <Button
                    variant={completedSections.entityRelationDiagram ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("entityRelationDiagram")}
                    className={completedSections.entityRelationDiagram ? "text-white" : "underline"}
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
                    onChange={(e) => handleFileChange(e, setEntityRelationDiagram, 1024 * 1024)}
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
                      src={entityRelationDiagram?.preview || `http://localhost:3000/${entityRelationDiagram?.path}`}
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
              <CardContent className="p-2 md:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base md:text-xl font-semibold">Documentation</h3>
                  <Button
                    variant={completedSections.documentation ? "outline" : "link"}
                    onClick={() => handleMarkAsComplete("documentation")}
                    className={completedSections.documentation ? "text-white" : "underline"}
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
                    onChange={(e) => handleFileChange(e, setDocumentation, 2 * 1024 * 1024)}
                    className="hidden"
                    id="documentation-upload"
                  />
                  <label htmlFor="documentation-upload" className="cursor-pointer">
                    <FaUpload className="mx-auto mb-2" size={24} />
                    <p>Choose Documentation to upload (Max 2MB)</p>
                  </label>
                </div>
                {documentation && (
                  <div className="mt-4">
                    <p>{documentation.file ? documentation.file.name : documentation.filename}</p>
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
                  setProjectTitle(project.title);
                  setProjectOverview(project.overview);
                  setFunctionalRequirements(project.functionalRequirements);
                  setNonFunctionalRequirements(project.nonFunctionalRequirements);
                  setCompletedSections(project.completedSections);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  !projectTitle ||
                  !projectOverview ||
                  !functionalRequirements ||
                  !nonFunctionalRequirements ||
                  !useCaseDiagram ||
                  !entityRelationDiagram ||
                  !documentation ||
                  feedback.trim() === ""
                }
              >
                Save All Changes
              </Button>
            </div>
          </Card>

          <div className="mb-6 mt-6 max-w-5xl mx-auto">
            <div className="p-6">
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
            </div>
          </div>
        </div>
      </Card>
      {showPDFPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-11/12 h-5/6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">PDF Preview</h2>
              <Button onClick={() => setShowPDFPreview(false)}>Close</Button>
            </div>
            <PDFViewer width="100%" height="90%">
              <PdfFormat 
                project={{
                  ...project,
                  useCaseDiagram,
                  entityRelationDiagram,
                  documentation,
                  title: projectTitle,
                  overview: projectOverview,
                  functionalRequirements,
                  nonFunctionalRequirements,
                }}
                studentName={currentUser.name} 
                studentId={currentUser.studentId} 
              />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;


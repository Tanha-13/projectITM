import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import PropTypes from "prop-types";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function ProjectModal({ formDetails, onClose,onUpdate }) {
    const [editingProject,setEditingProject] = useState({...formDetails});
    const [isEdited,setIsEdited] = useState(false);
    console.log(editingProject);

    useEffect(() => {
        setEditingProject({...formDetails});
        setIsEdited(false);
      }, [formDetails]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProject(prev => ({ ...prev, [name]: value }));
        setIsEdited(true);
      };
    
      const handleSave = () => {
        if (isEdited) {
          onUpdate(editingProject);
        }
        onClose();
      };
    
      const handleCancel = () => {
        if (isEdited) {
          // You could add a confirmation dialog here
          if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
            onClose();
          }
        } else {
          onClose();
        }
      };
    
    //   const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditingProject(prev => ({ ...prev, [name]: value }));
    //   };

  return (
    <>
      <div>
        <Label htmlFor="name">Project Title</Label>
        <Input
          id="name"
          name="name"
          value={formDetails.title}
            onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          name="description"
          value={editingProject.description}
          onChange ={handleChange}
          
        />
      </div>
      <div className="flex justify-between w-full space-x-2 mt-10">
        <Button className="w-1/2" variant="" onClick={handleSave}>
          Save changes
        </Button>
        <Button className="w-1/2" variant="destructive" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default ProjectModal;

ProjectModal.propTypes = {
  formDetails: PropTypes.object,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
};

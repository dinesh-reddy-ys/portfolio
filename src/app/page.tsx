"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/sections/ProfileSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { EditModeDialog } from "@/components/sections/EditModeDialog";
import { Edit, Upload, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload, handleResumeUpload, checkPasswordAndEnableEdit, triggerImageUpload, handleDownloadResume, triggerResumeUpload } from "@/lib/page-utils";
import { app } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export const profileData = {
  name: "John Doe",
  title: "Automation Engineer",
  about:
    "A passionate automation engineer dedicated to creating efficient and reliable systems. I specialize in streamlining processes and enhancing productivity through innovative solutions.",
  github: "https://github.com/johndoe",
  resume: "/resume.pdf", // Path to your resume file in the public directory
  profileImage: "https://picsum.photos/200/200", // Placeholder image
};

export const skillsData = [
  "Selenium",
  "Python",
  "Jenkins",
  "Docker",
  "CI/CD",
  // Add more skills as needed
];

type Project = {
  title: string;
  description: string;
};
export const projectData: Project[] = [
  {
    title: "Automated Testing Framework",
    description: 
      "Developed a comprehensive testing framework using Selenium and Python, reducing testing time by 40%.",
  },
  {
    title: "CI/CD Pipeline Implementation",
    description: 
      "Implemented a CI/CD pipeline with Jenkins and Docker, enabling faster and more reliable software releases.",
  },
  
];


export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState<typeof profileData>(profileData);
  const [tempSkills, setTempSkills] = useState<string[]>(skillsData);
  const [tempProjects, setTempProjects] = useState<Project[]>(projectData);
  const [open, setOpen] = useState(false); // For the AlertDialog




  const handleAddSkill = () => {
    setTempSkills((prev) => [...prev, ""]);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...tempSkills];
    updatedSkills.splice(index, 1);
    setTempSkills(updatedSkills);
  };

  const handleSkillChange = (index: number, e: any) => {
    const { value } = e.target;
    const updatedSkills = [...tempSkills];
    updatedSkills[index] = value;
    setTempSkills(updatedSkills);
  };

  const handleProjectChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === 'title' || name === 'description') {
          const updatedProjects = [...tempProjects];
          updatedProjects[index][name] = value;
          setTempProjects(updatedProjects);
      }
  };

  const handleAddProject = () => {
    setTempProjects((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...tempProjects];
    updatedProjects.splice(index, 1);
    setTempProjects(updatedProjects);
  };

  const handleEditClick = () => {
    setOpen(true); // Open the AlertDialog
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Changes Saved!"); 
  };






  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <EditModeDialog isEditing={isEditing} setIsEditing={setIsEditing} />
          {isEditing && (
          <Button
            onClick={handleSave}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </Button>
        )} 
      </div>
       <ProfileSection initialProfile={profileData} isEditing={isEditing} onProfileChange={(e) => {
        const { name, value } = e.target;
        setTempProfile((prev) => ({ ...prev, [name]: value }));
      }} />
       <SkillsSection isEditing={isEditing} tempSkills={tempSkills} setTempSkills={setTempSkills} handleSkillChange={handleSkillChange} handleAddSkill={handleAddSkill} handleRemoveSkill={handleRemoveSkill} />
        <ProjectsSection isEditing={isEditing} tempProjects={tempProjects} setTempProjects={setTempProjects} handleProjectChange={handleProjectChange} handleAddProject={handleAddProject} handleRemoveProject={handleRemoveProject} />
        <ResumeSection isEditing={isEditing} tempProfile={tempProfile} setTempProfile={setTempProfile} />
    </div>
  );
}



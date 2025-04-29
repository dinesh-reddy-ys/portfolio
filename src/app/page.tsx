"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileSection } from "@/components/sections/ProfileSection";
import SkillsSection from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { EditModeDialog } from "@/components/sections/EditModeDialog";

import { handleAddSkill, handleRemoveSkill, handleSkillChange, 
  handleProjectChange, handleAddProject, handleRemoveProject,
  handleSave} from "@/lib/page-utils";



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

  const handleAddSkillFn = () => {
    handleAddSkill(tempSkills, setTempSkills);
  };
  const handleRemoveSkillFn = (index: number) => {
    handleRemoveSkill(index, tempSkills, setTempSkills);
  };

  const handleSkillChangeFn = (index: number, e: any) => {
    handleSkillChange(index, e, tempSkills, setTempSkills);
  };

  const handleProjectChangeFn = (index: number, e: any) => {
    handleProjectChange(index, e, tempProjects, setTempProjects);
  };
  const handleAddProjectFn = () => {
    handleAddProject(tempProjects, setTempProjects);
  };
  const handleRemoveProjectFn = (index: number) => {
    handleRemoveProject(index, tempProjects, setTempProjects);
  };
  
    const onSave = () => {
        handleSave(setIsEditing);
      };
  




  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <EditModeDialog isEditing={isEditing} setIsEditing={setIsEditing} />
          {isEditing && (
          <Button
            onClick={onSave}
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
       <SkillsSection isEditing={isEditing} tempSkills={tempSkills} setTempSkills={setTempSkills} handleSkillChange={handleSkillChangeFn} handleAddSkill={handleAddSkillFn} handleRemoveSkill={handleRemoveSkillFn} />
        <ProjectsSection isEditing={isEditing} tempProjects={tempProjects} setTempProjects={setTempProjects} handleProjectChange={handleProjectChangeFn} handleAddProject={handleAddProjectFn} handleRemoveProject={handleRemoveProjectFn} />
        <ResumeSection isEditing={isEditing} tempProfile={tempProfile} setTempProfile={setTempProfile} />
    </div>
  );
}



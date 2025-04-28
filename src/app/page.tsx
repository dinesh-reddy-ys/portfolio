"use client";

import { Github, Hash, Edit, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const profileData = {
  name: "John Doe",
  title: "Automation Engineer",
  about:
    "A passionate automation engineer dedicated to creating efficient and reliable systems. I specialize in streamlining processes and enhancing productivity through innovative solutions.",
  github: "https://github.com/johndoe",
  hashnode: "https://hashnode.com/@johndoe",
  resume: "/resume.pdf", // Path to your resume file in the public directory
  profileImage: "https://picsum.photos/200/200", // Placeholder image
};

const projectData = [
  {
    title: "Automated Testing Framework",
    description:
      "Developed a comprehensive testing framework using Selenium and Python, reducing testing time by 40%.",
    github: "https://github.com/johndoe/testing-framework",
    hashnode: null,
  },
  {
    title: "CI/CD Pipeline Implementation",
    description:
      "Implemented a CI/CD pipeline with Jenkins and Docker, enabling faster and more reliable software releases.",
    github: null,
    hashnode: "https://hashnode.com/post/cicd-pipeline-example",
  },
  // Add more projects as needed
];

export default function Home() {
  const [profile, setProfile] = useState(profileData);
  const [projects, setProjects] = useState(projectData);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false); // State for the AlertDialog
  const [password, setPassword] = useState(""); // State for the password input

  // State for temporary profile and project changes
  const [tempProfile, setTempProfile] = useState(profileData);
  const [tempProjects, setTempProjects] = useState(projectData);

  // Ref for the image input
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Ref for the resume input
  const resumeInputRef = useRef<HTMLInputElement>(null);


  const handleProfileChange = (e: any) => {
    const { name, value } = e.target;
    setTempProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const updatedProjects = [...tempProjects];
    updatedProjects[index][name] = value;
    setTempProjects(updatedProjects);
  };

  const handleEditClick = () => {
    setOpen(true); // Open the AlertDialog
  };

  const handleSave = () => {
    // Apply temporary changes to the original state
    setProfile(tempProfile);
    setProjects(tempProjects);
    setIsEditing(false);
    alert("Changes Saved!"); // Simple feedback
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile((prev) => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    imageInputRef.current?.click();
  };

  const handleResumeUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload the file to a server
      // and store the path to the resume.
      // For this example, we'll just store the file name.
      setTempProfile((prev) => ({ ...prev, resume: file.name }));
    }
  };

  const triggerResumeUpload = () => {
    resumeInputRef.current?.click();
  };

  const checkPasswordAndEnableEdit = () => {
    if (password === "1129") {
      setIsEditing(true);
      setOpen(false); // Close the AlertDialog
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleEditClick}
                className="bg-accent text-white py-2 px-4 rounded hover:bg-teal-700"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Enter Password</AlertDialogTitle>
                <AlertDialogDescription>
                  Enter the correct password to enable edit mode.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => {
                  setOpen(false);
                  setPassword('');
                }}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={checkPasswordAndEnableEdit}>
                  Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button
            onClick={handleSave}
            className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </Button>
        )}
      </div>
      {/* Profile Section */}
      <section className="fade-in mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={tempProfile.profileImage}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          {isEditing && (
            <>
              <Button
                onClick={triggerImageUpload}
                variant="secondary"
                size="icon"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={imageInputRef}
              />
            </>
          )}
          <div>
            {isEditing ? (
              <Input
                type="text"
                name="name"
                value={tempProfile.name}
                onChange={handleProfileChange}
                className="text-2xl font-bold w-full"
              />
            ) : (
              <div className="text-2xl font-bold">{profile.name}</div>
            )}
            {isEditing ? (
              <Input
                type="text"
                name="title"
                value={tempProfile.title}
                onChange={handleProfileChange}
                className="text-gray-600 w-full"
              />
            ) : (
              <div className="text-gray-600">{profile.title}</div>
            )}
          </div>
        </div>
        {isEditing ? (
          <Input
            type="text"
            name="about"
            value={tempProfile.about}
            onChange={handleProfileChange}
            className="mt-4 w-full"
          />
        ) : (
          <p className="mt-4">{profile.about}</p>
        )}
        <div className="mt-4 flex items-center gap-4">
          <Link
            href={tempProfile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline flex items-center gap-1"
          >
            <Github className="h-5 w-5" />
            GitHub
          </Link>
          <Link
            href={tempProfile.hashnode}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline flex items-center gap-1"
          >
            <Hash className="h-5 w-5" />
            Hashnode
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="fade-in mb-8">
        <h2 className="text-xl font-bold mb-4">Projects</h2>
        {tempProjects.map((project, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md">
            {isEditing ? (
              <Input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, e)}
                className="font-semibold w-full"
              />
            ) : (
              <div className="font-semibold">{project.title}</div>
            )}
            {isEditing ? (
              <Input
                type="text"
                name="description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, e)}
                className="text-gray-700 w-full"
              />
            ) : (
              <div className="text-gray-700">{project.description}</div>
            )}
            <div className="mt-2 flex items-center gap-4">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center gap-1"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Link>
              )}
              {project.hashnode && (
                <Link
                  href={project.hashnode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline flex items-center gap-1"
                >
                  <Hash className="h-4 w-4" />
                  Hashnode
                </Link>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Resume Section */}
      <section className="fade-in">
        <h2 className="text-xl font-bold mb-4">Resume</h2>
        {isEditing && (
          <>
            <Button
              onClick={triggerResumeUpload}
              variant="secondary"
              size="icon"
              className="mb-2"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="hidden"
              ref={resumeInputRef}
            />
          </>
        )}
        <Link
          href={tempProfile.resume}
          download
          className="bg-accent text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Download Resume
        </Link>
      </section>
    </div>
  );
}


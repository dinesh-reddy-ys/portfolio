"use client";

import { Github, Hash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const profile = {
  name: "John Doe",
  title: "Automation Engineer",
  about:
    "A passionate automation engineer dedicated to creating efficient and reliable systems. I specialize in streamlining processes and enhancing productivity through innovative solutions.",
  github: "https://github.com/johndoe",
  hashnode: "https://hashnode.com/@johndoe",
  resume: "/resume.pdf", // Path to your resume file in the public directory
  profileImage: "https://picsum.photos/200/200", // Placeholder image
};

const projects = [
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
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Section */}
      <section className="fade-in mb-8">
        <div className="flex items-center gap-4">
          <Image
            src={profile.profileImage}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <p className="text-gray-600">{profile.title}</p>
          </div>
        </div>
        <p className="mt-4">{profile.about}</p>
        <div className="mt-4 flex items-center gap-4">
          <Link
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline flex items-center gap-1"
          >
            <Github className="h-5 w-5" />
            GitHub
          </Link>
          <Link
            href={profile.hashnode}
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
        {projects.map((project, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md">
            <h3 className="font-semibold">{project.title}</h3>
            <p className="text-gray-700">{project.description}</p>
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
        <Link
          href={profile.resume}
          download
          className="bg-accent text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Download Resume
        </Link>
      </section>
    </div>
  );
}

import { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

type Project = {
  title: string;
  description: string;
};

interface ProjectsSectionProps {
  isEditing: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isEditing }) => {
  const [tempProjects, setTempProjects] = useState<Project[]>([
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
  ]);

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

  return (
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
            <Textarea
              name="description"
              value={project.description}
              onChange={(e) => handleProjectChange(index, e)}
              className="text-gray-700 w-full"
            />
          ) : (
            <div className="text-gray-700">{project.description}</div>
          )}
          {isEditing && (
            <Button
              onClick={() => handleRemoveProject(index)}
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {isEditing && (
        <Button onClick={handleAddProject} variant="secondary">
          Add Project
        </Button>
      )}
    </section>
  );
};
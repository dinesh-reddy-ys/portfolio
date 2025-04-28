import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

type SkillsSectionProps = {
  isEditing: boolean;
};

const SkillsSection = ({ isEditing }: SkillsSectionProps) => {
  const [tempSkills, setTempSkills] = useState<string[]>([
    "Selenium",
    "Python",
    "Jenkins",
    "Docker",
    "CI/CD",
  ]);

  const handleSkillChange = (index: number, e: any) => {
    const { value } = e.target;
    const updatedSkills = [...tempSkills];
    updatedSkills[index] = value;
    setTempSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setTempSkills((prev) => [...prev, ""]);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...tempSkills];
    updatedSkills.splice(index, 1);
    setTempSkills(updatedSkills);
  };

  return (
    <section className="fade-in mb-8">
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {tempSkills.map((skill, index) => (
          <div key={index} className="flex items-center">
            {isEditing ? (
              <Input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e)}
                className="mr-2 w-32"
              />
            ) : (
              <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                {skill}
              </div>
            )}
            {isEditing && (
              <Button
                onClick={() => handleRemoveSkill(index)}
                variant="outline"
                size="icon"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        {isEditing && (
          <Button onClick={handleAddSkill} variant="secondary">
            Add Skill
          </Button>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
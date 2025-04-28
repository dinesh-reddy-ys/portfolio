import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

interface SkillsSectionProps {
  isEditing: boolean;
  tempSkills: string[];
  setTempSkills: Dispatch<SetStateAction<string[]>>;
  handleSkillChange: (index: number, e: any) => void;
  handleAddSkill: () => void;
  handleRemoveSkill: (index: number) => void;
}

const SkillsSection = ({ isEditing, tempSkills, setTempSkills, handleSkillChange, handleAddSkill, handleRemoveSkill }: SkillsSectionProps) => {


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
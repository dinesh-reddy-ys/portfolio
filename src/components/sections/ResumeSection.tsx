import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import { useState, useRef } from "react";
import { handleResumeUpload, triggerResumeUpload } from "@/lib/page-utils";
import { app } from "@/lib/firebase";

interface Profile {
  name: string;
  title: string;
  about: string;
  github: string;
  resume: string;
  profileImage: string;
}

interface ResumeSectionProps {
  isEditing: boolean;
  tempProfile: Profile;
  setTempProfile: (profile: Profile) => void;
}

export function ResumeSection({ isEditing, tempProfile, setTempProfile }: ResumeSectionProps) {
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  return (
    <section className="fade-in">
      <h2 className="text-xl font-bold mb-4">Resume</h2>
      {isEditing && (
        <>
          <Button
            onClick={() => triggerResumeUpload(resumeInputRef.current)}
            variant="secondary"
            size="icon"
            className="mb-2"
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => handleResumeUpload(e, app, setUploadedFileName, setUploadProgress, setTempProfile)}
            className="hidden"
            ref={resumeInputRef}
          />
          {/* Display upload progress */}
          {uploadProgress !== null && (
            <Progress value={uploadProgress} className="mb-2" />
          )}

          {/* Display uploaded filename */}
          {uploadedFileName && (
            <p className="text-sm text-muted-foreground">
              Uploaded: {uploadedFileName}
            </p>
          )}
        </>
      )}
      <Button
        onClick={() => {
          if (tempProfile.resume) {
            const link = document.createElement("a");
            link.href = tempProfile.resume;
            link.download = "resume.pdf";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
          }
        }}
        className="bg-accent text-white py-2 px-4 rounded hover:bg-teal-700"
      >
        Download Resume
      </Button>
    </section>
  );
}
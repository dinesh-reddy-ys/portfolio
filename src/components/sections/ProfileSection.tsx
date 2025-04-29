"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleImageUpload, triggerImageUpload } from "@/lib/page-utils";

interface Profile {
  name: string;
  title: string;
  about: string;
  github: string;
  resume: string;
  profileImage: string;
}

interface ProfileSectionProps {
  initialProfile: Profile;
  isEditing: boolean;
  onProfileChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function ProfileSection({ initialProfile, isEditing, onProfileChange }: ProfileSectionProps) {
  const [tempProfile, setTempProfile] = useState<Profile>(initialProfile);
  // Ref for the image input
  const imageInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="fade-in mb-8">
      <div className="flex items-center gap-4">
        <Image
          src={tempProfile.profileImage}
          alt="Profile"
          width={100}
          height={100}
          priority
          className="rounded-full"
        />
        <div className="flex items-center gap-4">
          {isEditing && (
            <>
              <Button
                onClick={() => triggerImageUpload(imageInputRef)}
                variant="secondary"
                size="icon"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </>
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setTempProfile)}
            className="hidden"
            ref={imageInputRef}
          />
        </div>


        <div>
          {isEditing ? (
            <Input
              type="text"
              name="name"
              value={tempProfile.name}
              onChange={onProfileChange}
              className="text-2xl font-bold w-full"
            />
          ) : (
            <div className="text-2xl font-bold">{tempProfile.name}</div>
          )}
          {isEditing ? (
            <Input
              type="text"
              name="title"
              value={tempProfile.title}
              onChange={onProfileChange}
              className="text-gray-600 w-full"
            />
          ) : (
            <div className="text-gray-600">{tempProfile.title}</div>
          )}
        </div>
      </div>
      {isEditing ? (
        <Textarea
          name="about"
          value={tempProfile.about}
          onChange={onProfileChange}
          className="mt-4 w-full"
        />
      ) : (
        <p className="mt-4">{tempProfile.about}</p>
      )}
    </section>
  );
}

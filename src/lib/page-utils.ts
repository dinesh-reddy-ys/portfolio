import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";import { ChangeEvent, useState } from "react";

/**
 * Represents the structure of a project with a title and description.
 */
type Project = {
  title: string;
  description: string;
};


/**
 * Represents the structure of a profile with basic information.
 */

/**
 * Checks if the provided password is correct, and if so, enables edit mode.
 * @param password - The password to check.
 * @param setIsEditing - The state setter to enable/disable edit mode.
 * @param setOpen - The state setter to open/close the password dialog.
 */
const checkPasswordAndEnableEdit = (password: string, setIsEditing: any, setOpen: any) => {
  // Checks if the password is correct
  if (password === "1129") {
    setIsEditing(true);
    setOpen(false);
  } else {
    alert("Incorrect password");
  }
};

/**
 * Handles the upload of a profile image.
 * @param e - The event object from the file input change.
 * @param setTempProfile - The state setter to update the temporary profile data.
 */
const handleImageUpload = async (e: any, setTempProfile: any) => {
  // Get the file from the event
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setTempProfile((prev: any) => ({
      ...prev,
      profileImage: reader.result,
    }));
  };
  //If there is a file, load it
  if (file) {
    reader.readAsDataURL(file);
  }
};

/**
 * Handles the upload of a resume file to Firebase Storage.
 * @param e - The event object from the file input change.
 * @param app - The Firebase app instance.
 * @param setUploadedFileName - The state setter to update the name of the uploaded file.
 * @param setUploadProgress - The state setter to update the upload progress.
 * @param setTempProfile - The state setter to update the temporary profile data.
 * This function uploads the selected resume file to Firebase Storage, updates
 * the UI with upload progress, and handles the success or failure of the upload.
 */
const handleResumeUpload = async (
  e: any,
  app: any,
  setUploadedFileName: any,
  setUploadProgress: any,
  setTempProfile: any
) => {
  const file = e.target.files[0];
  // Early exit if there is no file
  if (!file) return; // Exit if no file is selected

  // Update the uploaded file name in the state
  setUploadedFileName(file.name);

  setUploadProgress(0);

  // Update the tempProfile with a placeholder value
  setTempProfile((prev: any) => ({
    ...prev,
    resume: "/uploading.pdf",
  }));

  const storage = getStorage(app);
  const storageRef = ref(storage, `/resumes/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setUploadProgress(progress);
    },
    (error) => {
      console.error("Error uploading resume: ", error);
      alert("Error uploading resume. Please try again.");
      setUploadProgress(null); // Reset progress bar
      setUploadedFileName(null);
      setTempProfile((prev: any) => ({ ...prev, resume: '' }));
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setTempProfile((prev: any) => ({ ...prev, resume: downloadURL }));
        setUploadProgress(null); // Reset progress bar
        setUploadedFileName(file.name);
        alert("Resume uploaded successfully!");
      });
    }
  );
};  

/**
 * Triggers the file input for image upload.
 * @param imageInputRef - A ref to the image input element.
 * This function is used to programmatically trigger a click on the hidden
 * file input, allowing users to upload an image by clicking a styled button.
 */
const triggerImageUpload = (imageInputRef: any) => {
  // Check if ref is valid
  if (!imageInputRef.current) return;
  // Call the click function on the input
  imageInputRef.current.click();
};

/**
 * Triggers the file input for resume upload.
 * @param resumeInputRef - A ref to the resume input element.
 * This function is used to programmatically trigger a click on the hidden
 * file input, allowing users to upload a resume by clicking a styled button.
 */
const triggerResumeUpload = (resumeInputRef: any) => {
  // Calls click function on the input
  resumeInputRef?.click();
};

/**
 * Handles the change event for project fields (title or description).
 * @param index - The index of the project in the array.
 * @param e - The change event object.
 * @param tempProjects - The current array of projects.
 * @param setTempProjects - The state setter to update the projects array.
 */
const handleProjectChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,tempProjects: Project[],setTempProjects: (arg0: any) => void) => {
  const { name, value } = e.target;
  if (name === 'title' || name === 'description') {
      const updatedProjects = [...tempProjects];
      updatedProjects[index][name] = value;
      setTempProjects(updatedProjects);
  }
};

/**
 * Adds a new empty project to the projects array.
 * @param tempProjects - The current array of projects.
 * @param setTempProjects - The state setter to update the projects array.
 */
const handleAddProject = (tempProjects:Project[], setTempProjects: (arg0: any) => void) => {
  setTempProjects((prev:any) => [...prev, { title: "", description: "" }]);
};

/**
 * Removes a project at the specified index from the projects array.
 * @param index - The index of the project to remove.
 * @param tempProjects - The current array of projects.
 * @param setTempProjects - The state setter to update the projects array.
 */
const handleRemoveProject = (index: number,tempProjects: Project[],setTempProjects: (arg0: any) => void) => {
  const updatedProjects = [...tempProjects];
  updatedProjects.splice(index, 1);
  setTempProjects(updatedProjects);
};

/**
 * Handles the change event for skill fields.
 * @param index - The index of the skill in the array.
 * @param e - The change event object.
 * @param tempSkills - The current array of skills.
 * @param setTempSkills - The state setter to update the skills array.
 */
const handleSkillChange = (index: number, e: any, tempSkills: string[], setTempSkills: (arg0: any) => void) => {
  const { value } = e.target;
  const updatedSkills = [...tempSkills];
  updatedSkills[index] = value;
  setTempSkills(updatedSkills);
};

/**
 * Adds a new empty skill to the skills array.
 * @param tempSkills - The current array of skills.
 * @param setTempSkills - The state setter to update the skills array.
 */
const handleAddSkill = (tempSkills:string[], setTempSkills:(arg0: any) => void) => {
  setTempSkills((prev:any) => [...prev, ""]);
};
/**
 * Removes a skill at the specified index from the skills array.
 * @param index - The index of the skill to remove.
 * @param tempSkills - The current array of skills.
 * @param setTempSkills - The state setter to update the skills array.
 */
const handleRemoveSkill = (index: number,tempSkills:string[],setTempSkills:(arg0: any) => void) => {
  const updatedSkills = [...tempSkills];
    updatedSkills.splice(index, 1);
    setTempSkills(updatedSkills);
};


const handleEditClick = (setOpen:any) => {
  setOpen(true); // Open the AlertDialog
};

const handleSave = (setIsEditing:any) => {
  setIsEditing(false);
  alert("Changes Saved!"); 
};

const handleDownloadResume = () => { };

export {
  checkPasswordAndEnableEdit,
  handleImageUpload,
  handleResumeUpload,
  triggerImageUpload,
  triggerResumeUpload,
  handleSkillChange,
  handleAddSkill,
  handleRemoveSkill,
  handleProjectChange,
  handleAddProject,
  handleRemoveProject,
  handleEditClick,
  handleSave,
  handleDownloadResume,
};

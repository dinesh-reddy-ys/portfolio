import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const checkPasswordAndEnableEdit = (password: string, setIsEditing: any, setOpen: any) => {
  if (password === "1129") {
    setIsEditing(true);
    setOpen(false);
  } else {
    alert("Incorrect password");
  }
};

const handleImageUpload = async (e: any, setTempProfile: any) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    setTempProfile((prev: any) => ({
      ...prev,
      profileImage: reader.result,
    }));
  };
  if (file) {
    reader.readAsDataURL(file);
  }
};

const handleResumeUpload = async (
  e: any,
  app: any,
  setUploadedFileName: any,
  setUploadProgress: any,
  setTempProfile: any
) => {
  const file = e.target.files[0];
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

const triggerImageUpload = (imageInputRef: any) => {
  imageInputRef?.click();
};

const triggerResumeUpload = (resumeInputRef: any) => {
  resumeInputRef?.click();
};

const handleDownloadResume = () => {};

export {
  checkPasswordAndEnableEdit,
  handleImageUpload,
  handleResumeUpload,
  triggerImageUpload,
  triggerResumeUpload,
  handleDownloadResume,
};

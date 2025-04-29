"use client";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkPasswordAndEnableEdit } from "@/lib/page-utils";
import { Edit } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";

interface EditModeDialogProps {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const EditModeDialog: React.FC<EditModeDialogProps> = ({ isEditing, setIsEditing }) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <>
      {!isEditing ? (
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setPassword("");
                setOpen(true);
              }}
              className="bg-accent text-white py-2 px-4 rounded hover:bg-teal-700"
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setOpen(false);
                  setPassword("");
                }}
              >
                Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(event) => {
                    event.preventDefault();
                  checkPasswordAndEnableEdit(password, setIsEditing, setOpen);
              }}>
                Submit
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
};
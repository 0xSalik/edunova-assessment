import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "../ui/LoadingSpinner";

interface ImageUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
}

export function ImageUploadDialog({
  isOpen,
  onClose,
  onSave,
}: ImageUploadDialogProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handlePreview = () => {
    setIsLoading(true);
    // Simulate image loading
    setTimeout(() => {
      setIsPreviewVisible(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleSave = () => {
    onSave(imageUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button onClick={handlePreview} disabled={!imageUrl}>
            Preview
          </Button>
          {isLoading && <LoadingSpinner />}
          {isPreviewVisible && (
            <Avatar className="flex justify-center items-center">
              <AvatarFallback>IM</AvatarFallback>
              <AvatarImage src={imageUrl} alt="Preview" />
            </Avatar>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isPreviewVisible}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

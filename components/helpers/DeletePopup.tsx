import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TrashIcon } from "../ui/icons";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import LoadingSpinner from "../ui/LoadingSpinner";
export default function DeletePopup({ user, onDelete }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await onDelete(user.id);
      toast({
        title: "✅ Success",
        description: "Member deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete member. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This user&apos;s account will be deleted permanently. This action
            cannot be undone. Proceed with caution.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? <LoadingSpinner /> : "Yes, Delete Account"}
        </Button>
        <DialogClose asChild>
          <Button variant="outline" disabled={isDeleting}>
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

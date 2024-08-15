import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoadingSpinner from "../ui/LoadingSpinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FilePenIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const roleOptions = [
  { value: "sales_representative", label: "Sales Representative" },
  { value: "software_engineer", label: "Software Engineer" },
  { value: "product_manager", label: "Product Manager" },
  { value: "data_scientist", label: "Data Scientist" },
  { value: "marketing_manager", label: "Marketing Manager" },
  { value: "operations_manager", label: "Operations Manager" },
  { value: "ux_designer", label: "UX Designer" },
  { value: "hr_specialist", label: "HR Specialist" },
  { value: "financial_analyst", label: "Financial Analyst" },
  { value: "legal_advisor", label: "Legal Advisor" },
  { value: "frontend_developer", label: "Frontend Developer" },
  { value: "backend_developer", label: "Backend Developer" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const teamOptions = [
  "Design",
  "Product",
  "Marketing",
  "Finance",
  "Engineering",
  "Sales",
];

const genderOptions = ["Male", "Female", "Other"];

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  email: z.string().email(),
  workEmail: z.string().email(),
  role: z.string(),
  status: z.string(),
  avatar: z.string(),
  teams: z.array(z.string()),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  gender: z.string(),
  nationality: z.string(),
  contactNo: z.string(),
  publications: z.array(
    z.object({
      title: z.string(),
      journal: z.string(),
      year: z.number(),
      abstract: z.string(),
    })
  ),
});
import { ImageUploadDialog } from "./ImageUploadDialog";

export default function Edit({ user, onEdit }: any) {
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      workEmail: user.workEmail,
      avatar: user.avatar,
      role: roleOptions.find((option) => option.label === user.role)?.value,
      status: statusOptions.find((option) => option.label === user.status)
        ?.value,
      teams: user.teams,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      nationality: user.nationality,
      contactNo: user.contactNo,
      publications: user.publications,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      values.role =
        roleOptions.find((role) => role.value === values.role)?.label || "";
      values.status =
        statusOptions.find((status) => status.value === values.status)?.label ||
        "";
      await onEdit({ ...values, id: user.id });
      toast({
        title: "✅ Success",
        description: "Member updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update member. Please try again.",
      });
    } finally {
      setIsOpen(false);
      setIsSubmitting(false);
    }
  }
  const handleChangePhoto = (imageUrl: string) => {
    form.setValue("avatar", imageUrl);
  };

  const handleRemovePhoto = () => {
    form.setValue("avatar", "");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <FilePenIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      {isOpen ? (
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center my-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt="Profile" />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex justify-center space-x-2 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsImageDialogOpen(true)}
            >
              Change Photo
            </Button>
            <Button variant="outline" size="sm" onClick={handleRemovePhoto}>
              Remove Photo
            </Button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Work Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleOptions.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="Nationality" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="teams"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teams</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {teamOptions.map((team) => (
                        <Badge
                          key={team}
                          variant={
                            field.value.includes(team) ? "default" : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => {
                            const updatedTeams = field.value.includes(team)
                              ? field.value.filter((t) => t !== team)
                              : [...field.value, team];
                            field.onChange(updatedTeams);
                          }}
                        >
                          {team}
                        </Badge>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormLabel>Publications</FormLabel>
                {form.watch("publications").map((_, index) => (
                  <div key={index} className="space-y-2 mb-4">
                    <FormField
                      name={`publications.${index}.title`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Publication Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`publications.${index}.journal`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Journal</FormLabel>
                          <FormControl>
                            <Input placeholder="Journal Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`publications.${index}.year`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name={`publications.${index}.abstract`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Abstract</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Publication Abstract"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const publications = form.getValues("publications");
                    form.setValue("publications", [
                      ...publications,
                      {
                        title: "",
                        journal: "",
                        year: new Date().getFullYear(),
                        abstract: "",
                      },
                    ]);
                  }}
                >
                  Add Publication
                </Button>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <LoadingSpinner /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      ) : (
        ""
      )}
      <ImageUploadDialog
        isOpen={isImageDialogOpen}
        onClose={() => setIsImageDialogOpen(false)}
        onSave={handleChangePhoto}
      />
    </Dialog>
  );
}

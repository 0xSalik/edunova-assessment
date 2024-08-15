import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoadingSpinner from "../ui/LoadingSpinner";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ImageUploadDialog } from "./ImageUploadDialog";
import { PlusIcon } from "../ui/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  workEmail: z.string().email("Invalid work email address"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  avatar: z.string().optional(),
  teams: z.array(z.string()).nonempty("At least one team must be selected"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  gender: z.string().min(1, "Gender is required"),
  nationality: z.string().min(1, "Nationality is required"),
  contactNo: z.string().min(1, "Contact number is required"),
  publications: z.array(
    z.object({
      title: z.string().min(1, "Title is required"),
      journal: z.string().min(1, "Journal is required"),
      year: z.number().int().min(1900).max(new Date().getFullYear()),
      abstract: z.string().min(1, "Abstract is required"),
    })
  ),
});

const teamOptions = [
  "Design",
  "Product",
  "Marketing",
  "Finance",
  "Engineering",
  "Sales",
];
const statusOptions = ["Active", "Inactive"];
const genderOptions = ["Male", "Female", "Other"];

export default function AddMember({ onAddMember }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [av, setAv] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      workEmail: "",
      role: "",
      avatar: "",
      status: "",
      teams: [] as any,
      dateOfBirth: "",
      gender: "",
      nationality: "",
      contactNo: "",
      publications: [
        {
          title: "",
          journal: "",
          year: new Date().getFullYear(),
          abstract: "",
        },
      ],
    },
  });
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const handleAddPhoto = (imageUrl: string) => {
    form.setValue("avatar", imageUrl);
    setAv(imageUrl);
  };

  const handleRemovePhoto = () => {
    form.setValue("avatar", "");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsOpen(true);
    setIsSubmitting(true);
    try {
      if (values.role) {
        const roleName =
          roleOptions.find((role) => role.value === values.role)?.label || "";
        if (roleName) values.role = roleName;
      }
      await onAddMember(values);
      toast({
        title: "✅ Success",
        description: "Member added successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add member. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      setIsOpen(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="bg-primary text-primary-foreground flex-grow md:flex-grow-0"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          ADD MEMBER
        </Button>
      </DialogTrigger>
      {isOpen ? (
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add a new member</DialogTitle>
            <DialogDescription>
              Enter the details of the member you want to add.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={av} alt="Member photo" />
                  <AvatarFallback>MP</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex justify-center space-x-2 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsImageDialogOpen(true)}
                >
                  Add Photo
                </Button>
                {form.watch("avatar") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemovePhoto}
                  >
                    Remove Photo
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Member Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="username"
                  control={form.control}
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
                  name="email"
                  control={form.control}
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
                  name="workEmail"
                  control={form.control}
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
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="dateOfBirth"
                  control={form.control}
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
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((gender) => (
                              <SelectItem key={gender} value={gender}>
                                {gender}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="nationality"
                  control={form.control}
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
                  name="contactNo"
                  control={form.control}
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
                name="teams"
                control={form.control}
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
                              ? field.value.filter((t: string) => t !== team)
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
                  <Button variant="outline" disabled={isSubmitting}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <LoadingSpinner /> : "Save"}
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
        onSave={handleAddPhoto}
      />
    </Dialog>
  );
}

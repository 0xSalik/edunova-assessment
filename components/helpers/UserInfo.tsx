import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "../ui/use-toast";

export default function UserInfo({ user }: any) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://i.pravatar.cc/300?img=10" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Jane Doe</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2 items-center">
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://i.pravatar.cc/600" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="flex gap-2">
            <p className="font-semibold">Name: </p> Jane Doe
          </p>
          <p className="flex gap-2">
            <p className="font-semibold">Username: </p> @jane
          </p>
          <p className="flex gap-2">
            <p className="font-semibold">E-mail: </p> jane@piedpiper.com
          </p>
          <p className="flex gap-2">
            <p className="font-semibold">Role: </p> Admin
          </p>
          <Button
            variant={"destructive"}
            onClick={() => {
              toast({
                title: "🎈 Hah! Gotcha.",
                description:
                  "Can't sign out of the app. You're stuck as Jane Doe forever 😁",
                variant: "default",
              });
            }}
            className="w-15 h-7 mt-2 text-sm"
          >
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

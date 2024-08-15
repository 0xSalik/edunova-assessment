import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MemberInfoProps {
  user: {
    name: string;
    username: string;
    role: string;
    avatar: string;
  };
}

const MemberCard: React.FC<MemberInfoProps> = ({ user }: any) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="w-full flex text-left justify-start">
          <Avatar className="h-9 w-9 mr-2">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.username}</div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "max-w-[400px] sm:max-w-[300px] lg:max-w-[500px] xl:max-w-[600px]"
        )}
      >
        <SheetHeader className="bg-primary text-primary-foreground p-6 -mx-6 -mt-6 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-4 border-primary-foreground">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="text-2xl font-bold text-primary-foreground">
                {user.name}
              </SheetTitle>
              <div className="text-primary-foreground/80">
                {user.username} | {user.role}
              </div>
              <div className="text-primary-foreground/80">
                User ID: {user.id}
              </div>
            </div>
          </div>
        </SheetHeader>
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Date of Birth" value={user.dateOfBirth} />
              <InfoItem label="Gender" value={user.gender} />
              <InfoItem label="Nationality" value={user.nationality} />
              <InfoItem label="Contact no." value={user.contactNo} />
              <InfoItem label="E-mail Address" value={user.email} />
              <InfoItem label="Work email Address" value={user.workEmail} />
            </div>
          </section>
          <section>
            <h3 className="text-lg font-semibold mb-2">
              Research & Publication
            </h3>
            <div className="space-y-4">
              {user.publications.map((pub: any, index: any) => (
                <div key={index}>
                  <h4 className="font-medium">{pub.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    Published in {pub.journal} • {pub.year}
                  </p>
                  <p className="text-sm">{pub.abstract}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    <div className="break-words">{value}</div>
  </div>
);
export default MemberCard;

"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUser, UserPlus, Briefcase } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const AddProfile = () => {
  const [show, setShow] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <Popover open={profileOpen} className="cursor-pointer">
      <PopoverTrigger onClick={() => setProfileOpen(!profileOpen)}>
        <CircleUser className="mr-2" size={35} />
      </PopoverTrigger>
      <PopoverContent className="p-0 cursor-pointer">
        <div className="border border-input border-slate-500 p-2">
          <div className="flex gap-4 items-center">
            <div>
              <Briefcase />
            </div>
            <div>
              <div className="text-lg">name</div>
              <div className="text-xs">profile type</div>
            </div>
          </div>
          <div className="text-xs flex justify-end">edit</div>
        </div>
        <div
          className={`flex gap-4 items-center p-2 ${show && "border-b-2"}`}
          onClick={() => setShow(!show)}
        >
          <UserPlus size={15} /> Add new profile
        </div>
        {show && (
          <div className=" flex flex-col gap-3">
            <Link
              href="/profiles/investor"
              className="p-2 hover:text-accent-foreground hover:bg-accent"
            >
              Invester profile
            </Link>
            <div className="p-2 hover:text-accent-foreground hover:bg-accent">
              Business profile
            </div>
            <div className="p-2 hover:text-accent-foreground hover:bg-accent">
              Advisor profile
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AddProfile;

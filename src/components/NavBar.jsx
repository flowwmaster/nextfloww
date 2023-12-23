"use client";

import Link from "next/link";
import { AudioWaveform, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants, Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Register from "./Register";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

function NavBar() {
  const { data: session } = useSession({
    // required: true,
    // onUnauthenticated() {
    //   redirect("/");
    // },
  });
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openReg, setOpenReg] = useState(false);

  const close = (btnName) => {
    if (btnName === "Register") {
      setOpenReg(false);
    } else setOpen(false);
  };

  return (
    <div className="sticky inset-x-0 top-0 h-16 backdrop-blur-sm hover:backdrop-blur-lg z-10">
      <header className="relative">
        {/* <MaxWidthWrapper> */}
        <div className="border-b border-gray-200 px-2">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <AudioWaveform className="h-10 w-20" />

                {/* <Icons.logo className="h-10 w-10 lucide lucide-audio-waveform" /> */}
              </Link>

              <SunMoon
                className="h-10 w-20"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            </div>
            {/* <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
              <NavItems />
            </div> */}
            <div className="ml-auto flex items-center">
              {session?.user ? (
                <div>
                  <Button onClick={() => signOut()} variant="outline">
                    Logout
                  </Button>
                  <Link href="/Admin" className={cn(buttonVariants(), "ml-2")}>
                    Admin &rarr;
                  </Link>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-end space-x-6 ">
                  <div
                    onClick={() => {
                      if (!open) setOpen(true);
                    }}
                  >
                    <Register
                      btnName={"Sign in"}
                      open={open}
                      close={close}
                      setOpen={setOpen}
                    />
                  </div>
                  <div
                    onClick={() => {
                      if (!openReg) setOpenReg(true);
                    }}
                  >
                    <Register
                      btnName={"Register"}
                      open={openReg}
                      close={close}
                      setOpen={setOpenReg}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* </MaxWidthWrapper> */}
      </header>
    </div>
  );
}

export default NavBar;

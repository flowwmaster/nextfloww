"use client";

import Link from "next/link";
import { AudioWaveform, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants, Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Register from "./Register";
import ForgotPass from "./ForgotPass";
import VerifyPop from "./VerifyPop";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import AddProfile from "./AddProfile";

// import { GlobalContext } from "@/providers/Global";

function NavBar() {
  const { data: session } = useSession({
    // required: true,
    // onUnauthenticated() {
    //   redirect("/");
    // },
  });
  // const { user } = useContext(GlobalContext);

  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openV, setOpenV] = useState(false);
  const [openFP, setOpenFP] = useState(false);
  const [openReg, setOpenReg] = useState(false);

  const close = (btnName) => {
    if (btnName === "Register") {
      setOpenReg(false);
    } else setOpen(false);
  };

  const switchAuth = () => {
    setOpenReg(!openReg);
    setOpen(!open);
  };

  useEffect(() => {
    if (session && !session?.isVerified) {
      setOpenV(true);
    } else {
      setOpenV(false);
    }
  }, [session]);

  return (
    <div className="sticky inset-x-0 top-0 h-16 backdrop-blur-sm hover:backdrop-blur-lg z-10">
      <header className="relative">
        {/* <MaxWidthWrapper> */}
        <div className="border-b border-gray-200 px-2">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href="/">
                <AudioWaveform className="h-10 w-20" />
              </Link>

              <SunMoon
                className="h-10 w-20"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
            </div>
            <div className="ml-auto flex items-center">
              {session?.user ? (
                <div className="flex items-center gap-3">
                  <Link href="/Admin" className={cn(buttonVariants())}>
                    Admin &rarr;
                  </Link>
                  <Button onClick={() => signOut()} variant="outline">
                    Logout
                  </Button>
                  <Button onClick={() => signOut()} variant="outline">
                    Create Profile
                  </Button>
                  <AddProfile />
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
                      switchAuth={switchAuth}
                      setOpenFP={setOpenFP}
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
                      switchAuth={switchAuth}
                    />
                  </div>
                </div>
              )}
              <ForgotPass
                setOpenFP={setOpenFP}
                openFP={openFP}
                setOpen={setOpen}
              />
              <VerifyPop openV={openV} setOpenV={setOpenV} id={session?.id} />
            </div>
          </div>
        </div>
        {/* </MaxWidthWrapper> */}
      </header>
    </div>
  );
}

export default NavBar;

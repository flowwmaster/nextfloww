"use client";

import Link from "next/link";
// import MaxWidthWrapper from "./MaxWidthWrapper";
// import { Icons } from "./ui/icon";
import { AudioWaveform, SunMoon } from "lucide-react";
import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
import { useTheme } from "next-themes";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

function NavBar() {
  const { data: session } = useSession({
    // required: true,
    // onUnauthenticated() {
    //   redirect("/");
    // },
  });
  const { theme, setTheme } = useTheme();
  console.log("session", session);

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
                  {" "}
                  <Link
                    href="/api/auth/signout?callbackUrl=/"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "border border-slate-500 mr-2"
                    )}
                  >
                    {" "}
                    Logout{" "}
                  </Link>
                  <Link
                    href="/create-user"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "border border-slate-500"
                    )}
                  >
                    Create account
                  </Link>
                  <Link href="/Admin" className={cn(buttonVariants(), "ml-2")}>
                    Admin &rarr;
                  </Link>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-end space-x-6 ">
                  <Link
                    href="/api/auth/signin"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "border border-slate-500"
                    )}
                  >
                    {" "}
                    Sign in{" "}
                  </Link>
                  <Link
                    href="/create-user"
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "border border-slate-500"
                    )}
                  >
                    Create account
                  </Link>
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "./ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
// import { Cross2Icon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const Register = ({ btnName, open, close }) => {
  const session = useSession();
  const [error, setError] = useState("");

  const formSchema = z.object(
    btnName === "Register"
      ? {
          name: z.string(),
          password: z.string().min(4),
          email: z.string().email(),
        }
      : {
          password: z.string().min(4),
          email: z.string().email(),
        }
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (formData) => {
    const { email, password } = formData;

    if (btnName === "Register") {
      const apiData = { ...formData, verified: false };
      axios
        .post("/api/Users", apiData)
        .then(function (_res) {
          setError("");
          close(btnName);
        })
        .catch(function (error) {
          setError(error.response.data.message);
        });
    } else {
      signIn("credentials", {
        redirect: false,
        email,
        password,
      })
        .then((res) => {
          if (res?.error) {
            setError("Invalid email or password");
          } else {
            close(btnName);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setError("Something went wrong! Please try again");
        });
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <Button className="border border-slate-500" variant="outline">
          {btnName}
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <X
            onClick={() => close(btnName)}
            className="absolute right-3 top-3 z-50 zzzzaaaa-ssss"
          />
          <DialogHeader>
            <DialogTitle>
              {btnName === "Register" ? "Welcome to Bizfloww" : "Login"}
            </DialogTitle>
            {btnName === "Register" && (
              <DialogDescription>
                Kindly enter the following details to register on our platform.
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-md w-full flex flex-col gap-4"
              >
                {btnName === "Register" && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            className="col-span-3"
                            placeholder="Email Address"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                {error !== "" && <div className="text-red-500">{error}</div>}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            className="col-span-3"
                            placeholder="Password"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;

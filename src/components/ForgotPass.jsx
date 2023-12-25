import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

const ForgotPass = ({ openFP, setOpenFP, setOpen }) => {
  const [error, setError] = useState("");

  const formSchema = z.object({ email: z.string().email() });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (formData) => {
    axios
      .post("/api/Users/forgotpass", formData)
      .then(function (_res) {
        setError("");
        setOpenFP(false);
      })
      .catch(function (error) {
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <Dialog open={openFP}>
        <DialogContent className="sm:max-w-[425px]">
          <X
            onClick={() => setOpenFP(false)}
            className="absolute right-3 top-3 z-10 cursor-pointer"
          />
          <DialogHeader>
            <DialogTitle>Forgot Password?</DialogTitle>
            <DialogDescription>
              Kindly submit your email address to receive a password reset link
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="max-w-md w-full flex flex-col gap-4"
              >
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

                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </Form>
          </div>

          <DialogFooter>
            <div
              onClick={() => {
                setOpen(true);
                setOpenFP(false);
              }}
              className="text-blue-500 cursor-pointer font-medium"
            >
              {" "}
              Sign in?
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPass;

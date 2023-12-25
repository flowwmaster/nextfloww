"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = ({ params }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (params?.token) {
      const verifyToken = async () => {
        axios
          .post(
            "/api/Users/verify-pass",
            JSON.stringify({ token: params.token })
          )
          .then(function (res) {
            setError("");
            setVerified(true);
            setUser(res);
          })
          .catch(function (error) {
            setError(error.response.data.message);
            setVerified(true);
          });
      };
      verifyToken();
    }
  }, [params]);

  const formSchema = z.object({ password: z.string().min(4) });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (formData) => {
    axios
      .post("/api/Users/reset-pass", {
        password: formData.password,
        email: user.data.email,
      })
      .then(function (_res) {
        router.push("/");
      })
      .catch(function (error) {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>Kindly submit your new password!</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-md w-full flex flex-col gap-4"
            >
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
              {error !== "" && <div className="text-red-500">{error}</div>}

              <Button type="submit" className="w-full">
                Reset
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;

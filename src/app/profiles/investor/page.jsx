"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const InvestorProfile = () => {
  const formSchema = z.object({
    name: z.string(),
    number: z.string().max(10),
    location: z.enum(["Bangalore", "Mangalore"]),
    email: z.string().email(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   email: "",
    // },
  });

  const handleSubmit = (val) => {
    console.log("val", val);

    axios
      .post("/api/Profile/add-investor", bizData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="text-2xl my-3">CREATE YOUR INVESTOR PROFILE</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
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

          <FormField
            control={form.control}
            name="number"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Number" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
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
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fruit" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          <SelectItem value="Bangalore">Bangalore</SelectItem>
                          <SelectItem value="Mangalore">Mangalore</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
  );
};

export default InvestorProfile;

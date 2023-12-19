"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log("formData", formData);
    axios
      .post("/api/Users", formData)
      .then(function (response) {
        console.log("response", response);
        router.refresh();
        router.push("/");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3"
      >
        <h1>Create new user</h1>
        <label>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          value={formData?.name}
          className="m-2 bg-slate-400 rounded-md"
        />
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          value={formData?.email}
          className="m-2 bg-slate-400 rounded-md"
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData?.password}
          className="m-2 bg-slate-400 rounded-md"
        />

        <input
          className="bg-blue-300 hover:bg-blue-100"
          type="submit"
          value="Create User"
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </div>
  );
};

export default page;

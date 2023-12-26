import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const VerifyPop = ({ openV, setOpenV, id }) => {
  const [error, setError] = useState("");

  const handleSubmit = () => {
    axios
      .post(`/api/Users/${id}`)
      .then(function (_res) {
        setError("");
        setOpenV(false);
      })
      .catch(function (error) {
        console.log("send faild!");
      });
  };

  return (
    <div>
      <Dialog open={openV}>
        <DialogContent className="sm:max-w-[425px]">
          <X
            onClick={() => setOpenV(false)}
            className="absolute right-3 top-3 z-10 cursor-pointer"
          />
          <DialogHeader>
            <DialogTitle>Verify email!</DialogTitle>
            <DialogDescription>
              Your profile isn't verified! Click to send a verification link to
              your registerd email ID!
            </DialogDescription>
          </DialogHeader>

          <Button onClick={() => handleSubmit()} className="w-full">
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerifyPop;

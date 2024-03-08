import React from "react";
import { useStateContext } from "../contexts/contexts";
export default function toast() {
    const { toast } = useStateContext();
  return (
    <>
      {toast.show && (
        <div
          className={`fixed w-[250px] top-16 right-5 px-3 py-2 text-md rounded  text-white ${
            toast.color === "red" ? "bg-red-500" : "bg-green-500"
          } fade-left`}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

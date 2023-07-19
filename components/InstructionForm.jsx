import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";

function InstructionForm({
  id = null,
  remove,
  instructionData,
  setInstructionSlots,
}) {
  return (
    <div className="flex flex-row gap-3">
      {/* <img
        className="h-12 w-12 flex-none rounded-full bg-gray-50"
        src="https://upload.wikimedia.org/wikipedia/commons/8/87/Red-Pepper.jpg"
        alt=""
      /> */}
      <textarea
        id={id}
        name={`instruction-${id}`}
        value={instructionData.instructionContent}
        onChange={(e) => {
          console.log("onChange");
          setInstructionSlots((prev) => {
            const newSlots = [...prev];
            newSlots[id] = e.target.value;
            return newSlots;
          });
        }}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <TrashIcon className="w-7" onClick={() => remove(id)} />
    </div>
  );
}

export default InstructionForm;

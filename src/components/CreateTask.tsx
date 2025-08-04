import React, { useState } from "react";
import { priorityColor } from "../utils/priorityColor";
import type { Priority } from "../types";

interface Props {
  addTask: (title: string, description: string, priority: Priority) => void;
}

const PRIORITIES: Array<Priority> = ["low", "medium", "high"];

export const CreateTask: React.FC<Props> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const [isTitleFocused, setIsTitleFocused] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    addTask(title, description, priority);
    setTitle("");
    setDescription("");
    setPriority("low");
    setIsTitleFocused(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task"
        className="rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        onFocus={() => setIsTitleFocused(true)}
        onBlur={() => {
          if (!title) setIsTitleFocused(false);
        }}
      />
      {isTitleFocused && (
        <>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            className="rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex gap-2">
            {PRIORITIES.map((priorityOption) => (
              <button
                key={priorityOption}
                type="button"
                className={`px-3 py-1 rounded-lg border border-gray-300 transition ${
                  priority === priorityOption
                    ? priorityColor(priorityOption)
                    : ""
                }`}
                onClick={() => setPriority(priorityOption)}
              >
                {priorityOption.charAt(0).toUpperCase() +
                  priorityOption.slice(1)}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-black text-white px-4 py-2 hover:bg-black transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!title || !description}
          >
            Add
          </button>
        </>
      )}
    </form>
  );
};

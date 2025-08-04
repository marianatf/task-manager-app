import React, { useState } from "react";
import type { TaskItem as TaskItemType } from "../types";
import { priorityColor } from "../utils/priorityColor";

interface Props extends TaskItemType {
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

export const TaskItem: React.FC<Props> = ({
  id,
  completed,
  title,
  description,
  priority = "low",
  onDelete,
  onToggleComplete,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="py-2 group">
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-3 flex-grow cursor-pointer"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          <input
            id={id}
            checked={completed}
            onChange={() => onToggleComplete(id, completed)}
            type="checkbox"
            className="w-5 h-5 accent-black"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex flex-col">
            <div
              className={`font-semibold text-gray-900${
                completed ? " line-through" : ""
              }`}
            >
              {title}
            </div>
            {showDescription && (
              <div
                className={`text-gray-600 text-sm mt-1${
                  completed ? " line-through" : ""
                }`}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <span
            className={`w-4 h-4 rounded-full ${priorityColor(priority)}`}
          ></span>
          <button
            className="flex items-center justify-center text-gray-400 hover:text-red-500 text-xl opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDelete(id)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

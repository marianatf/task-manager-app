import type { Priority } from "../types";

export const priorityColor = (priority: Priority) => {
  if (priority === "high") {
    return "bg-red-200";
  } else if (priority === "medium") {
    return "bg-yellow-200";
  } else {
    return "bg-blue-200";
  }
};
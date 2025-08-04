import React from "react";

interface Props {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  onClearCompleted,
}) => {
  const isSingleActiveTask = activeCount === 1;
  const activeTaskLabel = isSingleActiveTask ? "task" : "tasks";

  return (
    <footer className="flex justify-between items-center px-4 py-2 border-t border-gray-200 text-gray-600 w-full">
      <span>
        <strong className="font-semibold">{activeCount}</strong> outstanding {activeTaskLabel}
      </span>
      {completedCount > 0 && (
        <button
          className="hover:text-red-600 transition"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

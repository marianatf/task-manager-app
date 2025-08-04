import { TaskList } from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";

const App = () => {
  const {
    activeCount,
    completedCount,
    handleClearAllCompleted,
    handleCompleted,
    handleDelete,
    handleCreate,
    tasks,
  } = useTasks();

  return (
    <TaskList
      tasks={tasks}
      onDelete={handleDelete}
      onToggleComplete={handleCompleted}
      activeCount={activeCount}
      completedCount={completedCount}
      onClearCompleted={handleClearAllCompleted}
      onCreateTask={handleCreate}
    />
  );
};

export default App;

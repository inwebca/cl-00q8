import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import { Task } from "../../interfaces/Task.ts";
import { useState } from "react";
import TaskStatusEditDialog from "./TaskStatusEditDialog.tsx";
import { supabase } from "../../utils/supabase.ts";

interface TasksTableProps {
  tasks: Task[];
  onTaskUpdated: () => void;
}

const TasksTable = (props: TasksTableProps) => {
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleEditClick = (task: Task) => {
    setCurrentTask(task);
    setEditTaskDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditTaskDialogOpen(false);
    setCurrentTask(null);
  };

  const handleSetCompleted = async (task: Task) => {
    const result = await supabase
      .from("tasks")
      .update({ completed: true })
      .eq("id", task.id);

    if (result.error) {
      console.error("Error :", result.error.message);
    } else {
      props.onTaskUpdated();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.task_status.name}</TableCell>
                <TableCell>
                  <Grid container spacing={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(task)}
                      disabled={task.completed ? true : false}
                    >
                      Edit status
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={task.completed ? true : false}
                      onClick={() => handleSetCompleted(task)}
                    >
                      Mark as completed
                    </Button>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {currentTask && (
        <TaskStatusEditDialog
          open={editTaskDialogOpen}
          onClose={handleDialogClose}
          onTaskSaved={props.onTaskUpdated}
          task={currentTask}
        />
      )}
    </>
  );
};

export default TasksTable;

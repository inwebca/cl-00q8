import { Task } from "../../interfaces/Task.ts";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import TaskAssignmentDialog from "./TaskAssignmentDialog.tsx";

interface TasksTableAdminProps {
  tasks: Task[];
  onTaskCreated: () => void;
}

const TasksTableAdmin = (props: TasksTableAdminProps) => {
  const [dialogAssignmentOpen, setDialogAssignmentOpen] =
    useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleUpdateClick = (task: Task) => {
    setCurrentTask(task);
    setDialogAssignmentOpen(true);
  };

  const handleDialogClose = () => {
    setDialogAssignmentOpen(false);
    setCurrentTask(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Due date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned user</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.due_date}</TableCell>
                <TableCell>{task.task_status.name}</TableCell>
                <TableCell>
                  {task.user?.first_name} {task.user?.last_name}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdateClick(task)}
                  >
                    Update assignment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {currentTask && (
        <TaskAssignmentDialog
          open={dialogAssignmentOpen}
          onClose={handleDialogClose}
          onTaskAssignmentUpdated={props.onTaskCreated}
          task={currentTask}
        />
      )}
    </>
  );
};

export default TasksTableAdmin;

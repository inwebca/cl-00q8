import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { TaskStatus } from "../../interfaces/TaskStatus";
import { useState } from "react";
import TaskStatusDialog from "./TaskStatusDialog.tsx";
import Button from "@mui/material/Button";

interface TaskStatusTableProps {
  statuses: TaskStatus[];
  onStatusUpdated: () => void;
}
const TaskStatusTable = (props: TaskStatusTableProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus | null>(null);

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentStatus(null);
  };

  const handleEditClick = (status: TaskStatus) => {
    setCurrentStatus(status);
    setEditDialogOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.statuses.map((status) => (
              <TableRow key={status.id}>
                <TableCell>{status.name}</TableCell>
                <TableCell>{status.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(status)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {currentStatus && (
        <TaskStatusDialog
          open={editDialogOpen}
          onClose={handleDialogClose}
          onStatusSaved={props.onStatusUpdated}
          status={currentStatus}
        />
      )}
    </>
  );
};

export default TaskStatusTable;

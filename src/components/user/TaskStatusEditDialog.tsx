import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { Task } from "../../interfaces/Task.ts";
import { supabase } from "../../utils/supabase.ts";
import { TaskStatus } from "../../interfaces/TaskStatus.ts";
import CircularProgress from "@mui/material/CircularProgress";

interface TaskStatusEditDialogProps {
  open: boolean;
  onClose: () => void;
  onTaskSaved: () => void;
  task: Task;
}

const TaskStatusEditDialog = (props: TaskStatusEditDialogProps) => {
  const [statuses, setStatuses] = useState<TaskStatus[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await supabase
      .from("tasks")
      .update({ status_id: selectedStatusId })
      .eq("id", props.task.id);

    if (res.error) {
      console.error("Error :", res.error.message);
    } else {
      props.onTaskSaved();
      props.onClose();
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStatusId(event.target.value as string);
  };

  const fetchStatuses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("task_status")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      console.error("Error:", error.message);
    } else {
      setStatuses(data || []);
      setSelectedStatusId(props.task.status_id.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchStatuses();
  }, []);

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth={true}>
      <DialogTitle>Edit task status</DialogTitle>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <CircularProgress />
        ) : (
          <DialogContent>
            <Box sx={{ width: "100%" }}>
              <InputLabel>Status</InputLabel>
              <Select
                fullWidth={true}
                value={selectedStatusId}
                onChange={handleChange}
              >
                {statuses.map((status) => (
                  <MenuItem value={status.id} key={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskStatusEditDialog;

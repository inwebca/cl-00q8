import { supabase } from "../../utils/supabase.ts";
import { FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { TaskStatus } from "../../interfaces/TaskStatus.ts";

interface TaskStatusDialogProps {
  open: boolean;
  onClose: () => void;
  onStatusSaved: () => void;
  status?: TaskStatus;
}

const TaskStatusDialog = (props: TaskStatusDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.status) {
      setName(props.status.name);
      setDescription(props.status.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [props.status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let result;
    if (props.status) {
      result = await supabase
        .from("task_status")
        .update({ name, description })
        .eq("id", props.status.id);
    } else {
      result = await supabase.from("task_status").insert({ name, description });
    }

    if (result.error) {
      console.error("Error :", result.error.message);
    } else {
      props.onStatusSaved();
      props.onClose();
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        {props.status ? "Edit Status" : "Create Status"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            type="text"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="dense"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            {props.status ? "Edit" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskStatusDialog;

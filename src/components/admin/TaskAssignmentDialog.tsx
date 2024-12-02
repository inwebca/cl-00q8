import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { supabase } from "../../utils/supabase.ts";
import { Task } from "../../interfaces/Task.ts";
import { useEffect, useState } from "react";
import { User } from "../../interfaces/User.ts";

interface IProps {
  open: boolean;
  onClose: () => void;
  onTaskAssignmentUpdated: () => void;
  task: Task;
}

type FormProps = {
  assigned_to: string;
};

const TaskAssignmentDialog = (props: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [users, setUsers] = useState<User[]>([]);
  const { setValue, handleSubmit, control } = useForm<FormProps>();

  const fetchAllUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error.message);
    } else {
      setUsers(data);
      setValue("assigned_to", props.task.assigned_to || "");
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchAllUsers();
  }, []);

  const onSubmit = async (data: FormProps) => {
    const res = await supabase
      .from("tasks")
      .update({ assigned_to: data.assigned_to ? data.assigned_to : null })
      .eq("id", props.task.id);

    if (res.error) {
      console.error("Error :", res.error.message);
    } else {
      props.onTaskAssignmentUpdated();
      props.onClose();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Update assignment</DialogTitle>
      <FormContainer onSuccess={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack direction={"column"} gap={2}>
            {users && (
              <SelectElement
                control={control}
                name={"assigned_to"}
                label={"Assigned To"}
                options={[
                  { id: "", label: "None" },
                  ...users.map((user) => ({
                    id: user.id,
                    label: `${user.first_name} ${user.last_name}`,
                  })),
                ]}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Update Assignment
          </Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};

export default TaskAssignmentDialog;

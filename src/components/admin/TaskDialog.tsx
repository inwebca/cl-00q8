import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  TextareaAutosizeElement,
} from "react-hook-form-mui";
import { DatePickerElement } from "react-hook-form-mui/date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { supabase } from "../../utils/supabase.ts";

interface IProps {
  open: boolean;
  onClose: () => void;
  onTaskSaved: () => void;
}

type FormProps = {
  title: string;
  description: string;
  due_date: string;
};

const TaskDialog = (props: IProps) => {
  const onSubmit = async (data: FormProps) => {
    const res = await supabase.from("tasks").insert({
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      status_id: 1,
    });

    if (res.error) {
      console.error("Error :", res.error.message);
    } else {
      props.onTaskSaved();
      props.onClose();
    }
  };

  const defaultValues: FormProps = { title: "", description: "", due_date: "" };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <FormContainer defaultValues={defaultValues} onSuccess={onSubmit}>
        <DialogContent>
          <Stack direction={"column"} gap={2}>
            <TextFieldElement name={"title"} label={"Title"} required />
            <TextareaAutosizeElement
              name={"description"}
              label={"Description"}
              required
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePickerElement
                name={"due_date"}
                label={"Due Date"}
                required
              />
            </LocalizationProvider>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Create Task
          </Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};

export default TaskDialog;

import { Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Task } from "../../interfaces/Task.ts";
import { supabase } from "../../utils/supabase.ts";
import CircularProgress from "@mui/material/CircularProgress";
import TasksTableAdmin from "../../components/admin/TasksTableAdmin.tsx";
import Button from "@mui/material/Button";
import TaskDialog from "../../components/admin/TaskDialog.tsx";

const TaskAssignmentView = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const fetchAllTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*, task_status(*), user: users(*)")
      .eq("completed", false)
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error.message);
    } else {
      setAllTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchAllTasks();
  }, []);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={"/admin"} color="inherit">
          Admin
        </Link>
        <Typography sx={{ color: "text.primary" }}>Task Assignment</Typography>
      </Breadcrumbs>

      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Task Assignement
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleDialogOpen}
      >
        Create Task
      </Button>
      <TasksTableAdmin tasks={allTasks} onTaskCreated={fetchAllTasks} />
      <TaskDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onTaskSaved={fetchAllTasks}
      ></TaskDialog>
    </>
  );
};

export default TaskAssignmentView;

import { useEffect, useState } from "react";
import { CircularProgress, Breadcrumbs } from "@mui/material";
import { TaskStatus } from "../../interfaces/TaskStatus.ts";
import { supabase } from "../../utils/supabase.ts";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import TaskStatusTable from "../../components/admin/TaskStatusTable.tsx";
import Button from "@mui/material/Button";
import TaskStatusDialog from "../../components/admin/TaskStatusDialog.tsx";

const TaskStatusView = () => {
  const [statuses, setStatuses] = useState<TaskStatus[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
    }
    setLoading(false);
  };

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  useEffect(() => {
    void fetchStatuses();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={"/admin"} color="inherit">
          Admin
        </Link>
        <Typography sx={{ color: "text.primary" }}>Task status</Typography>
      </Breadcrumbs>

      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Manage Tasks Status
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleDialogOpen}
      >
        Add status
      </Button>
      <TaskStatusTable statuses={statuses} onStatusUpdated={fetchStatuses} />
      <TaskStatusDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        onStatusSaved={fetchStatuses}
      />
    </>
  );
};

export default TaskStatusView;

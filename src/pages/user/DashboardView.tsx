import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import CircularProgress from "@mui/material/CircularProgress";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import TasksTable from "../../components/user/TasksTable";
import { Task } from "../../interfaces/Task";
import { useAuth } from "../../context/AuthContext";

const DashboardView = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*, task_status(*)")
      .eq("assigned_to", user?.id)
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error.message);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchTasks();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={"/dashboard"} color="inherit">
          Dashboard
        </Link>
        <Typography sx={{ color: "text.primary" }}>Manage my tasks</Typography>
      </Breadcrumbs>
      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Manage My Tasks
      </Typography>
      <TasksTable tasks={tasks} onTaskUpdated={fetchTasks} />
    </>
  );
};

export default DashboardView;

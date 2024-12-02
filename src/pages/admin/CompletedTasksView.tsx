import {
  Breadcrumbs,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { supabase } from "../../utils/supabase.ts";
import { useEffect, useState } from "react";
import { Task } from "../../interfaces/Task.ts";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const CompletedTasksView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCompletedTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("completed", true)
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error.message);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchCompletedTasks();
  }, []);

  const handleArchiveTask = async (task: Task) => {
    try {
      await supabase.from("archived_tasks").insert(task);
      await supabase.from("tasks").delete().eq("id", task.id);
      await fetchCompletedTasks();
    } catch (error) {
      console.error("Error archiving task:", (error as Error).message);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link to={"/admin"} color="inherit">
          Admin
        </Link>
        <Typography sx={{ color: "text.primary" }}>Completed Tasks</Typography>
      </Breadcrumbs>

      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Completed Tasks
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleArchiveTask(task)}
                  >
                    Archive task
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CompletedTasksView;

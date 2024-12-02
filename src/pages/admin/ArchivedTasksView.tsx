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
import { useEffect, useState } from "react";
import { Task } from "../../interfaces/Task.ts";
import { supabase } from "../../utils/supabase.ts";
import CircularProgress from "@mui/material/CircularProgress";

const ArchivedTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchArchivedTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("archived_tasks")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error.message);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchArchivedTasks();
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
        <Typography sx={{ color: "text.primary" }}>Archived Tasks</Typography>
      </Breadcrumbs>

      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Archived Tasks
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ArchivedTasks;

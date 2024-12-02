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
import { Feedback } from "../../interfaces/Feedback.ts";
import CircularProgress from "@mui/material/CircularProgress";

const AdminFeedbackView = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("feedback")
      .select("*, user:users(*)")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error:", error.message);
    } else {
      setFeedbacks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchFeedbacks();
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
        <Typography sx={{ color: "text.primary" }}>App Feedbacks</Typography>
      </Breadcrumbs>

      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        App Feedbacks
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Content</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.content}</TableCell>
                <TableCell>
                  {feedback.user.first_name} {feedback.user.last_name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminFeedbackView;

import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Card from "@mui/material/Card";
import { Breadcrumbs } from "@mui/material";
import Grid from "@mui/material/Grid2";

const AdminPanelView = () => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography sx={{ color: "text.primary" }}>Admin</Typography>
      </Breadcrumbs>
      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Admin Panel View
      </Typography>

      <Grid container spacing={2}>
        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Tasks Status
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/tasks-status"}>
                Manage Tasks Status
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Task Assignment
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/task-assignment"}>
                Manage Task Assignment
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Completed Tasks
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/completed-tasks"}>
                Manage Completed Tasks
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Archived Tasks
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/archived-tasks"}>
                View Archived Tasks
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Tasks Chart
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/chart"}>
                View Tasks Chart
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                App Feedbacks
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to={"/admin-feedback"}>
                View App Feedbacks
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPanelView;

import { AuthProvider } from "./context/AuthContext";
import Layout from "./layout/Layout.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginView from "./pages/LoginView.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import RoleBasedRoute from "./components/RoleBasedRoute.tsx";
import AdminPanelView from "./pages/admin/AdminPanelView.tsx";
import DashboardView from "./pages/user/DashboardView.tsx";
import TaskStatusView from "./pages/admin/TasksStatusView.tsx";
import TaskAssignmentView from "./pages/admin/TaskAssignmentView.tsx";
import CompletedTasksView from "./pages/admin/CompletedTasksView.tsx";
import ArchivedTasksView from "./pages/admin/ArchivedTasksView.tsx";
import ChartView from "./pages/admin/ChartView.tsx";
import FeedbackView from "./pages/user/FeedbackView.tsx";
import AdminFeedbackView from "./pages/admin/AdminFeedbackView.tsx";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<PublicRoute />}>
              <Route path="login" element={<LoginView />} />
              <Route path="redirect"></Route>
            </Route>

            <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
              <Route path="admin" element={<AdminPanelView />} />
              <Route path="tasks-status" element={<TaskStatusView />} />
              <Route path="task-assignment" element={<TaskAssignmentView />} />
              <Route path="completed-tasks" element={<CompletedTasksView />} />
              <Route path="archived-tasks" element={<ArchivedTasksView />} />
              <Route path="chart" element={<ChartView />} />
              <Route path="admin-feedback" element={<AdminFeedbackView />} />
            </Route>

            <Route element={<RoleBasedRoute allowedRoles={["user"]} />}>
              <Route path="dashboard" element={<DashboardView />} />
              <Route path="feedback" element={<FeedbackView />} />
            </Route>

            <Route index element={<Navigate to="/login" />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

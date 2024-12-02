import { Breadcrumbs, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ChartView = () => {
  const [taskData, setTaskData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTaskData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
        id,
        status_id,
        task_status(name)
      `,
      )
      .eq("completed", false);

    if (error) {
      console.error("Error fetching tasks:", error.message);
      setLoading(false);
      return;
    }

    const groupedData = data?.reduce(
      (acc: { [key: string]: number }, task: any) => {
        const statusName = task.task_status?.name || "Unknown";
        acc[statusName] = (acc[statusName] || 0) + 1;
        return acc;
      },
      {},
    );

    setTaskData(groupedData || {});
    setLoading(false);
  };

  useEffect(() => {
    void fetchTaskData();
  }, []);

  const labels = Object.keys(taskData);
  const values = Object.values(taskData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Number of Tasks",
        data: values,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tasks Grouped by Status",
      },
    },
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
        <Typography sx={{ color: "text.primary" }}>Tasks Chart</Typography>
      </Breadcrumbs>

      <Typography typography="h5" sx={{ mt: 2, mb: 2 }}>
        Tasks Chart
      </Typography>

      <div style={{ width: "50%", margin: "auto" }}>
        <Bar data={chartData} options={options} />
      </div>
    </>
  );
};

export default ChartView;

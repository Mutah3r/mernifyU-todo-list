import { useEffect, useState } from "react";
import { axiosOpen } from "../utils/axios";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "./Loader";

const ProgressBar = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    axiosOpen.get("/api/v1/tasks").then((res) => {
      setAllTasks(res.data.tasks);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let pnd = 0;
    let prg = 0;
    let dn = 0;

    allTasks.forEach((t) => {
      if (t.status === "Pending") {
        pnd++;
      } else if (t.status === "In Progress") {
        prg++;
      } else {
        dn++;
      }
    });

    setPending(pnd);
    setProgress(prg);
    setDone(dn);
  }, [allTasks]);

  const data = [
    {
      name: "Pending",
      Tasks: pending,
    },
    {
      name: "In Progress",
      Tasks: progress,
    },
    {
      name: "Completed",
      Tasks: done,
    },
  ];

  return (
    <div className="h-[500px] mb-16">
      <h1 className="text-[24px] my-4 font-semibold text-neutral-700 tracking-wide leading-tight mb-4 text-center">
        Task Status Analysis
      </h1>
      {loading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="Tasks"
              fill="#93c5fd"
              activeBar={<Rectangle fill="#60a5fa" stroke="#1e3a8a" />}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ProgressBar;

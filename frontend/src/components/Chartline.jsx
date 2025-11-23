import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function ChartLine({ labels, dataValues }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <Line
        data={{
          labels,
          datasets: [
            {
              data: dataValues,
              borderColor: "purple",
              tension: 0.3,
            },
          ],
        }}
      />
    </div>
  );
}

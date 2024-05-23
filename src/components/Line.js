import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// import { lineChartData } from './data';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineGraph = ({ data: data, labels: labels }) => {
    const options = {
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                text: "CHUVA RIO SOROCABA",
                display: "true",
            }
        },
    };

    return <Line options={options} data={{
        responsive: true,
        type: 'line',
        labels: labels,
        datasets: [
            {
                label: "Precipitação (mm)",
                data: data,
                borderColor: "rgb(108, 207, 246)",
                backgroundColor: "rgb(108, 207, 246)",
            }
        ],
    }} />;
}
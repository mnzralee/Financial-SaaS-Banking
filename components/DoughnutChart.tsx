"use client";

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [{
            label: 'Banks',
            data: [1250, 2500, 3750],
            backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
        }],
        labels: ['Bank A', 'Bank B', 'Bank C']
    }

    return <Doughnut 
        data={data} 
        options={{
            // cutout: '60%', // sets the size of the hole in the middle of the doughnut
            plugins: {
                legend: {
                    display: false, // hides the legend
                    position: 'bottom'
                }
            }
        }}
    />
}

export default DoughnutChart
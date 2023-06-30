import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';

export function Chart(props) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'INCOMES AND OUTCOMES',
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const getData = (truth) => {
        const response = []
        fetch("http://localhost:8080/come/" + props.id + "/chart?truth=" + truth) //надо сделать динамическую ссылку, можно пропсами
            .then(response => response.json())
            .then(acc => {
                acc.forEach(account => {
                    response.push(account)
                })
            })
        return response;
    }

    const myData = {
        labels,
        datasets: [
            {
                label: 'Outcomes',
                data: getData(true),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Incomes',
                data: getData(false),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };


    return <Line options={options} data={myData}/>;
}

export default Chart;
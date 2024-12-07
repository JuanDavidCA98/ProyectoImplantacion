// alumnosCharts.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch data and create charts
    fetch('/Alumnos/GetStatistics')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
            createAgeDistributionChart(data.ageDistribution);
            createAveragesChart(data.averagesByAge);
        })
        .catch(error => console.error('Error:', error));

    function createAgeDistributionChart(data) {
        const ctx = document.getElementById('ageDistributionChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => `${item.age} años`),
                datasets: [{
                    label: 'Cantidad de Alumnos',
                    data: data.map(item => item.count),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Distribución de Alumnos por Edad'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    function createAveragesChart(data) {
        const ctx = document.getElementById('averagesChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.map(item => item.name),
                datasets: [{
                    data: data.map(item => item.value),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Promedios por Edad'
                    }
                }
            }
        });
    }
});
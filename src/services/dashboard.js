const labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const data = {
  labels: labels,
  datasets: [
    {
      xAxis: "x",
      yAxis: "y",
      label: "Sem aporte",
      backgroundColor: "rgb(0,0,0)",
      borderColor: "rgb(0,0,0)",
      data: [],
    },
    {
      label: "Com aporte",
      backgroundColor: "#ff8f35",
      borderColor: "#ff8f35",
      data: [],
    },
  ],
};

const option = {
  plugins: {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeInOutBack",
    },
    title: {
      display: true,
      position: "left",
      text: "Valor (R$)",
      color: "rgb(0,0,0)",
    },
    subtitle: {
      display: true,
      text: "Tempo (Meses)",
      position: "bottom",
    },
    legend: {
      position: "bottom",
      reverse: true,
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        boxHeight: 10,
        font: {
          size: 14,
        },
        color: "rgb(0,0,0)",
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      stacked: true,
      ticks: {
        font: {
          weight: "bold",
          size: 14,
        },
        color: "rgb(0,0,0)",
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      stacked: true,
      ticks: {
        display: false,
      },
    },
  },
};

const config = {
  type: "bar",
  data: data,
  options: option,
};

const dashboard = new Chart(document.getElementById("dashboard"), config);

export const preencheDashboard = (graficoValores) => {
  const { comAporte, semAporte } = graficoValores;
  for (const com in comAporte) {
    let posicao = dashboard.data.datasets[0].data.length;
    dashboard.data.datasets[0].data[posicao] = comAporte[com];
  }
  for (const sem in semAporte) {
    let posicao = dashboard.data.datasets[1].data.length;
    dashboard.data.datasets[1].data[posicao] = comAporte[sem];
  }
  dashboard.update();
};

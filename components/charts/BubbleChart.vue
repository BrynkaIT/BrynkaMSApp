<script>
//Importing Bubble class from the vue-chartjs wrapper
import { Bubble } from "vue-chartjs";
//Exporting this so it can be used in other components
export default {
  extends: Bubble,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ["Data"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "green",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "#249EBF",
            //Data to be represented on y-axis
            data: [
              {
                x: 100,
                y: 0,
                r: 10
              },
              {
                x: 60,
                y: 30,
                r: 20
              },
              {
                x: 40,
                y: 60,
                r: 25
              },
              {
                x: 80,
                y: 80,
                r: 50
              },
              {
                x: 20,
                y: 30,
                r: 25
              },
              {
                x: 0,
                y: 100,
                r: 5
              }
            ],
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 235)",
              "rgba(255, 206, 86)",
              "rgba(75, 192, 192)",
              "rgba(153, 102, 255)",
              "rgba(54, 162, 235)"
            ]
          }
        ]
      },
      //Chart.js options that controls the appearance of the chart
      options: {
        animation: {
          duration: 4000
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
  }
};
</script>
<script>
//Importing Bar class from the vue-chartjs wrapper
import { Bar } from "vue-chartjs";
//Exporting this so it can be used in other components
export default {
  extends: Bar,
  data() {
    return {
      datacollection: {
        //Data to be represented on x-axis
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Year Starting January",
            data: [27, 31, 33, 36, 36, 10],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 01)",
              "rgba(153, 102, 255, 1)",
              "rgba(54, 162, 235, 1)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(54, 162, 235, 1)"
            ],
            borderWidth: 1
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
              }
            }
          ]
        }
      }
    };
  },
  mounted() {
    //renderChart function renders the chart with the datacollection and options object.
    this.renderChart(this.datacollection, this.options);
  }
};
</script>
<style scoped>
#bar-chart{
  width:100% !important;
  height:400px !important;
}
</style>

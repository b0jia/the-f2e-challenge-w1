<script>
import { Bar, mixins } from 'vue-chartjs';

export default {
  extends: Bar,

  mixins: [mixins.reactiveProp],

  props: {
    chartData: {
      type: Object,
      default: null,
    },
    // options: {
    //   type: Object,
    //   default: null,
    // },
  },

  data() {
    return {
      options: {
        // scales: {
        //   xAxes: [{
        //     display: true,
        //     gridLines: {
        //       display: false
        //     },
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Month'
        //     }
        //   }],
        //   yAxes: [{
        //     display: true,
        //     gridLines: {
        //       display: false
        //     },
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Value'
        //     }
        //   }]
        // },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              beginAtZero: true,
              fontStyle: 'bold',
              fontSize: 16,
              fontColor: '#FFFFFF',
            },
            gridLines: {
              color: '#FFFFFF',
              display: false,
            },
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              fontStyle: 'bold',
              fontSize: 16,
              fontColor: '#FFFFFF',
            },
            gridLines: {
              color: '#FFFFFF',
              display: false,
            },
          }],
        },
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  },
};
</script>

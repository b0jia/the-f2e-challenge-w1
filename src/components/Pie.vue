<template>
  <div
    class="pie"
    ref="svgPie"
  ></div>
</template>

<script>
import * as d3 from 'd3';
import { mapState, mapGetters } from 'vuex';
import * as math from '../utils/math';

export default {
  name: 'ComponentPie',

  props: {
    size: {
      default: 200,
      type: Number,
    },

    angle: {
      default: 0,
      type: Number,
    },

    color: {
      default: '#FF4384',
      type: String,
    },
  },

  data() {
    return {
      width: 290,
      height: 290,
      svgBody: null,
      chart: null,
      defs: null,
      pie: null,
      arc: null,
      path: null,
    };
  },

  computed: {
    newangle() {
      return (this.settingTime[this.jobStatus] - this.currentTime)
          / this.settingTime[this.jobStatus] * 360;
    },

    radius() {
      return this.width / 2;
    },

    ...mapState('job', {
      jobStatus: 'status',
    }),
    ...mapState('setting', {
      settingTime: 'time',
    }),
    ...mapState('timer', {
      currentTime: 'time',
    }),
    ...mapGetters('todos', [
      'activeTodos',
      'currentTodo',
    ]),
    ...mapGetters('timer', {
      timerGetString: 'GET_TIME_STRING',
      timerStatus: 'GET_STATUS',
    }),
  },

  watch: {
    angle(newValue) {
      this.updatePie(newValue);
    },

    color(newValue) {
      this.updatePieColor(newValue);
    },
  },

  mounted() {
    this.initPie();
  },

  methods: {
    initPie() {
      this.svgBody = d3.select(this.$refs.svgPie);

      this.chart = this.svgBody
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .attr('xml:space', 'preserve')
        .attr('preserveAspectRatio', 'none');

      this.defs = this.chart.append('defs');

      this.chart
        .append('circle')
        .attr('class', 'chart-orbit')
        .attr('r', this.radius)
        .attr('cx', this.radius)
        .attr('cy', this.radius)
        .style('fill', 'none')
        .style('stroke', '#c2c2c2')
        .style('stroke-width', '0');

      this.arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(this.radius)
        .startAngle(math.toRadians(0))
        .endAngle(math.toRadians(this.newangle));

      this.chart
        .append('g')
        .attr('transform', `translate(${this.radius}, ${this.radius})`)
        .append('path')
        .attr('class', 'chart-current-position')
        .attr('d', this.arc)
        .style('fill', this.color)
        .style('stroke', 'none');
    },

    updatePieColor(newColorValue) {
      this.chart
        .style('fill', newColorValue);
    },

    updatePie() {
      console.log(this.newangle);
      const newAngle = (this.settingTime[this.jobStatus] - this.currentTime)
        / this.settingTime[this.jobStatus] * 360;
      this.svgBody
        .select('.chart-current-position')
        .style('fill', this.color)
        .attr('d', this.arc.endAngle(math.toRadians(newAngle)));
    },
  },
};
</script>

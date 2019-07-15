<template>
  <div class="page page-analytics">
    <section class="analytics-group content-group">
      <header class="headerline group-title">
        <h4 class="title">Focus Time</h4>
      </header>
      <div class="group-content">
        <div class="row">
          <div class="col-12 col-lg-6 analytics-this-week">
            <h5 class="title">Today</h5>
            <p>
              <span class="amount">{{ todayTodos.length }}</span>
              <span class="unit"
                v-if="todayTodos.length === 1"
              >/tomato</span>
              <span class="unit"
                v-else
              >/tomatos</span>
            </p>
          </div>
          <div class="col-12 col-lg-6 analytics-this-week">
            <h5 class="title">Week</h5>
            <p>
              <span class="amount">{{ weekTodos.length }}</span>
              <span class="unit"
                v-if="todayTodos.length === 1"
              >/tomato</span>
              <span class="unit"
                v-else
              >/tomatos</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="analytics-group content-group">
      <header class="headerline group-title">
        <div class="row">
          <div class="col-auto">
            <h4 class="title">Chart</h4>
          </div>
          <div class="col week-switcher">
            <a
              href="#"
              class="btn btn-week-switcher"
              @click.prevent="setPrevWeek"
            ><i class="material-icons">chevron_left</i></a>
            <time>{{ weekDayTodos.start }}</time>
            <span>-</span>
            <time>{{ weekDayTodos.end }}</time>
            <a
              href="#"
              class="btn btn-week-switcher"
              :class="{'disabled': weekDayTodos.todayInWeek}"
              @click.prevent="setNextWeek"
            ><i class="material-icons">chevron_right</i></a>
            <!-- <div class="row week-switcher">
              <div class="col-auto">
                <a
                  href="#"
                  class="btn btn-link btn-week-switcher"
                  @click.prevent="setPrevWeek"
                >&lt;&lt;</a>
              </div>
              <div class="col-auto">
                <time>{{ weekDayTodos.start }}</time>
              </div>
              <div class="col-auto">
                -
              </div>
              <div class="col-auto">
                <time>{{ weekDayTodos.end }}</time>
              </div>
              <div class="col-auto">
                <a
                  href="#"
                  class="btn btn-link btn-week-switcher"
                  :class="{'disabled': weekDayTodos.todayInWeek}"
                  @click.prevent="setNextWeek"
                >&gt;&gt;</a>
              </div>
            </div> -->
          </div>
        </div>
      </header>
      <div class="group-content">
        <div
          class="analytics-chart"
        >
          <chart :chart-data="chartData"></chart>
          <!-- <canvas ref="analyticsChart"></canvas> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import moment from 'moment';

import Chart from '../components/Chart.vue';

export default {
  name: 'analytics',

  components: {
    Chart,
  },

  data() {
    return {
      barChart: null,
    };
  },

  computed: {
    weekDayTodosDates() {
      return this.weekDayTodos.days.map(day => moment(day.date, 'YYYY-MM-DD').format('M/D'));
    },
    weekDayTodosAmount() {
      return this.weekDayTodos.days.map(day => day.todos.length);
    },

    chartData() {
      return {
        labels: this.weekDayTodosDates,
        datasets: [
          {
            label: false,
            backgroundColor: '#FFFFFF',
            hoverBackgroundColor: '#FF4384',
            data: this.weekDayTodosAmount,
          },
        ],
      };
    },

    ...mapGetters('todos', {
      todayTodos: 'todayDone',
      weekTodos: 'weekDone',
      weekDayTodos: 'weekDayDone',
    }),
  },

  mounted() {
    // this.initChart();
  },

  methods: {
    // initChart() {
    //   this.barChart = new Chart(this.$refs.analyticsChart, {
    //     type: 'bar',
    //     data: this.weekDayTodosFormated,
    //     // options: options,
    //   });
    // },

    ...mapMutations('todos', {
      setPrevWeek: 'TODO_SET_PREV_WEEK',
      setNextWeek: 'TODO_SET_NEXT_WEEK',
    }),
  },
};
</script>

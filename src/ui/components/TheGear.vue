<template>
  <div>
    <canvas
      ref="canvas"
      class="canvas"
      :width=width
      :height=height
    ></canvas>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import calculateCellLife from '@/application/calculateCellLife';
import IntervalTimer from '@/application/IntervalTimer';
import howManyNeighborsAlive from '@/application/countNumNeighborsAlive';

export default {
  name: 'TheGear',
  props: {
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    numCols: {
      type: Number,
      default: 0,
    },
    numRows: {
      type: Number,
      default: 0,
    },
    cellSize: {
      type: Number,
      default: 0,
    },
    isRunning: {
      type: Boolean,
      default: false,
    },
    isPressing: {
      type: Boolean,
      default: false,
    },
    cellsInput: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 0.02,
    }
  },
  computed: {
    ...mapState(['table']),
  },
  watch: {
    isRunning(value) {
      const timerMethod = value ? this.timer.resume : this.timer.pause;
      timerMethod();
    },
    interval(value) {
      this.timer.interval = value;
      this.timer.pause();
      this.timer.resume();
    },
    cellsInput(value) {
      this.cells = value;
    }
  },
  data() {
    return {
      cells: [],
      timer: null,
      countGenerations: 0,
      trailIsEnabled: true,
    };
  },
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas) return;
    this.cells = [...this.cellsInput];
    this.fillBackground(canvas);
    this.loopGame();
    this.drawCells();
  },
  methods: {
    fillBackground(canvas) {
      this.ctx = canvas.getContext('2d');
      if (!this.ctx) return;
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.table.width, this.table.height);
    },
    loopGame() {
      this.setInterval(() => {
        if (this.isRunning) {
          this.doGeneration();
        }
      });
    },
    drawCells() {
      this.loopCells((x, y) => {
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.fillStyle = this.cells[x][y] === 1 ? 'white' : 'black';
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        this.ctx.stroke();
      });
    },
    setInterval(callback) {
      this.timer = new IntervalTimer(() => {
        callback();
      }, this.interval);
    },
    loopCells(callback) {
      for (let y = 0; y < this.numRows; y += 1) {
        for (let x = 0; x < this.numCols; x += 1) {
          callback(x, y);
        }
      }
    },
    doGeneration() {
      const cellsOld = [...this.cells];
      const cellsNew = [];
      // Reset:
      for (let i = 0; i < this.numCols; i += 1) {
        cellsNew.push([]);
        for (let j = 0; j < this.numRows; j += 1) {
          cellsNew[i][j] = 0;
        }
      }
      // Calculate generation:
      this.loopCells((x, y) => {
        const numNeighbors = howManyNeighborsAlive(x, y, cellsOld);
        const newState = calculateCellLife(numNeighbors, cellsOld[x][y]);
        cellsNew[x][y] = newState;
      });
      // Set to cells:
      this.loopCells((x, y) => {
        this.$set(this.cells[x], y, cellsNew[x][y]);
      });
      this.countGenerations += 1;
      this.drawCells();
    },
    debug(x, y, numNeighbors, cellsOld) {
      return `[${x},${y}], old ${cellsOld[x][y]}, v(${numNeighbors}) => ${calculateCellLife(numNeighbors, cellsOld[x][y])}`;
    },
    updateState({ i, j, state }) {
      this.cells[i].splice(j, 1, state);
    },
  }
};
</script>

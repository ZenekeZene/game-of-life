<template>
  <div>
    <template v-for="(cellCol, colIndex) in cells">
      <Cell
        v-for="(cell, rowIndex) in cellCol"
        :key="`cell-${colIndex}-${rowIndex}`"
        :state="cell"
        :x="colIndex"
        :y="rowIndex"
        :size="cellSize"
        :countGenerations="countGenerations"
        :isRunning="isRunning"
        :isPressing="isPressing"
        :trailIsEnabled="trailIsEnabled"
        @update:state="updateState"
      />
    </template>
  </div>
</template>
<script>
import Cell from '@/ui/components/Cell.vue';
import calculateCellLife from '@/application/calculateCellLife';
import IntervalTimer from '@/application/IntervalTimer';
import howManyNeighborsAlive from '@/application/countNumNeighborsAlive';

export default {
  name: 'TheGear',
  components: {
    Cell
  },
  props: {
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
    }
  },
  watch: {
    isRunning(value) {
      const timerMethod = value ? this.timer.resume : this.timer.pause;
      timerMethod();
    }
  },
  data() {
    return {
      cells: this.initCells(),
      timer: null,
      interval: 1,
      countGenerations: 0,
      trailIsEnabled: true,
    };
  },
  mounted() {
    this.loopGame();
  },
  methods: {
    initCells() {
      const cells = [];
      for (let i = 0; i < this.numCols; i += 1) {
        cells.push([]);
        for (let j = 0; j < this.numRows; j += 1) {
          cells[i][j] = 0;
        }
      }
      return cells;
    },
    loopGame() {
      this.setInterval(() => {
        if (this.isRunning) {
          this.doGeneration();
        }
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
      const cellsNew = this.initCells();
      this.loopCells((x, y) => {
        const numNeighbors = howManyNeighborsAlive(x, y, cellsOld);
        this.debug(x, y, numNeighbors, cellsOld);
        const newState = calculateCellLife(numNeighbors, cellsOld[x][y]);
        cellsNew[x][y] = newState;
      });
      this.loopCells((x, y) => {
        this.$set(this.cells[x], y, cellsNew[x][y]);
      });
      this.countGenerations += 1;
    },
    debug(x, y, numNeighbors, cellsOld) {
      return `${x}, ${y},
        old ${cellsOld[x][y]},
        v(${numNeighbors}) => ${calculateCellLife(numNeighbors, cellsOld[x][y])}`;
    },
    updateState({ i, j, state }) {
      this.cells[i].splice(j, 1, state);
    },
  }
};
</script>

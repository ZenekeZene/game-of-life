<template>
  <section>
    <canvas
      v-if="table"
      ref="canvas"
      class="canvas"
      :width=table.width
      :height=table.height
    ></canvas>
    <div
      v-if="table"
      ref="container"
      class="container"
      :style="{
        'width': `${table.width}px`,
        'height': `${table.height}px`
      }"
      @mousedown="mousedown"
      @mouseup="mouseup"
    >
      <template v-for="(cellCol, colIndex) in cells">
        <Cell
          v-for="(cell, rowIndex) in cellCol"
          :key="`cell-${colIndex}-${rowIndex}`"
          :state="cell"
          :x="colIndex"
          :y="rowIndex"
          :size="table.cellSize"
          :countGenerations="countGenerations"
          :isRunning="isRunning"
          :isPressing="isPressing"
          :trailIsEnabled="trailIsEnabled"
          @update:state="updateState"
        />
      </template>
    </div>
    <p v-else>No se ha podido cargar el canvas</p>
  </section>
</template>
<script>
import Cell from '@/ui/components/Cell.vue';
import calculateCellLife from '@/application/calculateCellLife';
import IntervalTimer from '@/application/IntervalTimer';

export default {
  name: 'TableItem',
  components: {
    Cell,
  },
  props: {
    table: {
      type: Object,
      default: () => {},
    },
    isRunning: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      ctx: null,
      cells: this.initCells(),
      isPressing: false,
      timer: null,
      interval: 4,
      countGenerations: 0,
      trailIsEnabled: false,
    };
  },
  watch: {
    cells: {
      deep: true,
      immediate: true,
      handler() {
        // console.log(value);
      },
    },
    isRunning(value) {
      const timerMethod = value ? this.timer.resume : this.timer.pause;
      timerMethod();
    }
  },
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas) return;
    this.fillBackground(canvas);
    this.loopGame();
  },
  methods: {
    fillBackground(canvas) {
      this.ctx = canvas.getContext('2d');
      if (!this.ctx) return;
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.table.width, this.table.height);
    },
    initCells() {
      const cells = [];
      for (let i = 0; i < this.table.numCols; i += 1) {
        cells.push([]);
        for (let j = 0; j < this.table.numRows; j += 1) {
          cells[i][j] = 0;
        }
      }
      return cells;
    },
    loopGame() {
      this.timer = new IntervalTimer(() => {
        if (this.isRunning) {
          this.doGeneration();
        }
      }, this.interval);
    },
    doGeneration() {
      const cellsOld = [...this.cells];
      const cellsNew = this.initCells();
      for (let y = 0; y < this.table.numRows; y += 1) {
        for (let x = 0; x < this.table.numCols; x += 1) {
          const numNeighbors = this.countNumNeighborsAlive(x, y, cellsOld);
          this.debug(x, y, numNeighbors, cellsOld);
          const newState = calculateCellLife(numNeighbors, cellsOld[x][y]);
          cellsNew[x][y] = newState;
        }
      }
      for (let y = 0; y < this.table.numRows; y += 1) {
        for (let x = 0; x < this.table.numCols; x += 1) {
          this.$set(this.cells[x], y, cellsNew[x][y]);
        }
      }
      this.countGenerations += 1;
    },
    updateState({ i, j, state }) {
      this.cells[i].splice(j, 1, state);
    },
    debug(x, y, numNeighbors, cellsOld) {
      return `${x}, ${y},
        old ${cellsOld[x][y]},
        v(${numNeighbors}) => ${calculateCellLife(numNeighbors, cellsOld[x][y])}`;
    },
    mousedown() {
      this.isPressing = true;
    },
    mouseup() {
      this.isPressing = false;
    },
    countNumNeighborsAlive(x, y, cells) {
      let numNeighborsAlive = 0;
      const neighbors = [
        [-1, -1],
        [0, -1],
        [1, -1],

        [-1, 0],
        [1, 0],

        [-1, 1],
        [0, 1],
        [1, 1],
      ];
      for (let i = 0; i < neighbors.length; i += 1) {
        const [xx, yy] = neighbors[i];
        if (cells[x + xx] && cells[x + xx][y + yy]) {
          numNeighborsAlive += cells[x + xx][y + yy] === 1 ? 1 : 0;
        }
      }
      return numNeighborsAlive;
    }
  },
};
</script>
<style lang="scss">
  .canvas {
    position: absolute;
  }

  .container {
    position: relative;
    display: inline-block;
  }
</style>

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
      <div v-for="(cellRow, index2) in cells" :key="`cell-${index2}`">
        <Cell
          v-for="(cell, index) in cellRow"
          :key="`cell-${index}`"
          :top="top(index)"
          :left="left(index2)"
          :width="table.cellSize"
          :height="table.cellSize"
          :isPressing="isPressing"
        />
      </div>
    </div>
    <p v-else>No se ha podido cargar el canvas</p>
  </section>
</template>
<script>
import Cell from '@/ui/components/Cell.vue';
import calculateCellLife from '@/application/calculateCellLife';

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
  },
  data() {
    return {
      ctx: null,
      cells: [],
      isPressing: false,
    };
  },
  watch: {
    cells: {
      deep: true,
      immediate: true,
      handler(value) {
        console.log(value);
      },
    },
  },
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas) return;
    this.fillBackground(canvas);
    this.initCells();
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
      for (let i = 0; i < this.table.numRows; i += 1) {
        this.cells.push(new Array(this.table.numCols).fill(0));
      }
    },
    loopGame() {
      setInterval(() => {
        for (let i = 0; i < this.table.numCols.length; i += 1) {
          const item = this.table.numCols[i];
          for (let j = 0; j < this.table.numRows.length; j += 1) {
            item.splice(j, 1, calculateCellLife({ numNeighbors: 3 }));
          }
          window.sleep(1000);
        }
      }, 1000);
    },
    mousedown() {
      this.isPressing = true;
    },
    mouseup() {
      this.isPressing = false;
    },
    top(y) {
      return 0 + (this.table.cellSize * y);
    },
    left(x) {
      return 0 + (this.table.cellSize * x);
    },
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

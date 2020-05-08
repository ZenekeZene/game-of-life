<template>
  <section>
    <canvas
      v-if="table"
      ref="canvas"
      class="canvas"
      :width=table.width
      :height=table.height
    ></canvas>
    <p v-else>No se ha podido cargar el canvas</p>
  </section>
</template>
<script>

export default {
  name: 'TableItem',
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
    };
  },
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas) return;
    this.fillBackground(canvas);
    this.initCells();
  },
  methods: {
    fillBackground(canvas) {
      this.ctx = canvas.getContext('2d');
      if (!this.ctx) return;
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.table.width, this.table.height);
      this.drawGrid();
    },
    drawGrid() {
      for (let y = 0; y < this.table.numCols; y += 1) {
        for (let x = 0; x < this.table.numRows; x += 1) {
          this.ctx.strokeStyle = '#656565';
          const xx = 0 + (this.table.cellSize * x);
          const yy = 0 + (this.table.cellSize * y);
          this.ctx.strokeRect(0 + xx, 0 + yy, this.table.cellSize, this.table.cellSize);
        }
      }
    },
    initCells() {
      for (let i = 0; i < this.table.numCols; i += 1) {
        this.cells[i] = new Array(this.table.numRows).fill(0);
      }
    },
  },
};
</script>

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
      <slot :isPressing="isPressing"></slot>
    </div>
    <p v-else>No se ha podido cargar el canvas</p>
  </section>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'TableItem',
  computed: {
    ...mapState(['table']),
  },
  data() {
    return {
      ctx: null,
      isPressing: false,
    };
  },
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas) return;
    this.fillBackground(canvas);
  },
  methods: {
    fillBackground(canvas) {
      this.ctx = canvas.getContext('2d');
      if (!this.ctx) return;
      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.table.width, this.table.height);
    },
    mousedown() {
      this.isPressing = true;
    },
    mouseup() {
      this.isPressing = false;
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
    background-color: black;
  }
</style>

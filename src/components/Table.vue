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
  mounted() {
    this.fillBackground();
  },
  methods: {
    fillBackground() {
      const { canvas } = this.$refs;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, this.table.width, this.table.height);
    }
  }
};
</script>

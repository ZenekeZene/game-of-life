<template>
  <section>
    <canvas
      v-if="isTableValid"
      ref="canvas"
      class="canvas"
      :width=table.width
      :height=table.height
    ></canvas>
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
  computed: {
    isTableValid() {
      return this.table && this.table.width && this.table.height;
    },
  },
  mounted() {
    const { canvas } = this.$refs;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.table.width, this.table.height);
  },
};
</script>

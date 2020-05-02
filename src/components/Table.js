export default {
  functional: true,
  render: (h, context) => {
    const { table } = context.props;
    if (!table) return null;
    return (
      <section>
        <canvas class="canvas" width={table.width} height={table.height}></canvas>
      </section>
    );
  },
  props: {
    table: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    isTableValid() {
      return this.width && this.height;
    },
  },
};

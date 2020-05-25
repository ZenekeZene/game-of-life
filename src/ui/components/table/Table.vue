<template>
  <section>
    <slot :isPressing="isPressing"></slot>
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
      isPressing: false,
    };
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

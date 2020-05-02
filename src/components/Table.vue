<template>
    <section>
      <canvas class="canvas" width="25" height="25"></canvas>
    </section>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
  }
}
</script>

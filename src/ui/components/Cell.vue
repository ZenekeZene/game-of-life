<template>
  <div
    class="cell"
    :style="{
      'top': `${top}px`,
      'left': `${left}px`,
      'width': `${width}px`,
      'height': `${height}px`,
      'backgroundColor': getColor
    }"
    @mouseover="handLive"
    @click="handClickLive"
  ></div>
</template>
<script>
import { LifeState } from '@/domain/rules/rules';

export default {
  name: 'Cell',
  computed: {
    getColor() {
      return (this.isLive === LifeState.dead) ? '#000000' : 'white';
    },
  },
  props: {
    state: {
      type: Number,
      default: LifeState.dead,
    },
    top: {
      type: Number,
    },
    left: {
      type: Number,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    isPressing: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLive: LifeState.dead,
    };
  },
  methods: {
    handLive() {
      if (this.isPressing) {
        this.isLive = (this.isLive === LifeState.dead ? LifeState.live : LifeState.dead);
      }
    },
    handClickLive() {
      this.isLive = (this.isLive === LifeState.dead ? LifeState.live : LifeState.dead);
    },
  },
};
</script>
<style lang="scss">
  .cell {
    position: absolute;
    display: inline-block;
    box-shadow: inset 1px 1px #333333;
  }
</style>

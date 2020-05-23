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
  >
    <template v-if="isDebug">
      <span class="coords">{{ x }},{{ y }}</span>
      <span class="state">{{ state }}</span>
    </template>
  </div>
</template>
<script>
import { LifeState } from '@/domain/rules/rules';

export default {
  name: 'Cell',
  data() {
    return {
      isDebug: false,
    };
  },
  computed: {
    getColor() {
      return (this.state === LifeState.dead) ? '#000000' : 'white';
    },
    width() {
      return this.size;
    },
    height() {
      return this.size;
    },
    top() {
      return 0 + (this.size * this.y);
    },
    left() {
      return 0 + (this.size * this.x);
    },
  },
  props: {
    state: {
      type: Number,
      default: LifeState.dead,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    size: {
      type: Number,
    },
    isPressing: {
      type: Boolean,
    },
  },
  methods: {
    handLive() {
      if (this.isPressing) {
        const isLive = (this.state === LifeState.dead ? LifeState.live : LifeState.dead);
        this.$emit('update:state', { i: this.x, j: this.y, state: isLive });
      }
    },
    handClickLive() {
      const isLive = (this.state === LifeState.dead ? LifeState.live : LifeState.dead);
      this.$emit('update:state', { i: this.x, j: this.y, state: isLive });
    },
  },
};
</script>
<style lang="scss">
  .cell {
    position: absolute;
    display: inline-block;
    box-shadow: inset 1px 1px #333333;

    .coords {
      position: absolute;
      left: 0;
      font-size: 0.5rem;
      color: white;
    }

    .state {
      font-size: 1rem;
      color: white;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

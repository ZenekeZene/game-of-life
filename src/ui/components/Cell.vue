<template>
  <div
    class="cell"
    :style="{
      'top': `${top}px`,
      'left': `${left}px`,
      'width': `${width}px`,
      'height': `${height}px`,
      'backgroundColor': getColor,
      'opacity': getOpacity
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
      colors: {
        live: 'white',
        dead: 'black',
        trail: 'pink'
      },
      trail: false,
      trailCount: 0,
      trailLengthGenerations: 1
    };
  },
  computed: {
    getColor() {
      if (this.state === LifeState.dead) {
        if (this.trail && this.trailIsEnabled) {
          return this.getOpacity();
        }
        return this.colors.dead;
      }
      return this.colors.live;
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
    isRunning: {
      type: Boolean,
    },
    countGenerations: {
      type: Number,
      default: 0,
    },
    trailIsEnabled: {
      type: Boolean,
      default: false,
    }
  },
  watch: {
    state(value, oldValue) {
      if (this.isRunning) {
        if (value !== oldValue && value !== LifeState.live) {
          this.trail = true;
        }
        if (value) {
          this.trail = false;
          this.trailCount = 0;
        }
      }
    },
    countGenerations() {
      if (this.trail) {
        this.trailCount += 1;
      }
    }
  },
  methods: {
    getOpacity() {
      if (this.trail) {
        const op = 1 - this.trailCount * (this.trailLengthGenerations * 0.1);
        return op > 0 ? `rgba(255,192,203, ${op})` : this.colors.dead;
      }
      return this.colors.trail;
    },
    handLive() {
      if (this.isPressing) {
        const isLive = (this.state === LifeState.dead ? LifeState.live : LifeState.dead);
        this.$emit('update:state', { i: this.x, j: this.y, state: isLive });
      }
      this.trail = false;
    },
    handClickLive() {
      const isLive = (this.state === LifeState.dead ? LifeState.live : LifeState.dead);
      this.$emit('update:state', { i: this.x, j: this.y, state: isLive });
      this.trail = false;
    },
  },
};
</script>
<style lang="scss">
  .cell {
    position: absolute;
    display: inline-block;
    // box-shadow: inset 1px 1px #333333;

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

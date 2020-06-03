<template>
  <div id="app">
    <TableItem :isRunning="isRunning">
      <TheGear
        v-if="cells.length > 0"
        :numCols="table.numCols"
        :numRows="table.numRows"
        :width="table.width"
        :height="table.height"
        :cellSize="table.cellSize"
        :isRunning="isRunning"
        :cellsInput="cells"
        :interval=interval
      />
    </TableItem>
    <div class="tools">
      <input v-model.number="interval" type="range" min="0.02" max="200" value="0.02">
      <div class="control">
        <button color-primary
          @click="isRunning = !isRunning">{{ isRunning ? 'Pause': 'Play' }}</button>
        <button @click="handClear">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableItem from '@/ui/components/table/Table.vue';
import TheGear from '@/ui/components/TheGear.vue';

export default {
  name: 'App',
  components: {
    TableItem,
    TheGear,
  },
  computed: {
    ...mapState(['table']),
  },
  data() {
    return {
      dimension: { numCols: 100, numRows: 100 },
      isRunning: false,
      cells: [],
      interval: 0.02
    };
  },
  methods: {
    ...mapActions(['createANewTable']),
    initCells({ numCols, numRows }) {
      const cells = [];
      for (let i = 0; i < numCols; i += 1) {
        cells.push([]);
        for (let j = 0; j < numRows; j += 1) {
          cells[i][j] = 0;
        }
      }
      cells[51][53] = 1;
      cells[52][53] = 1;
      cells[53][54] = 1;
      cells[52][54] = 1;
      cells[52][55] = 1;
      return cells;
    },
    handClear() {
      this.cells = this.initCells(this.dimension);
      this.isRunning = false;
    },
  },
  async created() {
    await this.createANewTable(this.dimension);
    this.cells = this.initCells(this.dimension);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

.tools {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin: 1rem auto;
}
</style>

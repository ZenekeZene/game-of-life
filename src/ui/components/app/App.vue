<template>
  <div id="app">
    <TableItem :isRunning="isRunning">
      <TheGear
        v-if="table"
        :numCols="table.numCols"
        :numRows="table.numRows"
        :width="table.width"
        :height="table.height"
        :cellSize="table.cellSize"
        :isRunning="isRunning"
        :cellsInput="cells"
      />
    </TableItem>
    <button @click="isRunning = !isRunning">{{ isRunning ? 'Pause': 'Play' }}</button>
    <button @click="handClear">Clear</button>
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
      dimension: { numCols: 10, numRows: 10 },
      isRunning: false,
      cells: [],
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
      cells[1][3] = 1;
      cells[2][3] = 1;
      cells[3][4] = 1;
      cells[2][4] = 1;
      cells[2][5] = 1;
      console.log(cells);
      return cells;
    },
    handClear() {
      this.cells = this.initCells(this.dimension);
    }
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
  margin-top: 60px;
}
</style>

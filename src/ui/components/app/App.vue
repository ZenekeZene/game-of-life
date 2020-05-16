<template>
  <div id="app">
    <TableItem :table="table" />
    <button @click="isRunning = !isRunning">{{ isRunning ? 'Stop': 'Play' }}</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableItem from '@/ui/components/table/Table.vue';
import calculateCellLife from '@/application/calculateCellLife';

export default {
  name: 'App',
  components: {
    TableItem,
  },
  computed: {
    ...mapState(['table']),
  },
  data() {
    return {
      isRunning: false,
    };
  },
  methods: {
    ...mapActions(['createANewTable']),
  },
  created() {
    this.createANewTable({ numCols: 15, numRows: 15 });
    setInterval(() => {
      for (let i = 0; i < this.table.numCols.length; i += 1) {
        const item = this.table.numCols[i];
        for (let j = 0; j < this.table.numRows.length; j += 1) {
          item.splice(j, 1, calculateCellLife({ numNeighbors: 3 }));
        }
        window.sleep(1000);
      }
    }, 1000);
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

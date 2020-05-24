<template>
  <div id="app">
    <TableItem :table="table" :isRunning="isRunning">
      <TheGear
        :numCols="table.numCols"
        :numRows="table.numRows"
        :cellSize="table.cellSize"
        :isRunning="isRunning"
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
      isRunning: false,
    };
  },
  methods: {
    ...mapActions(['createANewTable']),
    handClear() {}
  },
  created() {
    this.createANewTable({ numCols: 50, numRows: 50 });
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

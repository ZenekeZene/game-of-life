<template>
  <div id="app">
    <TableItem :table="table" />
  </div>
</template>

<script>
import TableItem from '@/ui/components/table/Table.vue';
import { createTable } from '@/application/CreateTable';

export default {
  name: 'App',
  components: {
    TableItem,
  },
  data() {
    return {
      table: createTable({ numCols: 20, numRows: 20 }),
    };
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

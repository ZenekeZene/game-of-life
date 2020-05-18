<template>
  <div id="app">
    <TableItem :table="table" />
    <button @click="isRunning = !isRunning">{{ isRunning ? 'Stop': 'Play' }}</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableItem from '@/ui/components/table/Table.vue';

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
    this.createANewTable({ numCols: 3, numRows: 3 });
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

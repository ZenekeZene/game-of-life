<template>
  <div id="app">
    <TableItem :table="table" />
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
  methods: {
    ...mapActions(['createANewTable']),
  },
  created() {
    this.createANewTable();
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

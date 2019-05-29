<template>
    <div>
      <div>
        <Table ref="table" height="350" :loading="loading" :columns="cols" :data="getData" border highlight-row stripe></Table>
      </div>
      <div style="margin-top: 10px;float: right">
        <Button type="primary" @click.prevent="exportCsv">导出</Button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'DataView',
  props: {
    data: {
      required: true
    },
    columns: {
      required: true
    },
    loading: {
      default: false
    }
  },
  computed: {
    getData () {
      return this.data
    }
  },
  data () {
    return {
      cols: this.columns
    }
  },
  methods: {
    exportCsv () {
      this.$refs['table'].exportCsv({
        filename: 'data.csv'
      })
    }
  }
}
</script>

<style scoped>
</style>

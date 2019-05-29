<template>
  <div class="wrap-content">
    <div class="wrap-header">
      <div class="header">Vehicle Statistics</div>
    </div>

    <div class="wrap-input grid-align-center">
      <div class="form-area">
        <Form :label-width="80" ref="queryForm" :model="formItems">
          <FormItem label-for="start-datetime" label="开始时间" prop="startDateTime">
            <DatePicker v-model="formItems.startDateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择开始时间" @on-change="onStartChange" :options="opStart"></DatePicker>
          </FormItem>
          <FormItem label-for="end-datetime" label="结束时间" prop="endDateTime">
            <DatePicker v-model="formItems.endDateTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择结束时间" @on-change="onEndChange" :options="opEnd"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" :loading="loading" @click.prevent="query" shape="circle" icon="ios-search">
              <span v-if="!loading">查询</span>
              <span v-else>查询中....</span>
            </Button>
            <Button @click.prevent="reset" shape="circle">重置</Button>
          </FormItem>
        </Form>
      </div>
    </div>

    <div class="wrap-histogram grid-align-center" style="align-self: center">
      <div v-if="!dataSet">
        暂无数据
      </div>
      <div v-else>
        <Spin size="large" v-if="loading"></Spin>
        <Histogram v-else :data-set="dataSet" :width="width" :height="height" :margin="margin"></Histogram>
      </div>
    </div>

    <div class="wrap-display-data">
      <DataView :data="data" :columns="columns" :loading="loading"></DataView>
    </div>
  </div>
</template>

<script>
import Histogram from './Histogram'
import DataView from './DataView'
import Services from '@/services/'
export default {
  name: 'Home',
  components: {Histogram, DataView},
  data () {
    return {
      loading: false,
      height: 400,
      width: 600,
      margin: {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40
      },
      formItems: {
        startDateTime: '',
        endDateTime: ''
      },
      opStart: null,
      opEnd: null,
      columns: [
        {
          title: '高速名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '车流量',
          key: 'amount',
          align: 'center',
          tooltip: true,
          sortable: true
        }
      ],
      data: [],
      dataSet: null
    }
  },
  methods: {
    query () {
      if (!this.formItems.startDateTime || !this.formItems.endDateTime) {
        this.$Message.info('请选择起止时间')
        return
      }
      this.loading = true
      Services.vehicle.getNumberOfVehicle(this.formItems)
        .then((result) => {
          this.loading = false
          this.data = []
          const data = result.data[Math.floor(Math.random() * 3)]
          this.dataSet = data
          for (let i = 0, len = data.amount.length; i < len; i++) {
            const object = Object.assign({}, {'name': data.name[i]}, {'amount': data.amount[i]})
            this.data.push(object)
          }
        })
        .catch(() => {
          this.loading = false
          this.$Message.error('获取车辆信息失败')
        })
    },
    reset () {
      this.$refs['queryForm'].resetFields()
      this.opStart = null
      this.opEnd = null
    },
    onStartChange (date) {
      const that = this
      this.formItems.startDateTime = date
      this.opEnd = {
        disabledDate (d) {
          const startDate = that.formItems.startDateTime ? new Date(that.formItems.startDateTime).valueOf() : ''
          return d && (d.valueOf() < startDate)
        }
      }
    },
    onEndChange (date) {
      const that = this
      this.formItems.endDateTime = date
      this.opStart = {
        disabledDate (d) {
          const endDate = that.formItems.endDateTime ? new Date(that.formItems.endDateTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : ''
          return d && (d.valueOf() > endDate)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "../less/home";

</style>

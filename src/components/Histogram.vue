<template>
  <div>
    <div class="histogram"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
export default {
  name: 'Histogram',
  props: {
    dataSet: {
      required: true
    },
    height: {
      type: Number,
      default: 400
    },
    width: {
      type: Number,
      default: 400
    },
    margin: {
      type: Object,
      default () {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    },
    color: {
      default () {
        return ['#9966FF', '#6666FF', '#6699FF', '#66FF99', '#DECAFB', '#FF9966', '#CAFEDB', '#FF6666', '#ABCDEF', '#AAAAAA']
      }
    },
    step: {
      type: Number,
      default: 20
    }
  },
  methods: {
    genHistogram () {
      const svg = d3.select('.histogram').append('svg').attr('height', this.height).attr('width', this.width)
      const g = svg.append('g').attr('transform', `translate(${this.margin.top}, ${this.margin.left})`)

      const scale = d3.scaleBand()
        .domain(d3.range(this.dataSet.amount.length))
        .range([0, this.width - this.margin.left - this.margin.right])
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.dataSet.amount)])
        .range([this.height - this.margin.top - this.margin.bottom, 0])
      const xScale = d3.scaleBand()
        .domain(this.dataSet.name)
        .range([0, this.width - this.margin.left - this.margin.right])
      const yAxis = d3.axisLeft(yScale)
      const xAxis = d3.axisBottom(xScale)

      g.append('g').attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
        .call(xAxis)
      g.append('g').call(yAxis)

      g.append('g')
        .selectAll('rect')
        .data(this.dataSet.amount)
        .enter()
        .append('rect')
        .attr('x', (d, i) => {
          return scale(i) + this.step / 2
        })
        .attr('y', () => yScale(yScale.domain()[0]))
        .attr('height', 0)
        .attr('width', () => scale.step() - this.step)
        .attr('fill', (d, i) => this.color[i])
        .transition()
        .duration(1000)
        .delay((d, i) => i * 300)
        .ease(d3.easeBounce)
        .attr('height', (d) => this.height - this.margin.top - this.margin.bottom - yScale(d))
        .attr('y', (d) => yScale(d))

      g.append('g')
        .selectAll('text')
        .data(this.dataSet.amount)
        .enter()
        .append('text')
        .attr('x', (d, i) => scale(i) + this.step / 2)
        .attr('text-anchor', 'middle')
        .attr('y', (d) => yScale(d))
        .attr('dx', () => (scale.step() - this.step) / 2)
        .attr('fill', '#3a4a5a')
        .attr('font-size', 17)
        .text(() => null)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 300)
        .text((d) => d)
    }
  },
  mounted () {
    this.genHistogram()
  }
}
</script>

<style scoped>

</style>

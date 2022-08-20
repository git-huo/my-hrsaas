<template>
  <div class="pagination-container">
    <div class="myPagination">
      <div class="total">
        共{{ total }}条记录 &nbsp;&nbsp; 第{{ totalPagess }} /{{ totalPages }}页
      </div>
      <div>
        <button :disabled="totalPagess==1" @click="currentPageChange(-1)">上一页</button>
        <button :disabled="totalPagess==totalPages" @click="currentPageChange(1)">下一页</button>
      </div>
    </div>
  </div>

</template>
<script>
// 需求：完成分页组件的封装
// 分析组件需要的功能
// 1. 可以显示 数据总数
// 2. 可以显示 当前处于第几页
// 3. 每页可以放下多少条数据 pageSize
// 4. 根据总数 和 pageSize 确定总共有多少页
// 5. 点击上一页和下一页
// 6. 上一页 上一页按钮 当当前页 小于等于1时 按钮变成不可点击
// 7. 下一页 上一页按钮 当当前页 大于等于最后一页时 按钮变成不可点击
export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 0
    },
    totalPagess: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    }
  },
  methods: {
    currentPageChange(val) {
      // console.log(this.totalPagess + val)
      this.$emit('changePageEvent', this.totalPagess + val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container{
  background: #fff;
  padding: 32px 16px;
  .myPagination {
  display: flex;
  justify-content:space-between;
  font-size: 16px;
  padding: 0;
  button {
    width: 70px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
    outline: none;
    border:none;
    color: #606266;
    height: 32px;
    line-height:32px;
  }
  button:disabled {
    background: #edf0f9;
    color: #d8dde3;
    cursor: no-drop;
  }
  .total {
    margin-right: 10px;
    font-weight: 400;
    color: #dbdfe5;
    height: 32px;
    line-height:32px;
  }
}
}

</style>

<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <!-- 前半部分 -->
        <div :class="`before ${type}`">
          <i v-if="showicon" :class="`el-icon-${type}`" />
          <slot name="before" />
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end" align="middle">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'PageTools',
  props: {
    type: {
      type: String,
      default: 'info',
      validate(value) {
        if (['info', 'success', 'warning', 'error'].includes(value)) {
          return true
        }
        return false
      }
    }
  },
  data() {
    return {
      showicon: true
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang='scss'>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
      display: inline-block;
      padding: 0px 10px;
      border-radius: 3px;
      i {
        margin-right: 5px;
      }
      &.info {
        border: 1px solid rgba(145, 213, 255, 1);
        background: rgba(230, 247, 255, 1);
        i {
          color: #409eff;
        }
      }
    }
 }
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
      display: inline-block;
      padding: 0px 10px;
      border-radius: 3px;
      i {
        margin-right: 5px;
      }
      &.info {
        border: 1px solid rgba(145, 213, 255, 1);
        background: rgba(230, 247, 255, 1);
        i {
          color: #409eff;
        }
      }

      &.success {
        border: 1px solid #c2e7b0;
        background: #f0f9eb;
        i {
          color: #67c23a;
        }
      }

      &.warning {
        border: 1px solid #f5dab1;
        background: #fdf6ec;
        i {
          color: #e6a23c;
        }
      }

      &.error {
        border: #fbc4c4;
        background: #fef0f0;
        i {
          color: #f56c6c;
        }
      }
  }
 }
</style>

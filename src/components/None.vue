<template>
  <div class="empty">
    <img src="@/assets/image/empty_noapply.png" class="empty-img" />
    <div class="desc">暂无数据</div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.empty {
  padding-top:60px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .empty-img {
    width: 130px;
    height: 130px;
  }
  .desc {
    font-size: 16px;
    color: #3b3b3b
  }
}
</style>

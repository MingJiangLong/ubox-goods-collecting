<template>
  <div class="empty-component-container">
    <img :src="imgSrc" />
    <template v-if="showEmptyTip">
      <div>未搜索到商品</div>
    </template>
    <template v-else>
      <div>请点击上方搜索栏</div>
      <div>搜索需采集外观的商品</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import empty from "@/assets/image/empty_goods.png"
import empty_search from "@/assets/image/empty_seachgoods.png"
import { computed } from "vue"

const props = defineProps<{
  type: "empty" | "search"
}>()
const imgSrc = computed(() => {
  if (props.type == "search") return empty_search
  return empty
})

const showEmptyTip = computed(() => {
  return props.type == "empty"
})
</script>

<style scoped lang="less">
@img-size: 150px;
.empty-component-container {
  flex: 1;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;

  font-size: 14px;
  font-weight: 500;
  color: #3b3b3b;
}
img {
  width: @img-size;
  height: @img-size;
}
</style>

<template>
  <div class="goods-card-component-container">
    <VanRow align="center">
      <VanRow>
        <img :src="goodsInfo.productUrl" v-if="goodsInfo.productUrl"/>
      </VanRow>
      <div class="desc-item">
        <div>商品ID:{{ goodsInfo.productId }}</div>
        <div>商品名称:{{ goodsInfo.productName }}</div>
        <div>商品条码:{{ goodsInfo.productCode || goodsInfo.barcode }}</div>
        <template v-if="isList">
          <div>申请单据:{{ goodsInfo.formNumber }}</div>
          <div>申请时间:{{ goodsInfo.createTime }}</div>
        </template>
      </div>
      <VanRow align="center">
        <div v-if="props.disable"></div>
        <div v-else-if="!!goodsInfo.dynamicCompanyId" class="collected">
          已采集
        </div>
        <div
          v-else
          class="goods-card-btn"
          @click="onRightBtnClick(props.goodsInfo)"
        >
          申请
        </div>
      </VanRow>
    </VanRow>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import {} from "vue"
const props = defineProps<{
  goodsInfo: Goods
  disable?: boolean
  isList?: boolean
}>()

const goodsInfo = computed(() => {
  return props.goodsInfo
})
const emits = defineEmits<{
  (e: "onBtnClick", item: any): void
}>()

function onRightBtnClick(data: any) {
  emits("onBtnClick", data)
}
</script>

<style scoped lang="less">
@img-size: 60px;
.goods-card-component-container {
  font-size: 14px;
  background: #ffffff;
  border-radius: 8px;
  padding: 18px 12px;
  color: #737373;
  line-height: 24px;
}
img {
  width: @img-size;
  height: @img-size;
  margin-right: 8px;
}
.goods-card-btn {
  color: #ffffff;
  background: var(--ubox-yellow);
  padding: 0 16px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  margin: 0 5px;
}
.collected {
  padding: 0 16px;
  color: var(--ubox-green);
  font-weight: 500;
}
.desc-item {
  flex: 1;
  div {
    font-size: 14px;
    color: #737373;
    font-weight: 400;
  }
}
</style>

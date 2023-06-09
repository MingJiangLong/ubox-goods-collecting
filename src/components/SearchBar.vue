<template>
  <VanRow class="component-search-container" align="center">
    <VanRow class="input-container" align="center">
      <img src="../assets/image/search.png" />
      <input
        placeholder="请输入商品ID、商品条码或商品名称"
        :value="props.value"
        @input="onInput"
      />
    </VanRow>
    <img src="../assets/image/btn_search_close.png" />
  </VanRow>
</template>

<script setup lang="ts">
import {} from "vue"
const emit = defineEmits<{
  (e: "update:value", item: string): void
}>()
const props = defineProps<{ value: string }>()

function onInput(value: any) {
  emit("update:value", `${value?.target?.value ?? ""}`)
}
</script>

<style scoped lang="less">
.component-search-container {
  height: 63px;
  background: #ffffff;
  padding: 0 11px;
}
input {
  border: none;
  background: transparent;
  font-size: 16px;
  outline: none;
  padding-right: 11px;
  flex: 1;
  &::placeholder {
    font-size: 16px;
    color: #bfc2cb;
    text-align: left;
    font-weight: 500;
  }
}
img {
  width: 24px;
  height: 24px;
  margin-left: 5px;
}
.input-container {
  background: #f4f6f8;
  width: 82.7%;
  height: 37px;
  border-radius: 185px;
  padding: 0 8px;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>

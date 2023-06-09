<template>
  <Overlay :show="props.show">
    <div class="submit-success-component">
      <div>
        <img src="@/assets/image/pic_succeed.png" />
        <div>提交成功</div>
        <div>可前往“审核列表”查看结果</div>
        <div @click="onOk">好的</div>
      </div>
    </div>
  </Overlay>
</template>

<script setup lang="ts">
import {} from "vue"
import { Overlay } from "vant"
const props = defineProps<{
  show?: boolean
}>()

const emit = defineEmits<{
  (e: "onOk"): void
}>()

function onOk() {
  emit("onOk")
}
</script>

<style scoped lang="less">
.submit-success-component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 14px;
  color: #3b3b3b;
  text-align: center;
  font-weight: 500;
  div:first-child {
    background: red;
    width: 81%;
    height: 45%;
    border-radius: 8px;
    background: #ffffff;
    div:last-child {
      padding: 14px 55px;
      background: #ff7500;
      border-radius: 22px;
      color: #ffffff;
      margin: 5% 15%;
    }
  }

  img {
    width: 133px;
    height: 114px;
    margin: 30px 0;
  }
}
</style>

<template>
  <div class="image-component-container">
    <div>{{ props.desc }}</div>
    <img
      :src="props.doneUrl ? props.doneUrl : notDoneImage"
      @click="onClick(1)"
    />
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import notDoneImage from "@/assets/image/pic_none.png"
const props = defineProps<{
  doneUrl?: string
  desc?: string
}>()

const emit = defineEmits<{
  (e: "onClick", item: any): void
}>()

function onClick(item: any) {
  emit("onClick", item)
}
</script>

<style scoped lang="less">
@image-size: 100px;
img {
  width: @image-size;
  height: @image-size;
  margin: 12.5px 12.5px 12.5px 0;
}
.image-component-container {
  font-size: 14px;
  font-weight: 500;
}
</style>

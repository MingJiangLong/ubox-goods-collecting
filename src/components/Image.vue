<template>
  <div class="image-component-container">
    <div
      :style="{
        color: props.onlyDisplay ? '#737373' : 'black',
        fontWeight: props.onlyDisplay ? 400 : 500,
      }"
    >
      {{ props.desc }}
    </div>
    <div class="img-container">
      <input
        v-if="!!!props.doneUrl"
        type="file"
        accept="image/*"
        capture="user"
        @input="onInput"
      />
      <img :src="props.doneUrl ? props.doneUrl : notDoneImage" />
      <div class="upload-overlay" v-if="loading">处理中</div>
    </div>
    <ImagePreview v-model:show="showPreview" :image-url="props.doneUrl" />
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import notDoneImage from "@/assets/image/pic_none.png"
import { ref } from "vue"
import ImagePreview from "@/components/ImagePreview.vue"
import { dealPhoto } from "@/http/service"
const props = defineProps<{
  doneUrl?: string
  desc?: string
  onlyDisplay?: true
}>()

const emit = defineEmits<{
  (e: "afterUpload", item: any): void
}>()

async function onInput(e: any) {
  try {
    let file = e.target.files[0]
    loading.value = true
    const formData = new FormData()
    formData.append("file", file)
    let result = await dealPhoto(formData)
    emit("afterUpload", result.data)
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}

const loading = ref(false)
const showPreview = ref(false)
</script>

<style scoped lang="less">
@image-size: 100px;
input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
}
img {
  width: 99px;
  height: 99px;
  border-radius: 8px;
}
.img-container {
  width: @image-size;
  height: @image-size;
  margin: 12.5px 12.5px 12.5px 0;
  position: relative;
  border-radius: 8px;
  border: 1px solid var(--ubox-disable);
}
.image-component-container {
  font-size: 14px;
  font-weight: 500;
}
.upload-overlay {
  width: @image-size;
  height: @image-size;
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  color: #fff;
  text-align: center;
  line-height: @image-size;
}
</style>

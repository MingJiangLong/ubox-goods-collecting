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
        capture="environment"
        @input="onInput"
      />

      <img v-if="props.doneUrl" :src="props.doneUrl" @click="openPreview" />
      <img v-else :src="notDoneImage" />
      <div class="upload-overlay" v-if="loading">处理中</div>
    </div>
    <ImagePreview
      v-model:show="showPreview"
      :image-url="props.doneUrl"
      @on-take-photo-again="onTakePhotoAgain"
    />
  </div>
</template>

<script setup lang="ts">
import {} from "vue"
import notDoneImage from "@/assets/image/pic_none.png"
import { ref } from "vue"
import ImagePreview from "@/components/ImagePreview.vue"
import { dealPhoto } from "@/http/service"
import { showToast } from "vant"
import EXIF from "exif-js"
const props = defineProps<{
  doneUrl?: string
  desc?: string
  onlyDisplay?: true
}>()
const emit = defineEmits<{
  (e: "afterUpload", item: any): void
}>()

function file2DataUrl(file: File) {
  return new Promise<string>(s => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (_e) {
      s(reader.result as string)
    }
  })
}

async function url2File(url: string, fileName: string) {
  const blob = await (await fetch(url)).blob()
  return new File([blob], fileName, { type: blob.type })
}

// function getOri(exif) {
//   return exif["0th"][piexif.ImageIFD.Orientation]
// }

/**
 * 备用方案
 * @param file 
 */
// async function updateOrient(file: File) {
//   const dataUrl = await file2DataUrl(file)
//   var originExif = piexif.load(dataUrl) // 获取exif信息
//   const orientation = getOri(originExif) // orientation
//   if (orientation && orientation != 1) {
//     console.log(orientation)

//     let exif = {}
//     exif[piexif.ImageIFD.Orientation] = 3 // 设置orientation
//     let exifObj = { "0th": exif }
//     let exifbytes = piexif.dump(exifObj)
//     let inserted = piexif.insert(exifbytes, dataUrl) // 写入新的exif
//     return await url2File(inserted, `${new Date().getTime()}_${file.name}`)
//   } else {
//     return file
//   }
// }
async function drawImageInCanvas(
  image: HTMLImageElement,
  fileName: string,
  fileType: string
): Promise<File> {
  const canvasDom = document.createElement("canvas")

  canvasDom.width = image.width
  canvasDom.height = image.height
  const context = canvasDom.getContext("2d")
  if (!context) throw new Error("canvas is null")
  context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight)
  const canvasDataURL = canvasDom.toDataURL(fileType, 0.7)
  return url2File(canvasDataURL, `${new Date().getTime()}${fileName}`)
}
function dealFile(file: File, orientation: number): Promise<File> {
  return new Promise(resolve => {
    if (orientation != 3 && orientation != 6 && orientation != 8)
      return resolve(file)
    file2DataUrl(file).then(dataUrl => {
      const image = new Image()
      image.src = dataUrl
      image.onload = async function () {
        resolve(drawImageInCanvas(image, file.name, file.type))
      }
    })
  })
}
async function getEXIF(file: any) {
  return new Promise(resolve => {
    EXIF.getData(file, function () {
      // @ts-ignore
      const orientation = EXIF.getTag(this, "Orientation")
      resolve(orientation)
    })
  })
}
async function onInput(e: any) {
  try {
    let file = e.target.files[0] as File
    loading.value = true
    const orientation = (await getEXIF(file)) as any
    const newFileInfo = await dealFile(file, orientation)
    const formData = new FormData()
    formData.append("file", newFileInfo)
    let result = await dealPhoto(formData)
    loading.value = false
    emit("afterUpload", result.data)
  } catch (error) {
    showToast(`${props.desc}上传失败,请重试!`)
    loading.value = false
  }
}
function onTakePhotoAgain(e: any) {
  showPreview.value = false
  onInput(e)
}

const loading = ref(false)
const showPreview = ref(false)

function openPreview() {
  if (props.onlyDisplay) return
  showPreview.value = true
}
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

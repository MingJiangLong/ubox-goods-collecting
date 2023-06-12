<template>
  <div class="photo-action-container">
    <video id="video" v-if="showVideo"></video>
    <img id="photo" v-if="!showVideo" :src="imageSrc" />
    <button @click="takePhoto" class="take-photo-btn">拍照</button>
    <canvas id="canvas"> </canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import { ref } from "vue"
import {} from "vue"
const showVideo = ref(true)
const imageSrc = ref()
function startup() {
  const video = document.getElementById("video") as HTMLVideoElement
  const canvas = document.getElementById("canvas")
  // video.setAttribute("width", `100%`)
  // video.setAttribute("height", `100%`)
  video.setAttribute("object-fit", "fill")
  if (!!!video || !!!canvas) return
  navigator.mediaDevices
    .getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    })
    .then(stream => {
      video.srcObject = stream
      video.play()
    })
    .catch(err => {
      console.error(`An error occurred: ${err}`)
    })
}
function takePhoto() {
  const video = document.getElementById("video") as HTMLVideoElement
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  const context = canvas.getContext("2d")
  if (!!!context) return
  context.drawImage(video, 0, 0, window.innerWidth, window.innerHeight)
  const data = canvas.toDataURL("image/png")
  showVideo.value = false
  imageSrc.value = data
}

onMounted(() => {
  startup()
})
</script>

<style scoped lang="less">
.photo-action-container {
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  font-size: 14px;
}

#canvas {
  display: none;
}

video {
  height: 100%;
  width: 100%;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.output {
  width: 340px;
  display: inline-block;
  vertical-align: top;
}

.take-photo-btn {
  position: absolute;
  bottom: 20px;
  width: 70px;
  height: 30px;
  text-align: center;
  left: 50%;
}
</style>

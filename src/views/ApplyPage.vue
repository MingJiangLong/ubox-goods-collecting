<template>
  <main>
    <h1>商品主图</h1>
    <div style="margin: 8px">
      <GoodsCard :goods-info="query" disable />
    </div>
    <h1>六个位置</h1>
    <div class="img-part">
      <Image
        v-for="item in displayImageList.value"
        :desc="item.desc"
        :done-url="item.imageUrl"
        only-display
      />
      <Image
        v-for="item in imageList.value"
        :desc="item.desc"
        :done-url="item.imageUrl"
        @after-upload="e => uploadSuccess(item.imagePosition, e)"
      />
    </div>
  </main>
  <footer>
    <div
      class="bottom-btn"
      :class="canGoOn ? 'bg-able' : 'bg-disable'"
      @click="onSubmit"
    >
      提交
    </div>
  </footer>
  <SubmitSuccess
    :show="showSuccess"
    @on-ok="
      () => {
        router.push('/apply-list')
      }
    "
  />
</template>

<script setup lang="ts">
import GoodsCard from "@/components/GoodsCard.vue"
import { computed, ref } from "vue"
import {} from "vue"
import { useRoute, useRouter } from "vue-router"
import Image from "@/components/Image.vue"
import SubmitSuccess from "@/components/SubmitSuccess.vue"
import { reactive } from "vue"
import { submitOrder } from "@/http/service"
import { hideLoading, showLoading, showTxtToast } from "@/util/toast.js"
const router = useRouter()
const showSuccess = ref(false)
const imageList = reactive({
  value: [
    {
      desc: "正面",
      imageUrl: "",
      imagePosition: 2,
    },
    {
      desc: "背面",
      imageUrl: "",
      imagePosition: 3,
    },
    {
      desc: "左面",
      imageUrl: "",
      imagePosition: 4,
    },
    {
      desc: "右面",
      imageUrl: "",
      imagePosition: 5,
    },
    {
      desc: "上面",
      imageUrl: "",
      imagePosition: 6,
    },
    {
      desc: "下面",
      imageUrl: "",
      imagePosition: 7,
    },
  ],
})
const displayImageList = reactive({
  value: [
    {
      desc: "正面图示例",
      imageUrl: "https://img.ubox.cn/ubox_mdse/m/23/0.jpg",
    },
    {
      desc: "背面图示例",
      imageUrl: "https://img.ubox.cn/ubox_mdse/m/23/0.jpg",
    },
    {
      desc: "左面图示例",
      imageUrl: "https://img.ubox.cn/ubox_mdse/m/23/0.jpg",
    },
    {
      desc: "右面图示例",
      imageUrl: "https://img.ubox.cn/ubox_mdse/m/23/0.jpg",
    },
    {
      desc: "上面图示例",
      imageUrl: "https://img.ubox.cn/ubox_mdse/m/23/0.jpg",
    },
    {
      desc: "下面图示例",
      imageUrl: "https://img.ubox.cn/ubox_mdse/m/23/0.jpg",
    },
  ],
})
const route = useRoute()
const query = computed<Goods>(() => {
  return route.query as any
})

const canGoOn = computed(() => {
  return imageList.value.every(item => item.imageUrl.length)
})

function uploadSuccess(index: number, url: string) {
  let find = imageList.value.find(item => item.imagePosition == index)
  if (!find) return
  find.imageUrl = url
}
async function onSubmit() {
  if (!canGoOn.value) return
  try {
    showLoading()
    await submitOrder(
      query.value.productId,
      imageList.value.map(item => ({
        imageUrl: item.imageUrl,
        imagePosition: item.imagePosition,
      }))
    )
    hideLoading()
    showSuccess.value = true
    // router.push("/apply-list")
  } catch (error: any) {
    console.log(error?.message)
    hideLoading()
    showTxtToast(error?.message)
  }
}
</script>

<style scoped lang="less">
.apply-page-container {
}

h1 {
  font-size: 18px;
  color: #3b3b3b;
  font-weight: 500;
  padding: 0px 16px;
}

footer {
  height: 60px;
  margin: auto;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.bottom-btn {
  height: 50px;
  width: 332px;
  text-align: center;
  line-height: 50px;
  background: #d1d4de;
  border-radius: 25px;
}
.img-part {
  overflow-y: scroll;
  display: grid;
  row-gap: 12.5px;
  column-gap: 12.5px;
  grid-template-columns: repeat(6, 100px);
  background: #ffffff;
  border-radius: 8px;
  padding: 25px 12.5px;
  margin: 8px;
}
.bg-disable {
  background: #d1d4de;
}
.bg-able {
  background: linear-gradient(-54deg, #ff5f27 4%, #ff7500 100%);
}
</style>

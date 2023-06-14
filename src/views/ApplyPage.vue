<template>
  <main>
    <h1>商品主图</h1>
    <div style="margin: 8px">
      <GoodsCard :goods-info="query" disable />
    </div>
    <VanRow align="center">
      <h1 style="flex: 1">六个位置图</h1>

      <div @click="showTakePhotoTip">
        <h9 ><VanIcon name="question-o" />拍摄说明</h9>
      </div>
    </VanRow>
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
import { showToast } from "vant"
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
      desc: "左侧",
      imageUrl: "",
      imagePosition: 4,
    },
    {
      desc: "右侧",
      imageUrl: "",
      imagePosition: 5,
    },
    {
      desc: "顶部",
      imageUrl: "",
      imagePosition: 6,
    },
    {
      desc: "底部",
      imageUrl: "",
      imagePosition: 7,
    },
  ],
})
const displayImageList = reactive({
  value: [
    {
      desc: "正面图示例",
      imageUrl: "https://h5.uboxol.com/new-products-apply/img/front.7569c5c1.png",
    },
    {
      desc: "背面图示例",
      imageUrl: "https://h5.uboxol.com/new-products-apply/img/back.10ed3d25.png",
    },
    {
      desc: "左侧图示例",
      imageUrl: "https://h5.uboxol.com/new-products-apply/img/left.9d6284b6.png",
    },
    {
      desc: "右侧图示例",
      imageUrl: "https://h5.uboxol.com/new-products-apply/img/right.71f014d4.png",
    },
    {
      desc: "顶部图示例",
      imageUrl: "https://h5.uboxol.com/new-products-apply/img/top.dcb8fe3e.png",
    },
    {
      desc: "底部图示例",
      imageUrl: "https://h5.uboxol.com/new-products-apply/img/bottom.b5fce837.png",
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

function showTakePhotoTip() {
  showToast({message:'请将商品实物,放置于白色背景中,拍摄6个位置,系统将自动进行抠图'})
}
</script>

<style scoped lang="less">
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
  display: grid;
  row-gap: 12.5px;
  column-gap: 12.5px;
  grid-template-columns: repeat(6, 100px);
  background: #ffffff;
  border-radius: 8px;
  padding: 25px 12.5px;
  margin: 8px;
  overflow-x: scroll;
}
.bg-disable {
  background: #d1d4de;
}
.bg-able {
  background: linear-gradient(-54deg, #ff5f27 4%, #ff7500 100%);
}
h9{
  font-size: 14px;
  color: #ff7500;
  padding: 4px 15px;
}
</style>

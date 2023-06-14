<template>
  <main>
    <div class="white-bg">
      <h2 :style="{ color: `${statusTxt.color}` }">{{ statusTxt.txt }}</h2>
      <p>申请单据: {{ detailInfo.formNumber }}</p>
      <p>申请时间: {{ detailInfo.createTime }}</p>
    </div>
    <h1>商品主图</h1>
    <div style="margin: 8px">
      <GoodsCard :goods-info="detailInfo" disable />
    </div>
    <h1>六个位置</h1>
    <ul class="white-bg img-list">
      <li v-for="item in imgList" :key="item.imagePosition">
        <p>{{ item.tit }}</p>
        <img v-if="item.imageUrl" :src="item.imageUrl ?? ''" />
        <span v-else>暂无图片</span>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { fetchApplyDetail } from "@/http/service"
import { hideLoading, showLoading, showTxtToast } from "@/util/toast.js"
import GoodsCard from "@/components/GoodsCard.vue"
import { useRoute } from "vue-router"
const route = useRoute()
const { id } = route.params

type Status = {
  txt: string
  color: string
}

const detailInfo: any = ref({})
const statusTxt = computed(() => {
  let sObj: Status = {
    txt: "",
    color: "",
  }
  switch (detailInfo.value.status) {
    case 1:
      sObj = { txt: "审核中", color: "#3b3b3b" }
      break
    case 2:
      sObj = { txt: "被驳回", color: "#ff4027" }
      break
    case 3:
      sObj = { txt: "已通过", color: "#39BF5E" }
      break
  }
  return sObj
})
const imgList = computed(() => {
  let list: { imageUrl: any; imagePosition: any; tit: string }[] = []
  detailInfo.value.imageList?.forEach(
    (item: { imageUrl: any; imagePosition: any }) => {
      const { imageUrl, imagePosition } = item
      if (imagePosition === 1) return
      list.push({
        imageUrl,
        imagePosition,
        tit: imgTit(imagePosition),
      })
    }
  )
  return list
})

onMounted(() => {
  _fetchApplyDetail()
})

const _fetchApplyDetail = async () => {
  try {
    showLoading()
    const res = await fetchApplyDetail(+id)
    if (res.data && Object.keys(res.data).length > 0) {
      detailInfo.value = res.data
      const { barcode, productFullName } = res.data
      detailInfo.value.productCode = barcode
      detailInfo.value.productName = productFullName
    }
    hideLoading()
  } catch (error: any) {
    hideLoading()
    detailInfo.value = {}
    showTxtToast(error?.message)
  }
}

const imgTit = (position: any) => {
  let tit = ""
  switch (position) {
    case 1:
      tit = "主图"
      break
    case 2:
      tit = "正面图"
      break
    case 3:
      tit = "背面图"
      break
    case 4:
      tit = "左侧图"
      break
    case 5:
      tit = "右侧图"
      break
    case 6:
      tit = "顶视图"
      break
    case 7:
      tit = "底视图"
      break
  }
  return tit
}
</script>

<style scoped lang="less">
h1 {
  font-size: 18px;
  color: #3b3b3b;
  font-weight: 500;
  padding: 0px 16px;
}
.white-bg {
  background: #fff;
  margin: 10px;
  padding: 15px 12px;
  border-radius: 8px;
  h2 {
    font-size: 18px;
    margin: 0;
    padding-bottom: 10px;
  }
  p {
    color: #737373;
    font-size: 14px;
    padding: 3px 0;
    margin: 0;
  }
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  li {
    text-align: center;
    width: 33.3%;
    box-sizing: border-box;
    font-size: 14px;
    color: #737373;
    padding-bottom: 20px;
    p {
      padding: 10px 0;
    }
    img,
    span {
      margin: 0 auto;
      width: 100px;
      height: 100px;
      border: solid 1px #ddd;
      border-radius: 8px;
    }
    span {
      display: flex;
      background: #eaeaea;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

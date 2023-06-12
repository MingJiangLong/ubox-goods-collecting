<template>
  <SearchBar v-model:value="searchValue" />
  <main>
    <template v-if="showEmpty">
      <Empty type="empty" />
    </template>
    <template v-else-if="showSearch">
      <Empty type="search" />
    </template>
    <template v-else v-for="item in goodsList.value" :key="item.productId">
      <div style="margin: 8px">
        <GoodsCard @on-btn-click="onApplyBtnClick" :goods-info="item" />
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue"
import GoodsCard from "@/components/GoodsCard.vue"
import { debounce } from "@/util"

import { reactive, ref, watch } from "vue"
import { searchGoods } from "@/http/service"
import { computed } from "vue"
import Empty from "@/components/Empty.vue"
import { useRouter } from "vue-router"
import { hideLoading, showLoading, showTxtToast } from '@/util/toast.js'
const router = useRouter()
const goodsList = reactive<{ value: Goods[] }>({ value: [] })
const searchValue = ref<string>("")

function onApplyBtnClick(data: Goods) {
  router.push({
    name: "Apply",
    query: {
      productId: data.productId,
      productUrl: data.productUrl,
      productCode: data.productCode,
      productName: data.productName,
    },
  })
}

const showEmpty = computed(() => {
  return !!searchValue.value.length && !!!goodsList.value.length
})
const showSearch = computed(() => {
  return !!!searchValue.value.length
})

watch(
  searchValue,
  debounce(() => {search()}, 300),
  { immediate: true }
)

async function search() {
  try {
    if (!searchValue.value.length) {
      return (goodsList.value = [])
    }
    showLoading()
    const result = await searchGoods(searchValue.value)
    goodsList.value = result.data
    hideLoading()
  } catch (error: any) {
    goodsList.value = []
    hideLoading()
    showTxtToast(error?.message)
  }
}
</script>

<style scoped lang="less">
main {
  background: #f4f6f8;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

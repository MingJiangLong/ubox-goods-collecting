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

import { reactive, ref, watchEffect } from "vue"
import { searchGoods } from "@/http/service"
import { computed } from "vue"
import Empty from "@/components/Empty.vue"
import { useRouter } from "vue-router"
import { showToast } from "vant"
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

watchEffect(async () => {
  search()
})

async function search() {
  try {
    if (!searchValue.value.length) {
      return (goodsList.value = [])
    }
    const result = await searchGoods(searchValue.value)
    goodsList.value = result.data
  } catch (error: any) {
    goodsList.value = []
    showToast({ message: error?.message })
  }
}
</script>

<style scoped lang="less">
.goods-search-page {
}
main {
  background: #f4f6f8;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

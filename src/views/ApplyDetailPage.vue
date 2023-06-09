<template>
  <SearchBar v-model:value="searchValue" />
  <vanTabs v-model:active="active" @click-tab="handlerTab">
    <vanTab title="审核中" name="1">
      <GoodsCard v-for="item in goodsList" :key="item.id" :goods-info="item" />
      <None v-if="showNone" />
    </vanTab>
    <vanTab title="被驳回" name="2">
      <GoodsCard v-for="item in goodsList" :key="item.id" :goods-info="item" />
      <None v-if="showNone" />
    </vanTab>
    <vanTab title="已通过" name="3">
      <GoodsCard v-for="item in goodsList" :key="item.id" :goods-info="item" />
      <None v-if="showNone" />
    </vanTab>
  </vanTabs>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { fetchApplyList } from "@/http/service"
import SearchBar from "@/components/SearchBar.vue"
import GoodsCard from "@/components/GoodsCard.vue"
import None from "@/components/None.vue"

const active = ref(0)
const searchValue = ref('')
const goodsList = ref([])
const status = ref(['1'])
const showNone = ref(false)

// onMounted(() => {
//   _fetchApplyList()
// })

watch(
  searchValue,
  () => { _fetchApplyList() },
  { immediate: true }
)

const handlerTab = ({ name }) => {
  status.value = [ name ]
  _fetchApplyList()
}

async function _fetchApplyList() {
  try {
    const res = await fetchApplyList(searchValue.value, status.value)    
    if (res.data && res.data.length) {      
      showNone.value = false
      goodsList.value = res.data
    } else {
      showNone.value = true
      goodsList.value = []
    }
  } catch (error: any) {
    goodsList.value = []
  }
}
</script>

<style scoped lang="less">
</style>

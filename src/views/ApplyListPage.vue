<template>
  <main>
    <SearchBar v-model:value="searchValue" />
    <vanTabs v-model:active="active" @click-tab="handlerTab">
      <vanTab title="审核中" name="1">
        <div class="tab-con">
          <GoodsCard 
            v-for="item in goodsList"
            :key="item.id"
            :goods-info="item"
            @click="toDetail(item.id)"
            disable
            isList
          />
        </div>
        <None v-if="showNone" />
      </vanTab>
      <vanTab title="被驳回" name="2">
        <GoodsCard 
          v-for="item in goodsList"
          :key="item.id"
          :goods-info="item"
          @click="toDetail(item.id)"
          disable
          isList
        />
        <None v-if="showNone" />
      </vanTab>
      <vanTab title="已通过" name="3">
        <GoodsCard 
          v-for="item in goodsList"
          :key="item.id"
          :goods-info="item"
          @click="toDetail(item.id)"
          disable
          isList
        />
        <None v-if="showNone" />
      </vanTab>
    </vanTabs>
  </main>
</template>

<script setup>
import { ref, watch } from "vue"
import { hideLoading, showLoading } from '@/util/toast.js'
import { fetchApplyList } from "@/http/service"
import SearchBar from "@/components/SearchBar.vue"
import GoodsCard from "@/components/GoodsCard.vue"
import None from "@/components/None.vue"
import { debounce } from "@/util"

const active = ref(0)
const searchValue = ref('')
const goodsList = ref([])
const status = ref(['1'])
const showNone = ref(false)

watch(
  searchValue,
  debounce(() => {_fetchApplyList()}, 300),
  { immediate: true }
)

const handlerTab = ({ name }) => {
  status.value = [ name ]
  _fetchApplyList()
}

async function _fetchApplyList() {
  try {
    showLoading()
    const res = await fetchApplyList(searchValue.value, status.value)    
    if (res.data && res.data.length) {      
      showNone.value = false
      goodsList.value = res.data
      goodsList.value.forEach((item) => {
        item.productName = item.productFullName
      })
    } else {
      showNone.value = true
      goodsList.value = []
    }
    hideLoading()
  } catch (error) {
    goodsList.value = []
    hideLoading()
  }
}

import { useRouter } from 'vue-router'
const router = useRouter()

const toDetail = (id) => {
  router.push(`/apply-detail/${id}`)
}
</script>

<style scoped lang="less">
.van-tabs__nav {
  background:none;
}
.tab-con{
  padding: 8px;
  .goods-card-component-container{
    margin-bottom:8px;
  }
}
</style>

import http from ".";

/**
 * 搜索商品
 * @param searchText 
 * @returns 
 */
export function searchGoods(searchText = '') {
  searchText = `${searchText ?? ''}`
  return http.get<any, BEResponse<Goods[]>>(`/GoodsCapture/search${searchText.length ? '/' + searchText : ''}`)
}

/**
 * 获取申请单列表
 * @param searchText 
 * @param status 
 * @returns 
 */
export function fetchApplyList(searchText = '', status = []) {
  return http.post<any, BEResponse<ApplyBase>>('/GoodsCapture/list', {
    searchText,
    status
  })
}

/**
 * 获取商品单详情
 * @param id 
 * @returns 
 */
export function fetchApplyDetail(id: number | string) {
  return http.get<any, BEResponse<ApplyDetail>>(`/GoodsCapture/detail/${id}`)
}

/**
 * 提交采购单
 * @param productId 
 * @param imageList 
 * @returns 
 */
export function submitOrder(productId: number, imageList: UboxImage[]) {
  return http.post('/GoodsCapture/submit', {
    productId,
    imageList
  })
}

/**
 * 抠图接口
 * @param data 
 * @returns 
 */
export function dealPhoto(data: FormData) {
  return http.post<any, BEResponse<string>>('/ivm/segmentImage', data, {
    headers: {
      'Content-Type': "multipart/form-data"
    }
  })
}



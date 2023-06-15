interface Goods {
  brandName: string,
  capacity: number
  capacityName: string
  dynamicCompanyId: number
  gollonId: number
  gollonName: string
  mdseHeight: number
  mdseLong: number
  mdseWidth: number
  packageNum: number
  packageSpecId: number
  packageSpecName: string

  /**
   * 条码
   */
  productCode: string

  /**
   * 商品ID
   */
  productId: number

  /**
   * 商品全称
   */
  productName: string

  /**
   * 主图
   */
  productUrl: string

  /**
   * 商品简称
   */
  shortName: string
  typeIdOne: number
  typeIdThree: number
  typeIdTwo: number
  typeNameOne: string
  typeNameThree: string
  typeNameTwo: string
  /**
   * 申请单号
   */
  formNumber: string
  /** 
   * 申请时间
   */
  createTime: string

  /**
   * 商品条码2(后端字段不统一)
   */
  barcode?: string
}

interface ApplyDetail extends ApplyBase {
  imageList: UboxImage[]
}
interface ApplyBase {
  /**
   * 商品条码
   */
  barcode: string
  createTime: string

  /**
   * 申请单号
   */
  formNumber: string

  /**
   * 申请单ID
   */
  id: number

  /**
   * 商品全称
   */
  productFullName: string

  /**
   * 商品id
   */
  productId: number

  /**
   * 商品简称
   */
  productName: string

  /**
   * 商品主图地址
   */
  productUrl: string

  /**
   * 申请单状态 (审核中:1; 被驳回:2; 审核通过:3)
   */
  status: 1 | 2 | 3
  updateTime: string
}
interface BEResponse<T = any> {
  code: number
  message: string
  data: T
}

// interface UboxImage {
//   imageUrl: string
//   imagePosition: |
//   'FIRST' |
//   'FRONT' |
//   'BACK' |
//   'LEFT' |
//   'RIGHT' |
//   'TOP' |
//   'BOTTOM' |
//   'CONTENT' |
//   'INGREDIENTS'
// }
interface UboxImage {
  imageUrl: string
  imagePosition: number
}

interface Window {
  uboxClient: {
    getToken: (callback: (token: string) => void) => void
  }
}
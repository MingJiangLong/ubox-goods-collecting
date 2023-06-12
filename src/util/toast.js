import { showToast, showLoadingToast, closeToast } from "vant"

export const showLoading = function (message = '加载中...') {
  showLoadingToast({
    forbidClick: true,
    message
  })
}

export const hideLoading = function () {
  closeToast()
}

export const showTxtToast = function (message, icon = '', onClose = () => {}) {
  if (!message) return
  showToast({
    message,
    forbidClick: true,
    duration: 3000,
    icon,
    onClose
  })
}

export const debounce = (func, delay) => {
  let timeout = null
  return () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      func()
    }, delay)
  }
}

export const ykyToken = () => {

  return new Promise((resolve, reject) => {
    try {
      window.uboxClient.getToken(function (token) {
        resolve(token)
      })
    } catch (error) {
      reject(new Error('客户端调用失败，获取不到用户信息'))
    }
  })
}

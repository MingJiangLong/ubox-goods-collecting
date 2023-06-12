export const debounce = (func, delay) => {
  let timeout = null
  return () => {
    if(timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function() {
      func()
    }, delay)
  }
}

export const ykyToken = () => {
  return new Promise((resolve, reject) => {
    try {
      window.uboxClient.getToken(token => {
        console.log('ykytoken', token)
        resolve(token)
      })
    } catch {
      console.log('客户端调用失败')
      reject('客户端调用失败，获取不到用户信息')
    }
  })
}
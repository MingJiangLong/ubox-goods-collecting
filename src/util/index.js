import { isDev } from "@/config"

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

export const appToken = {
  getToken,
  refreshToken
}
export function getToken(refresh = false) {
  if (isDev) return 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZXNjb3J0LWFwaSJdLCJ1c2VyX25hbWUiOiJoZXRpbmciLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNzEyNzkyNjU1LCJ1c2VyRGV0YWlscyI6eyJ1aWQiOjAsInVzZXJuYW1lIjoiaGV0aW5nIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ERUZBVUxUIl0sImVuYWJsZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWV9LCJhdXRob3JpdGllcyI6WyJST0xFX0RFRkFVTFQiXSwianRpIjoiNTJjOTJjYWQtZGYyZS00NjMxLWI3NDctOTU5MDE2NmI2MjQzIiwiY2xpZW50X2lkIjoiZXNjb3J0In0.PatyKhPLJXW9-KzGfYcQ_Gpw-1TBYMWmn3hd_e0ssr058u2eYU2tSdmC32MdWPpYdw4DrbQL9gf1aTm68eTP-1N73moqP_YwVfXmaDCCYiN4RFiZyHpCMvKettnujX-rDPjPgDhq_bX7fJVMqYoFDGGXwN7GjRtw_FOgPbWkP-P_i60vM2IPOeKHzfvpqoXgofAE2fJfHcH8bFC6loLoAlZGEBK9c2RVz0ab3ZUaoMghL45oHdFhd6hBNmgmoLT2wPEBueZIfTrZDd2ggg1tNJLjSLlFz5s9ZX0qdU2kCWgc27NTWzsQKB5Mwo0hk2mSQqCvfmuCsxwjpHe8SxDNZg';
  return `Bearer ${window.ucloud?.token}`;
}
export async function refreshToken() {
  const token = await ykyToken();
  window.ucloud = {
    ...window.ucloud,
    token
  }
}
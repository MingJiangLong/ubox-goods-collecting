import Axios from "axios"
import { API_HOST } from "@/config"
import { appToken } from "@/util"
const http = Axios.create({
  timeout: 1000 * 30,
  timeoutErrorMessage: "请求超时,请稍候重试",
  baseURL: API_HOST,
})
http.interceptors.request.use(async config => {
  try {
    config.headers["Authorization"] = appToken.getToken()
    return config
  } catch (error: any) {
    return Promise.reject(error)
  }
})

http.interceptors.response.use(
  async data => {
    if (data?.data?.code != 200)
      throw new Error((data?.data?.message || data?.data?.msg) ?? "服务器异常")
    return data.data
  },
  async error => {
    let errorCode = error?.response?.status

    let retry = error.config.headers.__retry__ ?? 1
    if (errorCode == 401 && retry >= 1) {
      error.config.headers.__retry__ = retry - 1
      await appToken.refreshToken()
      return http(error?.config)
    }
    return Promise.reject(error)
  }
)

export default http

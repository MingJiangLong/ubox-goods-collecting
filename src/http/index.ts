import { isProd } from '@/util/callWhenDev'
import Axios from 'axios'
import { getToken } from '@/util/token'
const http = Axios.create({
  timeout: 1000 * 15,
  timeoutErrorMessage: 'timeout,try again!',
  baseURL: isProd ? 'https://api.uboxol.com' : 'https://api.dev.uboxol.com',
})
const PREFIX_URL = '/newgoods'


http.interceptors.request.use(async (config) => {
  try {

    // 重试请求的url不需要再加prefix
    if (!config.url?.startsWith(PREFIX_URL)) {
      config.url = `${PREFIX_URL}${config.url}`;
    }
    config.headers['Authorization'] = `Bearer ${await getToken()}`
    return config
  } catch (error: any) {
    return Promise.reject(error)
  }
})

http.interceptors.response.use(async (data) => {
  if (data?.data?.code == 500 && !window.UBOX_TOKEN && !data.config.headers['retry_token_done']) {
    await getToken(true)
    data.config.headers['retry_token_done'] = true
    return http(data.config)
  }
  
  if (data?.data?.code != 200) throw new Error((data?.data?.message || data?.data?.msg) ?? '服务器异常')
  return data.data
}, async (error) => {
  let errorCode = error?.response?.status
  if (errorCode == 401) {
    await getToken(true)
    return http(error?.config)
  }
  return Promise.reject(error)
})


export default http
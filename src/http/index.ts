import { isDev, isProd } from '@/util/callWhenDev'
// import { isProd } from '@/util/callWhenDev'
import Axios from 'axios'
import { ykyToken } from "@/util"
const http = Axios.create({
  timeout: 1000 * 15,
  timeoutErrorMessage: 'timeout,try again!',
  baseURL: isProd ? 'https://api.uboxol.com' : 'https://api.dev.uboxol.com',
})
const PREFIX_URL = '/newgoods'
const DEV_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZXNjb3J0LWFwaSJdLCJ1c2VyX25hbWUiOiJ6ZW5neGlhbmRvbmciLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjg5ODkyNDIxLCJ1c2VyRGV0YWlscyI6eyJ1aWQiOjAsInVzZXJuYW1lIjoiemVuZ3hpYW5kb25nIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ERUZBVUxUIl0sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWV9LCJhdXRob3JpdGllcyI6WyJST0xFX0RFRkFVTFQiXSwianRpIjoiMTdjMDgyYWQtODU5Ny00Y2Y5LTk0MGUtNmU1MTg2ZmVhODFiIiwiY2xpZW50X2lkIjoiZXNjb3J0In0.QmaOpZU4Aq8OdRI3C6we0lSc21RzHgnroLyrdn2c8F99pzhEv7TinsEd5rtpBReePHLSsMwlDttq_apFK81KTLG3A5Qvbhb8vk_NiioSzXbTXBnWP1qBm2OfkHNuRS4avUNMn5C3RCeMvgCcYtmoUKEuzLE-z03-YUlQfr34KiBPKArVIdGM0h9K456oCIxTdD-sIbsrCmesoNUbrN2nDDmhkOZQiQNtQPd7L4CEe_VcsJm8CdJ9Fzs3Sp6n3zEoD6EiccAogM_L35HDZiJcmtvIIurM76JVY-XB4ZdEjOZzcNJ8p621yF8LfvY5vBheQHaqYqHJtjW6ISo37xm1nw'


http.interceptors.request.use(async (config) => {
  try {
    config.url = `${PREFIX_URL}${config.url}`;

    let token = DEV_TOKEN;

    if (!isDev) {
      token = await ykyToken()
    }
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  } catch (error: any) {
    console.log("axios request error:", error);
    return Promise.reject(error)
  }
})

http.interceptors.response.use((data) => {
  if (data?.data?.code != 200) return Promise.reject((data?.data?.message || data?.data?.msg) ?? '服务器异常')
  return data.data
}, error => {
  return Promise.reject(error)
  // let retry = error?.config?.headers?.retry;
  // if (retry == undefined || retry == '0') {
  //   return Promise.reject(error)
  // }

  // error.config.headers.retry -= 1;
  // setTimeout(() => {
  //   return http(error.config)
  // }, 1)

})


export default http
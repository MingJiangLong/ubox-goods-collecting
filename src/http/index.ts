import { isDev, isProd } from '@/util/callWhenDev'
import Axios from 'axios'

const http = Axios.create({
  timeout: 1000 * 6,
  timeoutErrorMessage: '服务端繁忙,稍候重试!',
  // baseURL: isProd ? 'https://api.uboxol.com' : 'https://api.dev.uboxol.com',
})
const PREFIX_URL = '/newgoods'
const DEV_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicGFyYXNvbC1hcGkiLCJ5aWRhLWFkYXB0ZXIiXSwidXNlcl9uYW1lIjoiMTMyNjU3MTUwMjIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjg2Mjk3NzI4LCJ1c2VyRGV0YWlscyI6eyJ1aWQiOjAsInVzZXJuYW1lIjoiMTMyNjU3MTUwMjIiLCJhdXRob3JpdGllcyI6WyJST0xFX0RFRkFVTFQiXSwiZW5hYmxlZCI6dHJ1ZSwiYWNjb3VudE5vbkV4cGlyZWQiOnRydWUsImFjY291bnROb25Mb2NrZWQiOnRydWUsImNyZWRlbnRpYWxzTm9uRXhwaXJlZCI6dHJ1ZX0sImF1dGhvcml0aWVzIjpbIlJPTEVfREVGQVVMVCJdLCJqdGkiOiI1ZWUzNWY2Mi04N2UxLTQ5MGEtOTM4ZS02ZDYwZjk5YzFkYTYiLCJjbGllbnRfaWQiOiJwYXJhc29sIn0.BD6uC4_PrlQfz_8EP6yZAfk7yI5h-EpsGdLq-qLsXU9hdCJ2lOVKbKWqpC1vBe7rqV5vKEYXuVokl8uCiXgcXhQtY5b0ahim-L6TAi1BxgxwYxsTx6tTEolD388SvYzixp35iut_RkO7iBMmDZjGsf1W2poSSkkQ-2fg2cSL1kJu9RhfxfXtd8QIbpm8te8ilRj-ajJig4wCXFPM81NqVrX_J8loUDtDr09VyPsTlmTTmpdMSpJ9aCSSDuhEc_Gs4fcTsopwAeT5J2x4uTmxYYsCohgd9X_iwVQS9JjeWrKb_YXg1ddmUuUPeV1NInV0zagQFpqGeBidtrX3OpeYAg'

http.interceptors.request.use(config => {

  config.url = `${PREFIX_URL}${config.url}`
  config.headers['Authorization'] = `Bearer ${isDev ? DEV_TOKEN : ''}`
  return config
})

http.interceptors.response.use((data) => {
  if (data?.data?.code != 200) throw new Error((data?.data?.message || data?.data?.msg) ?? '服务器异常')
  return data.data
}, error => {
  // TODO:判断是否鉴权失败，失败之后获取token重新发起请求
  let retry = error?.config?.headers?.retry;
  if (retry == undefined || retry == '0') {
    return Promise.reject(error)
  }

  error.config.headers.retry -= 1;
  setTimeout(() => {
    return http(error.config)
  }, 1)

})


export default http
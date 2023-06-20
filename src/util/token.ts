import { ykyToken } from "."
import { isDev } from "./callWhenDev"

const UBOX_TOKEN_KEY = 'UBOX_TOKEN_KEY'

const DEV_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZXNjb3J0LWFwaSJdLCJ1c2VyX25hbWUiOiJ6ZW5neGlhbmRvbmciLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNjg5ODkyNDIxLCJ1c2VyRGV0YWlscyI6eyJ1aWQiOjAsInVzZXJuYW1lIjoiemVuZ3hpYW5kb25nIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ERUZBVUxUIl0sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWV9LCJhdXRob3JpdGllcyI6WyJST0xFX0RFRkFVTFQiXSwianRpIjoiMTdjMDgyYWQtODU5Ny00Y2Y5LTk0MGUtNmU1MTg2ZmVhODFiIiwiY2xpZW50X2lkIjoiZXNjb3J0In0.QmaOpZU4Aq8OdRI3C6we0lSc21RzHgnroLyrdn2c8F99pzhEv7TinsEd5rtpBReePHLSsMwlDttq_apFK81KTLG3A5Qvbhb8vk_NiioSzXbTXBnWP1qBm2OfkHNuRS4avUNMn5C3RCeMvgCcYtmoUKEuzLE-z03-YUlQfr34KiBPKArVIdGM0h9K456oCIxTdD-sIbsrCmesoNUbrN2nDDmhkOZQiQNtQPd7L4CEe_VcsJm8CdJ9Fzs3Sp6n3zEoD6EiccAogM_L35HDZiJcmtvIIurM76JVY-XB4ZdEjOZzcNJ8p621yF8LfvY5vBheQHaqYqHJtjW6ISo37xm1nw'
export async function getToken(refresh = false) {
  if (isDev) return DEV_TOKEN;
  if (!refresh) {
    if (window.UBOX_TOKEN) return window.UBOX_TOKEN;
    const token = localStorage.getItem(UBOX_TOKEN_KEY) ?? ''
    window.UBOX_TOKEN = token
    return token
  } else {
    const token = await ykyToken()
    setToken(token)
    return token
  }
}

function setToken(token: string) {
  window.UBOX_TOKEN = token
  localStorage.setItem(UBOX_TOKEN_KEY, token)
}
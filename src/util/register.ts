import router from "@/router";
import { App } from "vue";
import Vconsole from 'vconsole'
import callWhenDev from "./callWhenDev";
import { Row, Col, Button,Uploader, Tab, Tabs,Icon } from 'vant'
const vantComponent: { [k: string]: any } = {
  Row,
  Col,
  Button,
  Uploader,
  Tab,
  Tabs,
  Icon
}


export default function (app: App<Element>) {
  app.use(router)

  Object.keys(vantComponent).forEach(key => {
    app.use(vantComponent[key])
  })
  callWhenDev(() => {
    app.use(() => new Vconsole())
  })
}
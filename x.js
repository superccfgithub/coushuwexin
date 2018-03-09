import axios from './axios.js'

//前后端接口都统一写在此处

const api = {
  //数据库管理模块
  queryDbSchemaList: params => { return axios.post(`/metadata/dbschema/queryDbSchemaList.do`, params) },
  queryDbSchemaById: params => { return axios.get(`/metadata/dbschema/queryDbSchemaById.do`, { params: params }) },
  updateDbSchema: params => { return axios.post(`/metadata/dbschema/updateDbSchema.do`, params) },
  deleteDbSchemaById: params => { return axios.get(`/metadata/dbschema/deleteDbSchemaById.do`, { params: params }) },

}

export default {
  install: function(Vue) {
    Object.defineProperty(Vue.prototype, '$api', { value: api });
  }
}

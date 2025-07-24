import { createStore } from 'vuex'
import axios from  'axios'

export default createStore({
state: {
  users: [],       // for setUsers
  employees: [],   // for setEmployees
  payslip: [],     // for setPayslip
},
  getters: {
  },
  mutations: {
    setUsers(state ,payload){
      state.users = payload
    },
    setEmployees(state ,payload){
      state.employees = payload
    },
    setPayslip(state ,payload){
      state.payslip = payload
    }
  },
  actions: {
    async getUsers({commit}){
      let data = await axios.get('http://localhost:9090/users')
      
      commit('setUsers' , data.data.users)
    },
    async getEmployees({commit}){
      let data = await axios.get('http://localhost:9090/employees')

      commit('setEmployees' , data.data.employees)
    },
    async getPayslip({commit}){
      let data = await axios.get('http://localhost:9090/payslip')

      commit('setPayslip', data.data.payslip)
    },
    async postEmployees({commit}, payload) {
  try {
    const response = await axios.post('http://localhost:9090/employees', payload);
    commit('setEmployees', response.data.employees);
  } catch (error) {
    return error
  }
}
  },
  modules: {
  }
})

import { createStore } from 'vuex'
import axios from  'axios'

export default createStore({
state: {
  users: [],       // for setUsers
  employees: [],   // for setEmployees
  payslip: [],     // for setPayslip
  performance: [],     // for setPerformace
  attendance: [],     // for setAttendance
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
    },
    setPerformace(state ,payload){
      state.setPerformace = payload
    },
    setAttendance(state ,payload){
      state.attendance = payload
    }
  },
  actions: {
    async getUsers({commit}){
      let data = await axios.get('http://localhost:9090/users')
      
      commit('setUsers' , data.data.users)
    },

    async getPayslip({commit}){
      let data = await axios.get('http://localhost:9090/payslip')
      
      commit('setPayslip', data.data.payslip)
    },

    async getPerformace({commit}){
      let data = await axios.get('http://localhost:9090/performace')
      commit('setPerformace' , data.data.performance)
    },
    async postPerformace({commit}, payload) {
       const response = await axios.post('http://localhost:9090/performace', payload);
       commit('setEmployees', response.data.performance);
    },

  async getAttendance({commit}){
        let data = await axios.get('http://localhost:9090/attendance')
        commit('setAttendance' , data.data.attendance)
      },
 async postAttendance({commit}, payload) {
    const response = await axios.post('http://localhost:9090/attendance', payload);
    commit('setAttendace', response.data.attendance);
 },
    async getEmployees({commit}){
      let data = await axios.get('http://localhost:9090/employees')

      commit('setEmployees' , data.data.employees)
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

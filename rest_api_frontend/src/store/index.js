import { createStore } from 'vuex'
import axios from  'axios'

export default createStore({
state: {
  users: [],       // for setUsers
  employees: [],   // for setEmployees
  payslip: [],     // for setPayslip
  performance: [],     // for setPerformace
  attendance: []    // for setAttendance
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
    setPerformance(state ,performance){
      state.performance = performance
    },
     setAttendance(state, attendance) {
    state.attendance = attendance;
  },
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

  async getPerformance({ commit }) {
  try {
    const response = await axios.get("http://localhost:9090/performance"); // <- PROBABLY MISSPELLED
    commit("setPerformance", response.data);
  } catch (error) {
    // console.error("Error fetching performance:", error);
  }
},
    async postPerformance({commit}, payload) {
       const response = await axios.post('http://localhost:9090/performance', payload);
       commit('setEmployees', response.data.performance);
    },


async getAttendance({ commit }) {
  try {
    const res = await axios.get('http://localhost:9090/attendance');
    console.log("Attendance API result in store:", res.data); // 👈 add this
    commit('setAttendance', res.data.attendance);
  } catch (err) {
    console.error('Error fetching attendance:', err);
  }
},
 async postAttendance({commit}, payload) {
    const response = await axios.post('http://localhost:9090/attendance', payload);
    commit('setAttendance', response.data.attendance);
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

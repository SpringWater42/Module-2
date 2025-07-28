import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = "http://localhost:9090"

export default createStore({
  state: {
    users: [],
    employees: [],
    payslip: [],
    performance: [],
    attendance: [],
  },
  getters: {},
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
    setEmployees(state, payload) {
      state.employees = payload;
    },
    setPayslip(state, payload) {
      state.payslip = payload;
    },
    setPerformance(state, payload) {
      state.performance = payload;
    },
    setAttendance(state, payload) {
      state.attendance = payload;
    },
  },
  actions: {
    // USERS
    async getUsers({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/users`);
        commit('setUsers', response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async postUsers({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/users`);
        commit('setUsers', response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },


    // PAYSLIP
    async getPayslip({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/payslip`);
        commit('setPayslip', response.data.payslip);
      } catch (error) {
        console.error("Error fetching payslips:", error);
      }
    },

    async postPayslip({ commit }, payslipData) {
      try {
        const response = await axios.post(`${API_URL}/payslip`, payslipData);
        commit('setPayslip', response.data.payslip);
        return response;
      } catch (error) {
        return Promise.reject(error);
      }
    },

async deletePayslip({ commit }, employeeId) {
  try {
    await axios.delete(`${API_URL}/payslip/${employeeId}`);
  } catch (err) {
    console.error("Vuex deletePayslip error:", err);
    throw err;
  }
},

    // PERFORMANCE
    async getPerformance({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/performance`);
        commit('setPerformance', response.data.performance);
      } catch (error) {
        console.error("Error fetching performance:", error);
      }
    },

    async postPerformance({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/performance`, payload);
        commit('setPerformance', response.data.performance);
      } catch (error) {
        console.error("Error posting performance:", error);
      }
    },

    async patchPerformance({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/performance`, payload);
        commit('setPerformance', response.data.performance);
      } catch (error) {
        console.error("Error patching performance:", error);
      }
    },

      async deletePerformance({ commit }, id) {
    try {
      await axios.delete(`http://localhost:9090/performance/${id}`);
    } catch (error) {
      console.error("Error in deletePerformance:", error);
      throw error;
    }
  },

    // ATTENDANCE
    async getAttendance({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/attendance`);
        commit('setAttendance', response.data.attendance);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    },

    async postAttendance({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/attendance`, payload);
        commit('setAttendance', response.data.attendance);
      } catch (error) {
        console.error("Error posting attendance:", error);
      }
    },

    async patchAttendance({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/attendance`, payload);
        commit('setAttendance', response.data.attendance);
      } catch (error) {
        console.error("Error patching attendance:", error);
      }
    },
async deleteAttendance({ commit }, id) {
  try {
    const response = await axios.delete(`${API_URL}/attendance/${id}`);
    // Optionally update state if your backend returns updated attendance list
    if (response.data.attendance) {
      commit('setAttendance', response.data.attendance);
    }
    return response;
  } catch (error) {
    console.error("Error deleting attendance:", error);
    throw error;
  }
},
    // EMPLOYEES
    async getEmployees({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/employees`);
        commit('setEmployees', response.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    },

    async postEmployees({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/employees`, payload);
        commit('setEmployees', response.data.employees);
      } catch (error) {
        console.error("Error posting employees:", error);
        return error;
      }
    },

    async patchEmployees({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/employees`);
        commit('setEmployees', response.data.employees);
      } catch (error) {
        console.error("Error patching employees:", error);
      }
    },

 async deleteEmployee({ dispatch }, employeeId) {
    try {
      await axios.delete(`http://localhost:9090/employees/${employeeId}`);
      dispatch('getEmployees'); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  }
}
});

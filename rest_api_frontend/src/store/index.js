import { createStore } from 'vuex'
import axios from 'axios'

const API_URL = "http://localhost:9090"

export default createStore({
  state: {
    employees: [],
    payslip: [],
    performance: [],
    attendance: [],
    users: [],
  },
  getters: {
      allUsers: (state) => state.users
  },
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
     get_users(state, payload) {
            state.users = payload
        },
        setUsers(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);
    }
  },
  actions: {
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

 async deletePayslip({ dispatch }, id) {
    try {
      await axios.delete(`${API_URL}/payslip/${id}`); // ✅ Must match your route
      dispatch("getPayslip");
    } catch (error) {
      console.error("Error deleting payslip:", error);
      throw error;
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

     async deletePerformance({ dispatch }, id) {
    try {
      await axios.delete(`http://localhost:9090/performance/${id}`);
      // Refresh list after deletion
      dispatch('getPerformance');
    } catch (error) {
      console.error("Error deleting performance:", error);
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
async updateEmployee({ commit }, updatedEmployee) {
return axios.put(`${API_URL}/employees/${updatedEmployee.employee_id}`, updatedEmployee);
},

async postEmployees({ commit }, employee) {
  try {
    const res = await axios.post(`${API_URL}/employees`, employee);
    return res; // ✅ important
  } catch (err) {
    console.error("Failed to post employee", err);
    throw err;
  }
},

// Example delete
async deleteEmployee({ commit }, employee_id) {
  try {
    const res = await axios.delete(`${API_URL}/employees/${employee_id}`);
    return res;
  } catch (err) {
    console.error("Failed to delete employee", err);
    throw err;
  }
}
},

    async fetch_users_info({ commit }) {
      try {
        const response = await axios.get('http://localhost:9090/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
         async fetch_users_password(payload) {
            return await axios.get('http://localhost:9090/login_password', payload)
        },
      async add_users({ dispatch }, payload) {
            await axios.post('http://localhost:9090/login', payload)
            dispatch("fetch_users_info")
        },

  check_password: async ({ }, payload) => {
            try {
                const response = await axios.post('http://localhost:9090/check_password', payload);
                console.log('Password check result:', response.data.status);
                return response.data.status; // true or false
            } catch (error) {
                console.error('check_password error:', error);
                return false; // fail-safe fallback
            }
        }
    },
);

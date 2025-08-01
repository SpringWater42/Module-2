import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = "http://localhost:9090";

export default createStore({
  state: {
    users: [],
    employees: [],
    payslip: [],
    performance: [],
    attendance: [],
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
  },
  actions: {
    // EMPLOYEES
    async getEmployees({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/employees`);
        commit('setEmployees', response.data.employees);
        return response;
      } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
      }
    },
    async postEmployees({ dispatch }, employee) {
      try {
        const response = await axios.post(`${API_URL}/employees`, employee);
        await dispatch('getEmployees');
        return response;
      } catch (error) {
        console.error("Failed to post employee", error);
        throw error;
      }
    },
    async updateEmployee({ dispatch }, updatedEmployee) {
      try {
        const response = await axios.put(`${API_URL}/employees/${updatedEmployee.employee_id}`, updatedEmployee);
        await dispatch('getEmployees');
        return response;
      } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
      }
    },
    async deleteEmployee({ dispatch }, employee_id) {
      try {
        const response = await axios.delete(`${API_URL}/employees/${employee_id}`);
        await dispatch('getEmployees');
        return response;
      } catch (error) {
        console.error("Failed to delete employee", error);
        throw error;
      }
    },

    // PAYSLIP
    async getPayslip({ commit }) {
      try {
        const response = await axios.get(`${API_URL}/payslip`);
        commit('setPayslip', response.data.payslip);
        return response;
      } catch (error) {
        console.error("Error fetching payslips:", error);
        throw error;
      }
    },
    async postPayslip({ dispatch }, payslipData) {
      try {
        const response = await axios.post(`${API_URL}/payslip`, payslipData);
        await dispatch('getPayslip');
        return response;
      } catch (error) {
        throw error;
      }
    },
    async patchPayslip({ dispatch }, payslipData) {
      try {
        const response = await axios.patch(`${API_URL}/payslip`, payslipData);
        await dispatch('getPayslip');
        return response;
      } catch (error) {
        throw error;
      }
    },
    async deletePayslip({ dispatch }, id) {
      try {
        const response = await axios.delete(`${API_URL}/payslip/${id}`);
        await dispatch('getPayslip');
        return response;
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
        return response;
      } catch (error) {
        console.error("Error fetching performance:", error);
        throw error;
      }
    },
    async postPerformance({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/performance`, payload);
        // optionally dispatch to refresh list if needed
        return response;
      } catch (error) {
        console.error("Error posting performance:", error);
        throw error;
      }
    },
    async patchPerformance({ commit }, payload) {
      try {
        const response = await axios.put(`${API_URL}/performance/${payload.id}`, payload);
        // optionally dispatch to refresh list if needed
        return response;
      } catch (error) {
        console.error("Error patching performance:", error);
        throw error;
      }
    },
    async deletePerformance({ dispatch }, id) {
      try {
        const response = await axios.delete(`${API_URL}/performance/${id}`);
        await dispatch('getPerformance');
        return response;
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
        return response;
      } catch (error) {
        console.error('Error fetching attendance:', error);
        throw error;
      }
    },
    async postAttendance({ commit }, payload) {
      try {
        const response = await axios.post(`${API_URL}/attendance`, payload);
        commit('setAttendance', response.data.attendance);
        return response;
      } catch (error) {
        console.error("Error posting attendance:", error);
        throw error;
      }
    },
    async patchAttendance({ commit }, payload) {
      try {
        const response = await axios.put(`${API_URL}/attendance/${payload.id}`, payload);
        // optionally refresh attendance list
        return response;
      } catch (error) {
        console.error("Error patching attendance:", error);
        throw error;
      }
    },
    async deleteAttendance({ dispatch }, id) {
      try {
        const response = await axios.delete(`${API_URL}/attendance/${id}`);
        await dispatch('getAttendance');
        return response;
      } catch (error) {
        console.error("Error deleting attendance:", error);
        throw error;
      }
    },
  }
});

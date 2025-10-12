import api from "../utils/api.js";

const departmentServices = {
    getDepartments: async (page, search) => await api.get(`/departments?page=${page}&search=${search}`),

    getDepartmentsDropdown: async () =>  await api.get(`/departments/all`),

    getDepartmentById: async (id) => await api.get(`/departments/${id}`),

    createDepartment: async (data) => await api.post("/departments", data),

    updateDepartment: async (id, data) => await api.put(`/departments/${id}`, data),

    deleteDepartment: async (id) => await api.delete(`/departments/${id}`),


};

export default departmentServices;

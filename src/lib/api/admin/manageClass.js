import instance from "../instance";

const index = () => instance.auth.get('/admin/class')
const store = (data) => instance.auth.post(`/admin/class`, data)
const update = (id, data) => instance.auth.put(`/admin/class/${id}`, data)
const deleted =(id) => instance.auth.delete(`/admin/class/${id}`)

const apiManageClass ={
    index,
    store,
    update,
    deleted
}

export default apiManageClass
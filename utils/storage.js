const TODO_STORAGE_KEY = "TODOS"

export default {
    get(){
        // localStorage.getItem(TODO_STORAGE_KEY)): trả về mảng
        return JSON.parse(localStorage.getItem(TODO_STORAGE_KEY)) || [];
    },
    set(todos) {
        localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    },
}
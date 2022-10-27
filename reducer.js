import storage from "./utils/storage.js"

// Dispatch action sẽ đẩy sang đây

const init = {
    // lấy dữ liệu từ Storage (ban đầu chưa nhập không có chi hêt)
    todos: storage.get(),
    // Các trạng thái lọc để hiển thị item
    filter: "all", // mặc định là All
    filters: {
        all: () => true, // trả về hết cả hoàn thành và chưa hoàn thành
        active: todo => !todo.completed, // trả về  todo chưa hoàn thành
        completed: todo => todo.completed, // trả về  todo đã hoàn thành
    },
    editIndex: null,
}

const actions = {
    // Chức năng thêm todoItem, từ input Header
    // key của object này là add
    // add: function add({todos}, title) viết gọn lại theo ES6
    add({todos}, title)
    {
        // state chính là innit, destructuring {todos} sẽ lấy được todos là key như trong init
        // push thêm phần tử  là object mới vô mảng todos
        // todos = [
        //     {
        //         title,
        //         completed: false,
        //     },
        //     {
        //         title,
        //         completed: true,
        //     }
        // ]

        if (title)
        {
            todos.push({title, completed: false})
            storage.set(todos)
        }
    },

    // Chức năng click vô checkbox item, set công việc hoàn thành hay chưa
    toggle({todos}, index)
    {
        // todos[index].completed ? todos[index].completed = false : todos[index].completed = true
        // Cách 2
        const todo = todos[index]
        todo.completed = !todo.completed
        // object dạng reference dữ liệu nên todos tự update
        storage.set(todos)
    },

    toggleAll({todos}, checkedState)
    {
        todos.forEach(todo => todo.completed = checkedState)
        checkedState = !checkedState
    },

    delete({todos}, index)
    {   
        // Dùng splice xóa một phần tử khỏi mảng bằng index
        todos.splice(index, 1)
        storage.set(todos)
    },
    switchFilter(state, filter_click)
    {
        // Set lại filter khi onclick vào filter đó.
        state.filter = filter_click
    },
    clearCompleted(state)
    {
        // Không thể dùng todos tự update state bên ngoài được khác với field của todos ở toggle.
        state.todos = state.todos.filter(state.filters.active)
        // Lưu lại update sau khi F5
        storage.set(state.todos)
    },
    startEdit(state, index)
    {
        state.editIndex = index
    },

    endEdit(state, title)
    {
        if (state.editIndex !== null)
        {
            if(title)
            {
                state.todos[state.editIndex].title = title
                storage.set(state.todos)
            }
            else
            {
                this.delete(state, state.editIndex)
            }
            state.editIndex = null
        }
    }

}

export default function reducer(state=init, action, args)
{
    // Ở đây có thể dùng bất cứ cách nào mễn đáp ứng được logic của chúng ta và trả về state mới
    // Ở đây thay switch-case bằng dùng object và function như bên dưới.

    // Logic:
        // Nếu có action thì sẽ chạy hàm cùng tên với action ở object actions.
        // Nếu không có key giống tên hàm action trong object actions thì return lại state trước đó
    // ...args đối số => spread giải mảng title thành string.
    // Vì object có giá trị của key là tham chiếu(chung địa chỉ) nên state sẽ tự update lại
    // Nên hàm  actions[action](state, ...args) không cần return lại state
    actions[action] && actions[action](state, ...args)

    return state
    
}
import html from "../core.js";
import { connect } from "../store.js"; 
import ToDoItem from "./ToDoItem.js";

const connector = connect()

// Có connect rồi nên lấy trực tiếp dữ liệu từ Store
function ToDoList({todos, filter, filters})
{   
    return html`
    <section class="main">
        <input id="toggle-all" 
                    class="toggle-all" 
                    type="checkbox"
                    onchange="dispatch('toggleAll', this.checked)"
                    ${false /** thêm thuộc tính checked khi tất cả item được check */}
                    ${todos.every(filters.completed) && "checked"}
                    >

        <label for="toggle-all">
            Mark all as complete
        </label>
        <ul class="todo-list">
            ${todos.filter(filters[filter]).map((todo, index) => ToDoItem({todo, index}))}
        </ul>
    </section>
    `
}

export default connector(ToDoList)
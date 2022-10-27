import { createStore } from "./core.js";
import reducer from "./reducer.js";
import withLogger from "./logger.js"
// Viết hàm withLogger(đổi tên từ export default logger) bọc bên ngoài nhận đối số  và trả về i như reducer nhưng thêm log bên trong. để quan sát.
const {attach, connect, dispatch} = createStore(withLogger(reducer))

window.dispatch = dispatch

export {attach, connect}
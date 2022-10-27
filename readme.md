# Các chú ý khi làm project (copy lại html) sử dụng thư viện.
+ Nắm cấu trúc file html và các chức năng chính trước khi phân chia component 
+ Cách nội suy gọi function các component vào trong App(), copy các view html vào trong từng component tương ứng.
+ Import từng component vào trong file App.

+ Sau khi copy xong Views ta phân tích các logic để  làm chức năng.
+ Làm những công việc cần làm trước khi vào chi tiết chức năng:
    + Xây dựng Store để lưu dữ liệu.(Tạo init trong reducer vài dữ liệu để test trước)
    + Thiết lập chức năng render để view lên dữ liệu từ Store test trước.
    + Rồi đến các chức năng như thêm , sửa , xóa, ...

+` Mỗi component phải import thèn connect để lấy dữ liệu từ Store`

# Xây dựng chức năng trong project
+ Flow khi thêm một chức năng:
`Phân tích chức năng -> tác động lên thẻ html nào thông qua DOM event nào -> Khi đó sẽ dispatch hành động gì -> viết logic cho hành động - lưu dữ liệu mới cho Store trong hàm dispatch(reducer.js)`

## Xây dựng Store và phần render để view dữ liệu init lên test trước
+ Dữ liệu nằm trong ToDoItem lấy ra từ ToDoList  hay connect() trực tiếp từ Store? - Lấy từ ToDoList rồi truyền vô ToDoItem :) mới đúng logic.

+ Sau khi connect tới Store nên console xem dữ liệu rồi lấy ra.

## Viết phần middleware logger để thấy state trước và sau khi dispatch trong Store.
 Viết hàm withLogger(đổi tên từ export default logger) nhận đối số  và trả về i như reducer nhưng thêm log bên trong.

## Khi F5 lại mất dữ liệu trong Store nên viết một module để lưu lại dữ liệu trong LocalStorage (RAM) trong JS.
+ localStorage là một kiêủ dữ liệu Storage với các phương thức như : getItem, removeItem, setItem ,...
+ Ở đây dùng getItem và setItem để  lấy và lưu dữ liệu vào viết trong util/storage.js.
+ Trong reducer sẽ dùng thèn storage này với get(), và set().
+ Dữ liệu trong localStorage lưu trong RAM rồi nên dù tắt VS, chrome  và bật lại thì dữ liệu này vẫn còn, chỉ khi nào tắt máy mới reset lại.
+ Kiểm tra dữ liệu đã lưu vào localStorage hay chưa bằng tab Application trên dev tools.(có thể xóa trực tiếp dữ liệu ở đây mà không cần tắt máy(Clear ALl || Delete Session))


## Chức năng thêm todoItem 
+ Khi gõ chữ vào thẻ input của  header ,xong blur(onblur) ra ngoài hoặc enter(onkeyup: nhấn phím enter xong nhất lên) sẽ tự động thêm vào todoList.

+ Khi thực hiện một hành động như onkeyup, blur, ... sẽ luôn nhận lại một sự kiện trả về tất cả thông tin của hành động đó. Console để xem:  onkeyup="console.log(event)"

+ `onkeyup="event.keyCode === 13 && dispatch('add', this.value.trim())"` : kiểm tra có sự kiện nhấn phím enter trong thẻ input , nếu có dispatch actions add và lưu dữ liệu vào Store.

## Chức năng khi không có công việc gì thì ẩn luôn phần main và footer.
`${todos.length > 0 && ToDoList()}`


## Chức năng nếu check vào item thì gạch chéo công việc (công việc đã hoàn thành )và lưu lại.

+ Bắt sự kiện onchange (vì toggle bấm vô check, bấm vô nữa không check) trên input checkbox.
+ Trong todoItem cần truyền thêm index để biết index của Item nào truyền vào dispatch xử lí.
+ ?: Tại sao log ra dữ liệu trước khi toggle và sau khi toggle lại giống nhau?


## Chức năng bấm vô input checkbox toggle-all(nằm trong todoList) thì checked hết, bấm lại thì bỏ check hết
+ CSS bằng thẻ label::before với content: "<" lạ.
+ Nên onchange trên thẻ label.? Sai rồi - event onchange chỉ có trên thẻ input.
+ Để biết là trạng thái đang checked hay chưa ta truyền thêm thuộc tính this.checked(trả về true hoặc fase) để vào dispatch xử lí.

## Chức năng xóa
+ Xóa một phần tử mảng qua index dùng array.splice(index, số lượng phần tử xóa)

## Chức năng filter 
+ Dùng vòng lặp với key của filters để hiển thị các filter. Trong vòng lặp nếu chọn filter nào thì lấy key của filter đó để set lại filter trong Store.

+ Dùng Object.keys(myObject) để lấy về mảng các key của object.
+ Cứ sài html là phải qua hàm html để xử lí các logic loại bỏ.
+ Cắt mảng thành mảng con từ phần tử thứ hai: array.slice(1).
+ onclick="dispatch('switchFilter', '${key_filter}')" : cần truyền vô dispatch là một chuỗi nên phải có dâu '' ngoài ${}.
+ Trong hiển thị item ở todoList không hiển thị hết mà hiển thị theo điều kiện lọc.

## Chức năng ẩn hiện nút clear và bấm vào xóa những thèn đã checked.
+ Khi nào thì dùng storage.set lại todos(không hiển thị liền phải F5 lại), khi nào truyền state vào để gán lại.(hiển thị liền) - À : View chỉ đọc dữ liệu đang có trong state để hiển thị lên, nên state phải gán lại khi thay đổi dữ liệu. Còn dữ liệu đó có được thay đổi sau khi F5 hay không là mới dùng storage để lưu vào RAM. Thèn storage không liên quan gì đến quy trình Store -> View.
+ Nói chung: dữ liệu thay đổi cập nhật lại sau khi có actions phải dùng state để update. Dữ liệu update đó có được lưu lại sau khi F5 hay không phải dùng storage.

## Chức năng sửa Item khi double click vào Item
+ Khi double click vào Item thì sẽ thêm class editing vào thẻ li <li class="${todo.completed && 'completed'} editing">.
+ Dùng thêm biến editIndex(như cờ check) xem editIndex === index của Item nào thì thêm class editing cho Item đó.



# Các skill code learn. 
+ Quan trọng:
    + Code trong thuộc tính sự kiện và các thuộc tính khác là khác nhau. Các thuộc tính khác luôn phải trả về string. Còn trong các thuộc tính event thì viết code thoải mái.(Cách 1 DOM event)
    + class="${todo.completed && 'completed'}" : thuộc tính  khác
    + onchange="dispatch('toggle', ${index})" : thuộc tính event thẻ , gán cho sự kiện bằng một hành động nào đó(cách 1 DOM event)

    + Vì nội dung bên trong teamplate `...` đều là kiểu string nên tất cả logic code trong template phải được viết trong ${}, muốn lấy giá trị hay gọi hàm đều phải nội suy thông qua ${}. Nếu không nó chỉ là một chuỗi string.

+ Array:
    + Xóa một phần tử mảng qua index dùng array.splice(index, số lượng phần tử xóa)
    + Cắt mảng thành mảng con từ phần tử thứ hai: array.slice(1).

+ Cách copy html có sẵn và render HTML đã copy bằng JS qua hàm html.

+ Cách lấy data từ Store ở todoList rồi truyền qua todoItem trong map().

+ Dùng Enhanced object literals với hàm , viết gọn khi tên key và tên function giống nhau. Key trong object là tham chiếu nên khi object thay đổi , gía trị sẽ được thay đổi bằng giá trị mới.(không cần return)

+ Biết cách viết group logger để xem dữ liệu trước và sau khi thay đổi trong Store.

+ Biết cách viết để lưu và lấy dữ liệu từ localStorage.

+ Một thẻ input ở trạng thái checked thì phải có thuộc tính checked cho nó.
` <input ${todo.completed && "checked"}> `


# DOM Event trong project
+ Cách viết code để  kiểm tra sự kiện và gọi hàm dispatch trong các thuộc tính event.(Dùng cách 1 trong DOM event để gán một nhiệm vụ gì đó cho thuộc tính event ngay trong thẻ mở của thẻ).

+ Chức năng bấm vô thì chọn, bấm tiếp bỏ chọn (toggle) thì dùng event onchange.

+ Click 2 lần thì dùng event ondblclick.


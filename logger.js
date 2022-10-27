export default function logger(reducer)
{
    // trả về một function i như thèn reducer(nhận state cũ return lại state mới) chỉ thêm log bên trong.
    return (prevState, action, args) => {
        console.group(action)
        console.log("prevState: ",  prevState)
        console.log("args: ",  args)
        const nextState = reducer(prevState, action, args);
        console.log("nextState: ",  nextState)
        console.groupEnd()
        return nextState
    }
}
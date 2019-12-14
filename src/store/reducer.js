import * as constants from './actionTypes';

const initialState = {
    title: '基于redux-thunk实现Todo案例',
    todos: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        // 获取所有数据
        case constants.GET_TODO_ITEM:
            return { ...state, ...{ todos: action.todos } };
        // 删除
        case constants.DELETE_TODO_ITEM:
            const temps = state.todos;
            let tempArr = [];
            temps.forEach((todo, index) => {
                tempArr.push(todo);
                if (todo.id === action.id) {
                    tempArr.splice(index, 1);
                }
            });
            return { ...state, ...{ todos: tempArr } };
        // 修改
        case constants.UPDATE_TODO_ITEM:
            const tempTodos = state.todos;
            let updateTodo = [];
            tempTodos.forEach((todo, index) => {
                updateTodo.push(todo);
                if (todo.id === action.id) {
                    todo.content = action.content;
                    updateTodo[index] = todo;
                }
            })
            return { ...state, ...{ todos: updateTodo } };
        // 新增
        case constants.ADD_TODO_ITEM:
            const tempArrs = state.todos;
            let resultArr = [...tempArrs,action.todo];
            return { ...state,...{ todos: resultArr } };
        default:
            return state;
    }
}
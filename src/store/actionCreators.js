import * as constants from './actionTypes';
import { getTodos } from './../services';


/**
 * 点击回车键
 */
export const mouseEnter = () => ({
    type: constants.MOUSE_ENTER
})

const initTodos = todos => ({
    type: constants.GET_TODO_ITEM,
    todos
})

/**
 * 初始化todos数据
 */
export const getTodosAction = () => {
    return dispatch => {
        getTodos().then(res => {
            if (res.status === 200) {
                dispatch(initTodos(res.items))
            }
        })
    }
}

/**
 * 删除
 * @param {id} id 
 */
export const deleteHandler = id => ({
    type: constants.DELETE_TODO_ITEM,
    id
});

/**
 * 修改
 * @param {id} id 
 * @param {content} content 
 */
export const updateHandler = (id,content) =>({
    type: constants.UPDATE_TODO_ITEM,
    id,
    content
});



/**
 * 新增
 * @param {todos} todo
 */
export const addHandler = todo => ({
    type: constants.ADD_TODO_ITEM,
    todo
});
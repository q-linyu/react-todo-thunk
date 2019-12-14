import api from './../api';

/**
 * 获取所有todo的列表数据
 */
export const getTodos = () => api('/mock/todo.json');
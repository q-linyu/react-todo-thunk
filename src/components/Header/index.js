import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../../store/actionCreators';
import { Input, Button, Icon, Typography, message } from 'antd';
const { Title } = Typography;

class Header extends React.Component {
    constructor(props) {
        super(props);
        // 绑定ref
        this.content = React.createRef();
    }

    render() {
        const { title } = this.props;
        return (
            <div>
                <Title level={3} style={{ marginBottom: 30 }}>{title}</Title>
                <label>请输入内容：</label>
                <Input
                    type="text"
                    placeholder="请输入内容"
                    ref={this.content}
                    style={{ width: 300, marginRight: 10 }}
                />
                <Button type="primary" onClick={e => { this._addHandler(e) }}>
                    <Icon type="plus" />
                    添加
                </Button>
            </div>
        )
    }

    _addHandler = e => {
        const { todos } = this.props;
        let content = this.content.current.state.value;
        const lastTodoId = todos.length === 0 ? 0 : todos[todos.length - 1].id;
        if (!content) {
            message.error('输入的内容不能为空！');
            return;
        }

        // 封装对象
        const todo = { id: lastTodoId + 1, content: content };
        this.props.actionCreators.addHandler(todo);
        // 清空文本框
        content = '';

    }

}

/**
 * 派发状态
 * @param {state} state 
 */
const mapStateToProps = state => {
    return {
        title: state.title,
        todos: state.todos
    }
}


/**
 * 派发方法
 * @param {dispath} dispatch 
 */
const mapDispatchToProps = dispatch => {
    return {
        actionCreators: bindActionCreators(actionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from './../../store/actionCreators';
import { List, Icon, Divider, message, Modal, Popconfirm, Input } from 'antd';

class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            id: 0,
            content: ''
        }
    }
    render() {
        const { todos } = this.props;
        const { visible, confirmLoading, id, content } = this.state;
        return (
            <div>
                <Divider />
                <List
                    dataSource={todos}
                    renderItem={
                        todo => <List.Item actions={
                            [
                                <Icon type="edit" onClick={() => { this.editModal(todo.id) }} />
                                ,
                                <Popconfirm
                                    title="确定要删除吗？"
                                    onConfirm={() => { this.deleteHandlerConfirm(todo.id) }}
                                    onCancel={this.deleteHandlerCancel}
                                    okText="是"
                                    cancelText="否"
                                >
                                    <Icon type="delete" />
                                </Popconfirm>
                            ]

                        }>
                            {todo.content}
                        </List.Item>
                    }
                />
                <Modal
                    title="编辑对话框"
                    visible={visible}
                    onOk={this.handleOk}
                    okText="保存"
                    cancelText="取消"
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <div style={{ marginBottom: 30, textAlign: 'center' }}>
                        <label>编号：</label>
                        <Input
                            type="text"
                            disabled
                            value={id}
                            style={{ width: 300, marginRight: 10, border: 0, backgroundColor: 'transparent' }}
                        />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <label>标题：</label>
                        <Input
                            type="text"
                            value={content}
                            onChange={e => this.inputChange(e)}
                            ref="input"
                            style={{ width: 300, marginRight: 10 }}
                        />
                    </div>
                </Modal>
                <Divider />
            </div>
        )
    }

    componentDidMount() {
        this.props.actionCreators.getTodosAction();
    }

    deleteHandlerConfirm(id) {
        message.success('删除成功');
        this.props.actionCreators.deleteHandler(id);
    }

    deleteHandlerCancel() {
        message.error('删除取消');
    }

    // 打开编辑对话框
    editModal = id => {
        const { todos } = this.props;
        let tempId = todos[id - 1].id;
        let content = todos[id - 1].content;
        this.setState({
            visible: true,
            id: tempId,
            content
        });
    };

    inputChange = e => {
        let content = e.target.value;
        this.setState({
            content
        })
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true
        });
        let { id, content } = this.state;
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
                id,
                content
            });
            message.success("保存成功");
            this.props.actionCreators.updateHandler(id, content);
        }, 1000);
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
        message.error("取消成功");
    };



}

/**
 * 派发状态
 * @param {state} state 
 */
const mapStateToProps = state => {
    return {
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


export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);

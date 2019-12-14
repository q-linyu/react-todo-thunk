import React from 'react';

import { connect } from 'react-redux';

class Footer extends React.Component {
    render() {
        const { todos } = this.props;
        return (
            <div>
                <span>
                    总计{todos.length}个
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todos,
    }
}

export default connect(mapStateToProps, null)(Footer);

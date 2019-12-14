import React from 'react';

import './App.css';

// 引入组件
import Header from './components/Header';
import TodoItem from './components/TodoItem';
import Footer from './components/Footer';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <TodoItem />
        <Footer />
      </div>
    )
  }

}

export default App;

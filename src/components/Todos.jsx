import React from 'react';
import Todo from './Todo';

class Todos extends React.Component {
    render() {
        const todos = this.props.todos;
        return (
            <>
            <ul style={{listStyle: "none", padding: 0, width: "100%"}}>
                {todos && todos.map((todo) => {
                    return <Todo key={todo.id} todos={todos} text={todo.text} id={todo.id} complete={todo.complete} remove={this.removeTodo} setTodos={this.props.setTodos} />
                })}
            </ul>
            </>
        )
    }
};

export default Todos;
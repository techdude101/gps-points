import React from 'react';
import { nanoid } from 'nanoid'
import './Form.css';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    addTodo(e) {
        e.preventDefault();
        // Prevent adding ""
        if (this.state.value.length < 1) return;

        this.props.add(
            {
                id: nanoid(),
                text: this.state.value,
                complete: false,
            }
        )
        // Reset the input
        this.setState({ value: "" });
    }

    handleChange(e) {
        // Limit input to 32 characters
        if (e.target.value.length <= 32) {
            this.setState({ value: e.target.value });
        } else {
            this.setState({ value: e.target.defaultValue });
        }
    }
    render() {
        return (
            <form onSubmit={this.addTodo.bind(this)} className="form">
                <input type="text" placeholder="New item" value={this.state.value} onChange={this.handleChange.bind(this)} className="form-input" />
                <input type="button" value="Add" onClick={this.addTodo.bind(this)} className="form-button" />
            </form>
        )
    }
}

export default Form;
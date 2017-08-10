import React from "react";
import { render } from "react-dom";

class TodoForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            todos: [],
            idCount: 0
        };

        this.addItem = this.addItem.bind(this);
    }

    addItem(todoItemText){
        
        const todo = { id: this.state.idCount, text: todoItemText };
        const updatedIds = this.state.idCount + 1;
        this.state.todos.push(todo);

        this.setState({todos: this.state.todos});
        this.setState({idCount: updatedIds});

        console.log(this.state.todos);
    }

    render (){
        return (
            <div>
                <h1>I am a TodoList</h1>
                <AddItem addItem={this.addItem}/>
                <TodoList todos={this.state.todos} />
            </div>
        )
    }
}

class TodoList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const nodes = this.props.todos.map((todo) => {
            return (<TodoItem key={todo.id} text={todo.text}></TodoItem>   )
        });
        return (<ul>{nodes}</ul>);
    }
}

class AddItem extends React.Component{
    constructor(props){
        super(props);

        this.state = { value: "" };

        this.onKeyPress = this.onKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onKeyPress(event){
        if(event.key === "Enter"){
            this.props.addItem(this.state.value);
            this.setState({value: ""});
        }
    }

    handleChange(event){
        this.setState({value: event.target.value });
    }

    render(){
        return (
            <input type="text" placeholder="Add a new item" 
                   onKeyPress={this.onKeyPress} 
                   value={this.state.value}
                   onChange={this.handleChange}
                   />
        )
    }
}

class TodoItem extends React.Component {
    constructor(props){
        super(props);

        // State has completion
        // and text?
    }
    render() {
        return (
            <li>{this.props.text}</li>
        )
    }
}

render(<TodoForm />, document.getElementById("app"));
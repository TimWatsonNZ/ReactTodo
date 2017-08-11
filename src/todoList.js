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
        this.deleteItem = this.deleteItem.bind(this);
        this.completeItem = this.completeItem.bind(this);
    }

    addItem(todoItemText){
        const todo = { id: this.state.idCount, text: todoItemText, completed: true };
        const updatedIds = this.state.idCount + 1;
        this.state.todos.push(todo);

        this.setState({todos: this.state.todos});
        this.setState({idCount: updatedIds});
    }

    completeItem(itemId){
        const updatedTodos = this.state.todos.map((todo) =>{
            if(todo.id === itemId){
                todo.completed = !todo.completed;
                console.log("Updated item");
            }
            return todo;
        });

        this.setState({todos: updatedTodos});
    }

    deleteItem(itemId){
        const filteredList = this.state.todos.filter((todo) => {
            if(todo.id !== itemId) return todo;
        });

        this.setState({todos: filteredList});
    }

    render (){
        return (
            <div>
                <h1>I am a TodoList</h1>
                <AddTodoItem addItem={this.addItem}/>
                <TodoList todos={this.state.todos} 
                          deleteItem={this.deleteItem}
                          completeItem={this.completeItem}/>
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
            return (
                <TodoItem key={todo.id}
                          id={todo.id}
                          text={todo.text}
                          completed={todo.completed}
                          deleteItem={this.props.deleteItem}
                          completeItem={this.props.completeItem}
                          ></TodoItem>   )
        });
        return (<ul>{nodes}</ul>);
    }
}

class TodoItem extends React.Component {
    constructor(props){
        super(props);

        this.style = { 
            Completed: {
                textDecoration: ""
            },
            unCompleted: {
                textDecoration: "line-through"
            }
        }; 
        
        this.complete = this.complete.bind(this);
        this.delete = this.delete.bind(this);
    }

    complete(){
        console.log("complete");
        this.props.completeItem(this.props.id);
    }

    delete(){
        this.props.deleteItem(this.props.id);
    }

    render() {
        return (
            <li>
                <button onClick={this.complete}>O</button>
                <button onClick={this.delete}>X</button> - 
                <span style={(this.props.completed ? this.style.completed : this.style.unCompleted)}>
                    {this.props.text}
                </span>
            </li>
        )
    }
}

class AddTodoItem extends React.Component{
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

render(<TodoForm />, document.getElementById("app"));
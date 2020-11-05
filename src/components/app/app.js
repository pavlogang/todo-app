import React, {Component} from 'react';

import AppHeader from '../app-header/app-header';
import TodoList from '../todo-list/todo-list';
import SearchPanel from '../search-panel/search-panel';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';
import './app.css'


export default class App extends Component {
	
	state = {
		todoData: [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch'),
		]
	};
	
	createTodoItem(label) {
		const id = Math.trunc(Math.random() * (10000 - 100) + 100);
		return {
				label,
				important: false,
				done: false,
				id
			}
	}
	
	deleteItem = (id) => {
		this.setState(({todoData}) => {
			const idx = todoData.findIndex((el) => id === el.id)
						
			const newArray = [ 
				...todoData.slice(0, idx),
				...todoData.slice(idx + 1)
			]
			
			return {
				todoData: newArray
			}
		})
	}
	
	addItem = (text) => {
	
		this.setState(({todoData}) => {
			const newItem = this.createTodoItem(text)
			
			const newArray = [...todoData, newItem]
			return {
				todoData: newArray
			}
		})  
	}
	
	toggleProperty(arr, id, propName) {
		const idx = arr.findIndex((el) => id === el.id);

		const oldItem = arr[idx];
		const newitem = {
			...oldItem,
			[propName]: !oldItem[propName]
		}

		return [
			...arr.slice(0, idx),
			newitem,
			...arr.slice(idx + 1)
		]
	}
	
	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important')
			}
			
		})
		console.log('ToggleImportant', id);
	}
	
	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done')
			}
			
		})
		console.log('ToggleDone', id);
	}
	
	render() {
		
		const { todoData } = this.state;
		const doneCount = todoData.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;
		
		return (
		<div className="todo-app">
			<AppHeader toDo={todoCount} done={ doneCount} />
			
			<div className="top-panel d-flex">
			<SearchPanel />
			<ItemStatusFilter />
			</div>

			<TodoList 
				todos={ todoData }
				onDeleted={ this.deleteItem }
				onToggleDone={ this.onToggleDone}
				onToggleImportant={ this.onToggleImportant}
				/>
			< ItemAddForm addItem={this.addItem} />
		</div>
		)
	}
}

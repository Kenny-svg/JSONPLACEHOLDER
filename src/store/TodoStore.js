import {defineStore} from 'pinia'

export const useTodoStore = defineStore('todoStore', {
    state: () => ({
        todos: [],
        loading: false,
        error: null
    }),
    getters: {
        todoTotals: (state) => {
            return state.todos.length
        }
    },
    actions: {
        async getTodos() {
            this.loading = true

            //fetching the jsonplaceholder server

            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/todos')
                const data = await res.json()
                if(!res.ok) {
                    throw Error('could not fetch the todos...')
                }
                this.todos = data
                this.loading = false
            } catch (err) {
                this.error = err.message
                console.log(this.error)
            }
        },
        addTodos(todo) {
            this.todos = [...this.todos, {...todo, id: this.todos.length + 1}]
        },
        deleteTodos(id) {
            this.todos = this.todos.filter(t => {
                return t.id !== id
            })
        }
    }
})
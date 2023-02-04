import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [],
        loading: false,
        error: null
    }),
    getters: {
        userTotals: (state) => {
            return state.users.length
        }
    },
    actions: {
        async getUsers() {
            this.loading = true

            //fetching the jsonplaceholder server

            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/users')
                const data = await res.json()
                if(!res.ok) {
                    throw Error('could not fetch the users...')
                }
                this.users = data
                this.loading = false
            } catch (err) {
                this.error = err.message
                console.log(this.error)
            }
        },
        addUsers(user) {
            this.users = [...this.users, {...user, id: this.users.length + 1}]
        },
        deleteUsers(id) {
            this.users = this.users.filter(u => {
                return u.id !== id
            })
        }
    }
})
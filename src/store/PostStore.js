import {defineStore} from 'pinia'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        posts: [],
        loading: false,
        error: null
    }),
    getters: {
        postTotals: (state) => {
            return state.posts.length
        }
    },
    actions: {
        async getPosts() {
            this.loading = true

            //fetching the jsonplaceholder server

            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts')
                const data = await res.json()
                if(!res.ok) {
                    throw Error('could not fetch the posts...')
                }
                this.posts = data
                this.loading = false
            } catch (err) {
                this.error = err.message
                console.log(this.error)
            }
        },
        addPosts(post) {
            this.posts = [...this.posts, {...post, id: this.posts.length + 1}]
        },
        deletePosts(id) {
            this.posts = this.posts.filter(p => {
                return p.id !== id
            })
        }
    }
})
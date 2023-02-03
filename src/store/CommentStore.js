import {defineStore} from 'pinia'

export const useCommentStore = defineStore('commentStore', {
    state: () => ({
        comments: [],
        loading: false,
        error: null
    }),
    getters: {
        commentsTotals: (state) => {
            return state.comments.length
        }
    },
    actions: {
        async getComments() {
            this.loading = true
            
            //fetching the jsonplaceholder server
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/comments')
                const data = await res.json()
                if(!res.ok) {
                    throw Error ('failed to fetch data, please try again')
                }
                
                this.comments = data
                this.loading = false
            }catch (err) {
                this.error = err.message
                console.log(this.error)
            }
 
        },
        addComments(comment) {
            this.comments = [...this.comments, {...comment, id: this.comments.length + 1}]
        },
        deleteComments(id){
            this.comments = this.comments.filter(c => {
               return c.id !==id
            })
        }
    }
})

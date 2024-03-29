import {defineStore} from 'pinia'
import { computed } from 'vue';
import axios from 'axios'
export const useAlbumStore = defineStore('albumStore', {
    state: () => ({
        albums: [],
        loading: false,
        error: null,
        newNum: 0,
        title: '',
    }),
    getters: {
        albumsTotals: (state) => {
            return state.albums.length
        },

    },
    actions: {
        async getAlbums() {
            this.loading = true
            
            //fetching the jsonplaceholder server
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/albums')
                const data = await res.json()
                if(!res.ok){
                    throw Error('could not fetch data, please check back.')
                }
                this.albums = data
                this.loading = false
            } catch (err) {
                this.error = err.message
                console.log(this.error)
            }

        },
        addAlbums(album) {
            this.albums = [...this.albums, {...album, id: this.albums.length + 1}]
        },
        deleteAlbulms(id){
            this.albums = this.albums.filter(a => {
               return a.id !==id
            })
        },

        
    }
})

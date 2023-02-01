import {defineStore} from 'pinia'

export const usePhotoStore = defineStore('photoStore', {
    state: () => ({
        photos: [],
        loading: false,
        error: null
    }),
    getters: {
        photosTotals: (state) => {
            return state.photos.length
        }
    },
    actions: {
        async getphotos() {
            this.loading = true
            
            //fetching the jsonplaceholder server
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/photos')
                const data = await res.json()
                if(!res.ok){
                    throw Error('could not fetch photos, please check back.')
                }
                this.photos = data
                this.loading = false
            } catch (err) {
                this.error = err.message
                console.log(this.error)
            }

        },
        addPhotos(photos) {
            this.photos = this.photos.push(photos)
        },
        deletePhotos(id){
            this.photos = this.photos.filter(p => {
               return p.id !==id
            })
        }
    }
})
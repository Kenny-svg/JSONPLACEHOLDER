<template>
<div class="" >
       <div class="bg-white shadow-2xl border-2">
        <div class="flex justify-between mt-2 m-5 mb-2">
            <svg  @click="toggleModal"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 rounded-full cursor-pointer bg-red-600 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                <p>{{ photo.id }}</p>
            <svg @click="photoStore.deletePhotos(photo.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 text-white bg-red-600 rounded-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

            </div>
           
            <h3 class="text-center">{{ photo.title }}</h3>
            <img class="mx-auto object-cover m-5 w-40" :src="photo.url" />
       </div>
    </div>

    <div v-if="showModal">
        <Modal
        
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form class="text-center" @submit.prevent="editPhotos">
                <input
                
                v-model="photo.title"
                class="border-2 p-2 rounded-lg mt-2" type="text" placeholder="edit photo"/><br />

                <button class="border-2  mt-5 p-2 rounded-lg text-white bg-red-700">edit photo</button>
            </form>
        </template>
    </Modal>  


    </div>
</template>
<script>
import { usePhotoStore } from '../../store/PhotoStore';
import Modal from '../utilities/Modal.vue';
import { ref } from '@vue/reactivity';
export default {
    props: ['photo'],
    components:{Modal},
    setup() {
        const photoStore = usePhotoStore()
        const header = ref('Edit a new photo')
        const showModal = ref(false)
        const toggleModal = () => {
            showModal.value = !showModal.value
        }

        const editPhotos = async () => {
            showModal.value = false
         try {

            if(response.data.status_code == 400){
                    throw Error('could not fetch data, please check back.')
                }
            const id = 1
            const res = await axios.patch(`https://jsonplaceholder.typicode.com/photos/${id}`,{
                title: this.title
            })
            


            
            console.log(res.data)
         } catch (err) {
            this.error = err.message
                console.log(this.error)
         }
        }

        return {photoStore, header, showModal, toggleModal, editPhotos}
    }
}
</script>
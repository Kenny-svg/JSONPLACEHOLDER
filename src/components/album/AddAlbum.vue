<template>
    <div v-if="showModal">
        <Modal
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="handleSubmit">
                <input
                v-model="newAlbum"
                class="border-2 p-2 rounded-lg mt-2" type="text" placeholder="add new album"/><br />

                <button class="border-2  mt-5 p-2 rounded-lg text-white bg-red-700">Add new Album</button>
            </form>
        </template>
    </Modal>   
    </div>
    
    <svg @click="toggleModal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" cursor-pointer mx-auto w-10 h-10 p-2 bg-gray-900 shadow-2xl  rounded-full text-white">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

</template>
<script>
import Modal from '../utilities/Modal.vue';
import { useAlbumStore } from '../../store/AlbumStore';
import { ref } from '@vue/reactivity';


export default {
    components: {Modal},
    setup(){
        
        // let nextId = 0
        const albumStore = useAlbumStore()
        const newAlbum = ref('')
        const header = ref('Add a new album')
        const showModal = ref(false)

        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        const handleSubmit = () => {
            if (newAlbum.value.length > 0) {
                albumStore.addAlbums({
                    title: newAlbum.value,
                    // id: nextId++
                })
                newAlbum.value = ''
                showModal.value = false
            }                  
        }
        
        return {handleSubmit, toggleModal, newAlbum, header, showModal}
    }
    

    
}
</script>
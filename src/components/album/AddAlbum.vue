<template>
    <h1>add album</h1>
    <div v-if="showModal">
        <Modal
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="handleSubmit">
                <input
                v-model="newAlbum"
                class="border-2" type="text" placeholder="add new album"/>

                <button class="border-2">Add Album</button>
            </form>
        </template>
    </Modal>   
    </div>
    <button class="text-white" @click="toggleModal"><img class=" bg-gray-900 shadow-lg  rounded-full" src="../../assets/icons/add.svg" /></button>

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
            }                  
        }
        
        return {handleSubmit, toggleModal, newAlbum, header, showModal}
    }
    

    
}
</script>
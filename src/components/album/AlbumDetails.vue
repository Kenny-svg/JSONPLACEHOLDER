<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full" >
       <div class="bg-white shadow-2xl border-2">
            <p>{{ album.id }}</p>
            <!-- <img :src="image" /> -->
            <h3>{{ album.title }}</h3>
            <img @click="albumStore.deleteAlbulms(album.id)" src="../../assets/icons/del.svg" />
            <img @click="toggleModal" src="../../assets/icons/pen.svg" />
       </div>
    </div>
    <div v-if="showModal">
        <Modal
        
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="handleSubmit">
                <input
                
                v-model="editAlbum"
                class="border-2" type="text" placeholder="edit album"/>

                <button class="border-2" @click="albumStore.editAlbums(album.id)">edit Album</button>
            </form>
        </template>
    </Modal>  


    </div>

</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAlbumStore } from '../../store/AlbumStore';
import Modal from '../utilities/Modal.vue';
export default {
    props: ['album'],
    components: {Modal, },
    setup() {
        const albumStore = useAlbumStore()

        const editAlbum = ref('')

        const header = ref('Edit a new album')
        const showModal = ref(false)
        const toggleModal = () => {
            showModal.value = !showModal.value
        }

        const handleSubmit = () => {
            if (editAlbum.value.length > 0) {
                albumStore.editAlbums({
                    title: editAlbum.value,
                    // id: nextId++
                })
                editAlbum.value = ''
            }                  
        }
        
    

    
        return {albumStore, editAlbum, handleSubmit, toggleModal, header, showModal}

    }
}
</script>
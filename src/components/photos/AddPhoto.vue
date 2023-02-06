<template>
    <div v-if="showModal">
        <Modal
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form class="text-center" @submit.prevent="handleSubmit">
                <input
                v-model="newPhoto"
                class="border-2 p-2 rounded-lg mt-2" type="text" placeholder="add new photo"/><br/>
                <input
                v-model="newUrl"
                class="border-2 p-2 rounded-lg mt-2" type="url" placeholder="add new url"
                /><br/>

                <button class="border-2  mt-5 p-2 rounded-lg text-white bg-red-700 ">Add new photo</button>
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
import { usePhotoStore } from '../../store/PhotoStore';
import { ref } from '@vue/reactivity';


export default {
    components: {Modal},
    setup(){
        
        // let nextId = 0
        const photoStore = usePhotoStore()
        const newPhoto = ref('')
        const newUrl = ref('')
        const header = ref('Add a new photo')
        const showModal = ref(false)

        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        const handleSubmit = () => {
            if (newPhoto.value.length > 0 && newUrl.value.length > 0) {
                photoStore.addPhotos({
                    title: newPhoto.value,
                    url: newUrl.value
                    // id: nextId++
                })
                newPhoto.value = ''
                showModal.value = false
            }                  
        }
        
        return {handleSubmit, toggleModal, newPhoto, header, showModal, newUrl}
    }
    

    
}
</script>
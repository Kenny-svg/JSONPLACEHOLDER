<template>
    <div v-if="showModal">
        <Modal
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="handleSubmit">
                <input
                v-model="newPost"
                class="border-2" type="text" placeholder="add new post"/>

                <button class="border-2 ">Add new Post</button>
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
import { usePostStore } from '../../store/PostStore';
import { ref } from '@vue/reactivity';


export default {
    components: {Modal},
    setup(){
        
        // let nextId = 0
        const postStore = usePostStore()
        const newPost = ref('')
        const header = ref('Add a new post')
        const showModal = ref(false)

        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        const handleSubmit = () => {
            if (newPost.value.length > 0) {
                postStore.addPosts({
                    body: newPost.value,
                    // id: nextId++
                })
                newPost.value = ''
                showModal.value = false
            }                  
        }
        
        return {handleSubmit, toggleModal, newPost, header, showModal}
    }
    

    
}
</script>
<template>
    <div v-if="showModal">
        <Modal
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="handleSubmit">
                <input
                v-model="newComment"
                class="border-2 p-2 rounded-lg mt-2" type="text" placeholder="add new album"/><br />

                <button class="border-2  mt-5 p-2 rounded-lg text-white bg-red-700">Add new Comment</button>
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
import { useCommentStore } from '../../store/CommentStore';
import { ref } from '@vue/reactivity';


export default {
    components: {Modal},
    setup(){
        
        // let nextId = 0
        const commentStore = useCommentStore()
        const newComment = ref('')
        const header = ref('Add a new comment')
        const showModal = ref(false)

        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        const handleSubmit = () => {
            if (newComment.value.length > 0) {
                commentStore.addComments({
                    name: newComment.value,
                    // id: nextId++
                })
                newComment.value = ''
                showModal.value = false
            }                  
        }
        
        return {handleSubmit, toggleModal, newComment, header, showModal,}
    }
    

    
}
</script>
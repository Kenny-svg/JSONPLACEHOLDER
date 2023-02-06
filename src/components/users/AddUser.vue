<template>
    <div v-if="showModal">
        <Modal
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="handleSubmit">
                <input
                v-model="newUser"
                class="border-2  p-2 rounded-lg mt-2" type="text" placeholder="add new user"/><br />

                <input
                v-model="newEmail"
                class="border-2  p-2 rounded-lg mt-2" type="email" placeholder="add new email"/><br />

                <input
                v-model="newUserName"
                class="border-2  p-2 rounded-lg mt-2" type="text" placeholder="add new username"/><br />

                <input
                v-model="newPhone"
                class="border-2  p-2 rounded-lg mt-2" type="num" placeholder="add new phone"/><br />

                <input
                v-model="newWeb"
                class="border-2 p-2 rounded-lg mt-2" type="url" placeholder="add new website"/><br />


                <button class="border-2  mt-5 p-2 rounded-lg text-white bg-red-700 ">Add new user</button>
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
import { useUserStore } from '../../store/UserStore';
import { ref } from '@vue/reactivity';


export default {
    components: {Modal},
    setup(){
        
        // let nextId = 0
        const userStore = useUserStore()
        const newUser = ref('')
        const newUserName = ref('')
        const newPhone = ref('')
        const newEmail = ref('')
        const newWeb = ref('')
        const header = ref('Add a new user')
        const showModal = ref(false)

        const toggleModal = () => {
            showModal.value = !showModal.value
        }
        const handleSubmit = () => {
            if (newUser.value.length >  0 && newUserName.value.length > 0 && newEmail.value.length > 0 && newPhone.value.length > 0 && newWeb.value.length > 0) {
                userStore.addUsers({
                    name: newUser.value,
                    username: newUserName.value,
                    email: newEmail.value,
                    phone: newPhone.value,
                    website: newWeb.value,

                    // id: nextId++
                })
                newUser.value = ''
                newEmail.value = ''
                newWeb.value = ''
                newPhone.value = ''
                newUserName.value = ''
                showModal.value = false
            }                  
        }
        
        return {handleSubmit, toggleModal, newUser, header, showModal,newPhone, newEmail, newWeb, newUserName,}
    }
    

    
}
</script>
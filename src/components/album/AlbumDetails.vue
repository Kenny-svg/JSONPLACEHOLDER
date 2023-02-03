<template>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full" >
       <div v-for="item in currentPage" :key="item.id" class=" flex bg-white shadow-2xl border-2">
        <div class=" text-center mx-auto">
            <p class="text-center">{{ album.id }}</p>
            <!-- <img :src="image" /> -->
            <img v-for="(item, index) in images" :key="index" :src="item" style="display: inline-block; margin-right: 10px"/>
            <h3>{{ album.title }}</h3>
            <div class="flex justify-between mt-2 mb-2">
            <svg  @click="toggleModal"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 rounded-full cursor-pointer bg-red-600 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>

            <svg @click="albumStore.deleteAlbulms(album.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 p-2 text-white bg-red-600 rounded-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

            </div>

        </div>

       </div>
    </div>
    <button @click="previousPage">Previous</button>
            <button @click="nextPage">Next</button>
    <div v-if="showModal">
        <Modal
        
            @close="toggleModal" 
            :header="header"
    >
        <template v-slot:form>
            <form @submit.prevent="editAlbums">
                <input
                
                v-model="album.title"
                class="border-2" type="text" placeholder="edit album"/>

                <button class="border-2">edit Album</button>
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
import { reactive, computed } from 'vue';
import Pagination from 'v-pagination-3';


export default {
    props: ['album'],
    components: {Modal, Pagination},
    setup() {
        //pagination
        const  currentPage = ref(1)
        const  itemsPerPage = ref(10)

        //from store
        const albumStore = useAlbumStore()
        //random images
        const images = ref([])
        //pagination
        const totalPages = computed(() => Math.ceil(albumStore.albums.length / itemsPerPage.value));    
        const currentPageData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        return albumStore.albums.slice(start, start + itemsPerPage.value);
    });

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }
    function nextPage() {
      if (currentPage.value < this.totalPages) {
        currentPage.value++;
      }
    }
        onMounted(() => {
            for (let i = 0; i < 1; i++) {
             images.value.push( `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`)
      }
        })

        const header = ref('Edit a new album')
        const showModal = ref(false)
        const toggleModal = () => {
            showModal.value = !showModal.value
        }

        // const handleSubmit = () => {
        //     if (editAlbum.value.length > 0) {
        //         albumStore.editAlbums({
        //             title: editAlbum.value,
        //             // id: nextId++
        //         })
        //         editAlbum.value = ''
        //     }               
            
        const editAlbums = async () => {
            showModal.value = false
         try {

            if(response.data.status_code == 400){
                    throw Error('could not fetch data, please check back.')
                }
            const id = 1
            const res = await axios.patch(`https://jsonplaceholder.typicode.com/albums/${id}`,{
                title: this.title
            })
            


            
            console.log(res.data)
         } catch (err) {
            this.error = err.message
                console.log(this.error)
         }
        }
        
        return {totalPages, albumStore, editAlbums, toggleModal,images, header, showModal,  currentPageData,  previousPage, nextPage, currentPage, itemsPerPage}
        
        }

        

    }

</script>

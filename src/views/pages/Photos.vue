<script>
// import AddPhoto from '../../components/photo/AddPhoto.vue';
import { ref, computed } from '@vue/reactivity';
import PhotoDetails from '../../components/photos/PhotoDetails.vue';
import {usePhotoStore } from '../../store/PhotoStore'
import AddPhoto from '../../components/photos/AddPhoto.vue';
import { onMounted, onUnmounted,} from 'vue';
export default {
    components: {PhotoDetails, AddPhoto },
    setup() {

            //fetching the photos

        const photoStore = usePhotoStore()
        photoStore.getPhotos()

        const page = ref(1);
        const itemsPerPage = 10;
        const totalPages = computed(() => Math.ceil(photoStore.photos.length / itemsPerPage));
        const paginatedPhotos = computed(() => {
        const start = (page.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return photoStore.photos.slice(start, end);
    });

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
      }
    };
    const nextPage = () => {
      if (page.value < totalPages.value) {
        page.value++;
      }
    };
    const showArrow = ref(false);
          const handleScroll = () => {
            if (window.scrollY > 300) {
              showArrow.value = true;
            } else {
              showArrow.value = false;
            }
      };
        const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

      onMounted(() => {
        window.addEventListener('scroll', handleScroll);
      });
      onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
      });

    return {
      photoStore,
      paginatedPhotos,
      prevPage,
      nextPage,
      totalPages,
      page,
      showArrow,
      handleScroll,
      scrollToTop,
    };



    }
}
</script>
<template>
    <!-- loading -->
    <div v-if="photoStore.loading" class="bg-blue-900 top-0 absolute h-full w-full text-center text-gray-600"><div class="flex items-center h-screen">
  <div class="bg-blue-500 w-64 h-10 mx-auto rounded-full animate-wipe">
  </div>
</div></div>

    <!-- error -->
    <div v-if="photoStore.error">{{ photoStore.error }}</div>
    <!-- add photos -->
    <div class="mt-24 text-center">
        <AddPhoto  />
    </div>
     <!-- photo details -->
     
     <div class="mt-10 text-center font-bold text-3xl mb-5">photos[{{ photoStore.photosTotals }}]</div>
         <!-- loading -->
 
    <div v-if="photoStore.loading">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:w-11/12 mx-auto my-8">
  <div class="w-16 h-10 bg-gray-300 rounded-lg mr-4 animate-pulse"></div>
  <div class="w-64 h-10 bg-gray-300 rounded-lg mr-4 animate-pulse"></div>
  <div class="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
  <div class="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
</div>
</div>
<div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 md:w-11/12 mx-auto w-11/12">
    <div class="" v-for="photo in paginatedPhotos" :key="photo.id">
        <PhotoDetails :photo="photo" />
     </div>
</div>
<div class="text-center mt-5">
    <button class="bg-gray-300 text-gray-700 border-2 rounded-lg px-4 py-2 hover:bg-gray-400" @click="prevPage">Prev</button>
    <template v-for="i in Array.from({length: this.totalPages}, (_, index) => index + 1)" :key="i">
      <button class="border-2 ml-2 w-8 bg-gray-300 text-gray-700 hover:bg-gray-400" v-if="i <= 5 || i > this.totalPages - 5" @click="this.page = i">{{ i }}</button>
      <template v-if="i === 6">...</template>
    </template>
    <button class="bg-gray-300 text-gray-700 border-2 rounded-lg px-4 py-2 hover:bg-gray-400" @click="nextPage">Next</button>
  </div>
  <div class="scroll-to-top" v-if="showArrow" @click="scrollToTop">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-18 h-8 bg-gray-900 text-white rounded-full cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

    </div>

</template>
<style>
  @keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }

  .animate-pulse {
    animation: pulse 1s ease-in-out infinite;
  }
  @keyframes wipe {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
  
  .animate-wipe {
    animation: wipe 1s ease-in-out infinite;
  }
  .scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    opacity: 0.5;
  }
</style>
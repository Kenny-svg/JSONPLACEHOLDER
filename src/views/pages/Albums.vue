<script>
import { ref, computed } from '@vue/reactivity';
import { onMounted, onUnmounted,} from 'vue';
import AddAlbum from '../../components/album/AddAlbum.vue';
import AlbumDetails from '../../components/album/AlbumDetails.vue';
import { useAlbumStore } from '../../store/AlbumStore';

export default {
  components: { AlbumDetails, AddAlbum },
  setup() {
    
    const albumStore = useAlbumStore();
    albumStore.getAlbums();

    const page = ref(1);
    const itemsPerPage = 10;
    const totalPages = computed(() => Math.ceil(albumStore.albums.length / itemsPerPage));
    const paginatedAlbums = computed(() => {
      const start = (page.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return albumStore.albums.slice(start, end);
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
      albumStore,
      paginatedAlbums,
      prevPage,
      nextPage,
      totalPages,
      page,
      showArrow,
      handleScroll,
      scrollToTop,
    };
  }
};
</script>
<template>
      <div v-if="albumStore.loading" class="bg-blue-900 absolute top-0 h-full w-full text-center text-gray-600"><div class="flex items-center h-screen">
  <div class="bg-blue-500 w-64 h-10 mx-auto rounded-full animate-wipe">
  </div>
</div></div>
 <div v-if="albumStore.error" class="text-red-600 text-center">{{ albumStore.error }}</div>
  <div class="mt-24 text-center">
    <AddAlbum />
  </div>
  <div class=" mt-10 text-center font-bold text-3xl mb-5">
    Albums<sub>[{{ albumStore.albumsTotals }}]</sub>
  </div>

  <div v-if="albumStore.loading">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:w-11/12 mx-auto my-8">
  <div class="w-16 h-10 bg-gray-300 rounded-lg mr-4 animate-pulse"></div>
  <div class="w-64 h-10 bg-gray-300 rounded-lg mr-4 animate-pulse"></div>
  <div class="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
  <div class="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
</div>
</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4 md:w-11/12 mx-auto w-11/12">
    <div v-for="album in paginatedAlbums" :key="album.id">
    <AlbumDetails :album="album" />
  </div>
  </div>

  <div class="text-center mt-5">
    <button class="bg-gray-300 text-gray-700 border-2 rounded-lg px-4 py-2 hover:bg-gray-400" @click="prevPage">Prev</button>
    <template v-for="i in Array.from({length: this.totalPages}, (_, index) => index + 1)" :key="i">
      <button class="border-2 ml-2 w-5 bg-gray-300 text-gray-700 hover:bg-gray-400" v-if="i <= 5 || i > this.totalPages - 5" @click="this.page = i">{{ i }}</button>
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
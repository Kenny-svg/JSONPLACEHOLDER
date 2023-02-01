<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" >
       <div class="bg-white shadow-2xl border-2">
            <p>{{ album.id }}</p>
            <img :src="image" />
            <h3>{{ album.title }}</h3>
       </div>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAlbumStore } from '../../store/AlbumStore';

export default {
    props: ['album',],
    setup() {
        const albumStore = useAlbumStore()
        
        const image = ref('');

        const fetchImage = async () => {
      const response = await axios.get('https://your-api-for-random-images.com/');
      image.value = response.data.url;

      onMounted(() => {
      fetchImage();
    });
    };

    
        return {albumStore, image}
    }
}
</script>
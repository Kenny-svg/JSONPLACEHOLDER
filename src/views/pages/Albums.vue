<script>
import AddAlbum from '../../components/album/AddAlbum.vue';
import AlbumDetails from '../../components/album/AlbumDetails.vue';
import {useAlbumStore } from '../../store/AlbumStore'

export default {
    components: {AlbumDetails, AddAlbum},
    setup() {
        const albumStore = useAlbumStore()

        //fetching the albums

        albumStore.getAlbums()
        

        return {albumStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="albumStore.error">{{ albumStore.error }}</div>
    <!-- add albums -->
    <div class="mt-20 text-center">
        <AddAlbum  />
    </div>
     <!-- Album details -->
     <div class="mt-10 text-center font-bold text-3xl mb-5">Albums<sub>[{{ albumStore.albumsTotals }}]</sub></div>
     
         <!-- loading -->
    <div v-if="albumStore.loading">loading album...</div>
     <div class="" v-for="album in albumStore.albums" :key="album.id">
        <AlbumDetails :album="album" />
     </div>


</template>
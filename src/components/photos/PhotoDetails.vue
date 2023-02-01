<template>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4" >
       <div class="bg-white shadow-2xl border-2">
            <p>{{ photo.id }}</p>
            <h3>{{ photo.title }}</h3>
            <img :src="photo.url" />
       </div>
    </div>
</template>
<script>
import { usePhotoStore } from '../../store/PhotoStore';

export default {
    props: ['photo'],
    setup() {
        const photoStore = usePhotoStore()

        return {photoStore}
    }
}
</script>
<script>
import PostDetails from '../../components/posts/PostDetails.vue';
import AddPost from '../../components/posts/AddPost.vue';
import { usePostStore } from '../../store/PostStore';

export default {
    components: {PostDetails, AddPost},
    setup() {
        const postStore = usePostStore()

        //fetching the posts

        postStore.getPosts()

        return {postStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="postStore.error">{{ postStore.error }}</div>

    <!-- add post -->
    <div class="mt-20 text-center">
        <AddPost  />
    </div>
     <!-- post details -->
     <div class="mt-10 text-center font-bold text-3xl mb-5">Posts [{{ postStore.postTotals }}]</div>

     <!-- loading -->
     <div v-if="postStore.loading">loading posts...</div>
     <div class="" v-for="post in postStore.posts" :key="post.id">
     <PostDetails :post="post" />
     </div>
</template>
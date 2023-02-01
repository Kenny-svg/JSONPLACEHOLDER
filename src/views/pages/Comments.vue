<script>
// import AddComment from '../../components/comment/AddComment.vue';
import CommentDetails from '../../components/comment/CommentDetails.vue';
import {useCommentStore } from '../../store/CommentStore'

export default {
    components: {CommentDetails},
    setup() {
        const commentStore = useCommentStore()

        //fetching the comments

        commentStore.getComments()

        return {commentStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="commentStore.error">{{ commentStore.error }}</div>
    <!-- loading -->
    <div v-if="commentStore.loading">loading comment...</div>
     <!-- comment details -->
     <div class="mt-20">comments[{{ commentStore.commentsTotals }}]</div>
     <div class="" v-for="comment in commentStore.comments" :key="comment.id">
        <CommentDetails :comment="comment" />
     </div>

</template>
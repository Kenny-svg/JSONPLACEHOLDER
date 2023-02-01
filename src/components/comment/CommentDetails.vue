<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" >
       <div class="bg-white shadow-2xl border-2">
            <p>{{ comment.id }}</p>
            <h3>{{ comment.name }}</h3>
       </div>
    </div>
</template>
<script>
import { useCommentStore } from '../../store/CommentStore';

export default {
    props: ['comment'],
    setup() {
        const commentStore = useCommentStore()

        return {commentStore}
    }
}
</script>
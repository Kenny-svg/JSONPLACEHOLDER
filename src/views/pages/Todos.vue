<script>
import TodoDetails from '../../components/todo/TodoDetails.vue';
import { useTodoStore } from '../../store/TodoStore';

export default {
    components: {TodoDetails},
    setup() {
        const todoStore = useTodoStore()

        //fetching the todos

        todoStore.getTodos()

        return {todoStore}
    }
}
</script>
<template>
    <!-- error -->
    <div v-if="todoStore.error">{{ todoStore.error }}</div>
     <!-- todo details -->
     <div class="mt-20">todos [{{ todoStore.todoTotals }}]</div>

     <!-- loading -->
     <div v-if="todoStore.loading">loading todos...</div>
     <div class="" v-for="todo in todoStore.todos" :key="todo.id">
     <TodoDetails :todo="todo" />
     </div>
</template>
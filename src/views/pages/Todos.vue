<script>
import TodoDetails from '../../components/todo/TodoDetails.vue';
import { useTodoStore } from '../../store/TodoStore';
import AddTodo from '../../components/todo/AddTodo.vue';
export default {
    components: {TodoDetails, AddTodo},
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
     <!-- add todo -->
        <div class="mt-20 text-center">
        <AddTodo  />
    </div>
     <!-- todo details -->
     <div class="mt-10 text-center font-bold text-3xl mb-5">todos [{{ todoStore.todoTotals }}]</div>

     <!-- loading -->
     <div v-if="todoStore.loading">loading todos...</div>
     <div class="" v-for="todo in todoStore.todos" :key="todo.id">
     <TodoDetails :todo="todo" />
     </div>
</template>
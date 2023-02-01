<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4" >
           <div class="bg-white shadow-2xl border-2">
                <p>{{ todo.id }}</p>
                <h3>{{ todo.title }}</h3>
                <p>{{ todo.completed }}</p>
           </div>
        </div>
    </template>
    <script>
    import {useTodoStore} from '../../store/TodoStore';
    
    export default {
        props: ['todo'],
        setup() {
            const todoStore = useTodoStore();
    
            return {todoStore}
        }
    }
    </script>
// ★STEP2
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
new Vue({
    el: '#app',
    data: {
        todos: [],
    },
    watch: {
        todos: {
            handler: function(todos){
                todoStorage.save(todos)
            },
            deep: true
        }
    }
    ,
    created(){
        this.todos = todoStorage.fetch()  
    },
    methods: {
        doAdd: function(event, value){
            var title = this.$refs.title
            var content = this.$refs.content
            if(!title.value.length || !content.value.length){
                return
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: title.value,
                content: content.value
            })
            title.value = ''
            content.value = ''
        },
        doRemove: function (item) {
            var index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    }
})
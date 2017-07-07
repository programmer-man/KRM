/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */


require('./bootstrap');

window.Vue = require('vue');
const flatpickr = require("flatpickr");

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));

new Vue({
    el: '#note-section',

    data: {
        notes: [],
        body: '',

    },

    methods: {
        addNote(userId, clientId, taskId) {
            axios.post('/note', {
                user_id: userId,
                client_id: clientId,
                task_id: taskId,
                body: this.body
            })
                .then(response => {
                    this.notes.push(response.data);
                    this.body = '';
                })
                .catch(function (error) {
                    alert("show the div");
                });

        },
        getTaskId() {
            var url = window.location.href.split('/');
            return url.pop();
        }
    },

    mounted() {
        axios.get('/task/' + this.getTaskId() + '/notes/').then(response => this.notes = response.data);
    }
});

flatpickr("#due_date", {
    altInput: true,
    allowInput: true
});

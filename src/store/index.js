import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

let b64DecodeUnicode = str =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''))

let parseJwt = token =>
    JSON.parse(
        b64DecodeUnicode(
            token.split('.')[1].replace('-', '+').replace('_', '/')
        )
    )

export default new Vuex.Store({
    state: {
        parseJwt,
        //регистрация - авторизация
        dialogRegistration: false,
        dialogAuthorization: false,
        //алерты при логине
        vBadLoginAlert: false,
        vNewLoginLoading: false,
        //все итемы
        items:{},
        //отсортированные итемы
        sortedItems:{},
        //окно добавления предмета
        dialogAddItem: false,
        editedItem:{},
        defaultItem:{},
        //инфа о предмете
        item:{
            name: '',
            description:'',
            price:'',
            image:''
        },
        //поисковик предметов
        textFieldSearchItem:'',
        //инфа о юзере
        user: {
            admin: false,
            username: 'testuser',
            password: '12345',
            email: ''
        }
    },
    mutations: {
        checkAdmin(state, roles) {
            state.user.admin = roles.includes("ROLE_ADMIN")
        },
        switchDialogs(state) {
            state.dialogRegistration = !state.dialogRegistration
            state.dialogAuthorization = !state.dialogAuthorization
        },
        updateDialogAuthorization(state, value) {
            state.dialogAuthorization = value
        },
        updateDialogRegistration(state, value) {
            state.dialogRegistration = value
        },
        updateDialogAdd(state, value){
            state.dialogAddItem = value
        },
        sortAllItems(state,value){
            state.sortedItems = state.items.filter(item => item.name.includes(value));
        }
    },
    actions: {
        AUTHORIZATION_USER({state, commit}) {
            state.vNewLoginLoading = true
            axios.post("http://localhost:9000/api/auth/login", {
                username: state.user['username'],
                password: state.user['password']
            })
                .then(response => {
                    let roles = state.parseJwt(response.data.token)["roles"];
                    commit('checkAdmin', roles)
                    state.dialogAuthorization = false
                    state.vBadLoginAlert = false;
                    state.vNewLoginLoading = false
                })
                .catch(error => {
                    console.log("ОШИБОЧКА ПРИ АВТОРИЗАЦИИ\n" + error)
                    state.vBadLoginAlert = true
                    state.vNewLoginLoading = false
                })
        },
        REGISTRATION_USER(){
            console.log("РЕГИСТРАЦИЯ ЕЩЕ НЕ РЕАЛИЗОВАНА")
        },
        ADD_ITEM({state}){
            state.editedItem = Object.assign({}, state.item)
            console.log(state.item)
            axios
                .post('http://localhost:9000/api/item/add', state.editedItem)
                .then(response => {
                    state.sortedItems = response.data
                })
                .catch(error => console.log(error))
        },
        LOADING_ITEMS({state}){
            axios
                .get('http://localhost:9000/api/item/')
                .then(response => {
                    state.items = response.data
                    state.items.forEach(n => n.show = true)
                    state.sortedItems  = state.items
                })
        }
    },
    modules: {},
})

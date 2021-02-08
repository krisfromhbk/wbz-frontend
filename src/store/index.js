import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/modules/auth";
import ui from "@/store/modules/ui";
import items from "@/store/modules/items";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        auth,
        ui,
        items,
    },
    strict: debug
})

// TODO: decide what to do with this parsing technics
// let b64DecodeUnicode = str =>
//     decodeURIComponent(
//         Array.prototype.map.call(atob(str), c =>
//             '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//         ).join(''))
//
// let parseJwt = token =>
//     JSON.parse(
//         b64DecodeUnicode(
//             token.split('.')[1].replace('-', '+').replace('_', '/')
//         )
//     )

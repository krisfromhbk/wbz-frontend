import {
    ADD_ITEM_ERROR,
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS, DELETE_ITEM_REQUEST, DELETE_ITEM_SUCCESS, UPDATE_ITEM_ERROR, UPDATE_ITEM_REQUEST, UPDATE_ITEM_SUCCESS,
    GET_ITEMS_ERROR,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS
} from "@/store/actions/items";
import {apiCall} from "@/utils/api";
import {UI_CLOSE_DIALOG} from "@/store/actions/ui";

const namespaced = true

const state = {status: '', items: []}

const mutations = {
    [GET_ITEMS_REQUEST]: (state) => {
        state.status = 'getting items'
    },
    [GET_ITEMS_SUCCESS]: (state, items) => {
        state.status = 'get success'
        state.items = items
    },
    [GET_ITEMS_ERROR]: (state) => {
        state.state = 'get error'
    },
    [ADD_ITEM_REQUEST]: (state) => {
        state.status = "adding item"
    },
    [ADD_ITEM_SUCCESS]: (state, newItems) => {
        state.status = "add success"
        state.items = newItems
    },
    [ADD_ITEM_ERROR]: (state) => {
        state.status = 'add error'
    },
    [UPDATE_ITEM_REQUEST]: (state) => {
        state.status = 'updating item'
    },
    [UPDATE_ITEM_SUCCESS]: (state, newItems) => {
        state.status = 'update success'
        state.items = newItems
    },
    [UPDATE_ITEM_ERROR]: (state) => {
        state.status = 'update error'
    },
    [DELETE_ITEM_REQUEST]: (state) => {
        state.status = 'deleting item'
    },
    [DELETE_ITEM_SUCCESS]: (state) => {
        state.status = 'delete success'
    },
    [DELETE_ITEM_REQUEST]: (state) => {
        state.status = 'delete error'
    }
}

const actions = {
    [GET_ITEMS_REQUEST]: async ({commit}) => {
        commit(GET_ITEMS_REQUEST)
        try {
            let items = await apiCall('item', 'get')
            // TODO: (optionally) retrieved items can be cached here
            commit(GET_ITEMS_SUCCESS, items)
        } catch (error) {
            // TODO: handle error in ui
            commit(GET_ITEMS_ERROR)
            console.error(GET_ITEMS_ERROR, error)
        }
    },

    [ADD_ITEM_REQUEST]: async ({commit, dispatch}, item) => {
        commit(ADD_ITEM_REQUEST)
        try {
            let newItems = await apiCall('item/add', 'post', item)
            // TODO: (optionally) potential cache update
            commit(ADD_ITEM_SUCCESS, newItems)
            dispatch('ui/' + UI_CLOSE_DIALOG, null, { root: true })
        } catch (error) {
            // TODO: handle error in ui
            commit(ADD_ITEM_ERROR)
            console.error(ADD_ITEM_ERROR, error)
        }
    },

    [UPDATE_ITEM_REQUEST]: async ({commit, dispatch}, item) => {
        commit(UPDATE_ITEM_REQUEST)
        try {
            let newItems = await apiCall('item/edit', 'post', item)
            // TODO: (optionally) potential cache update
            commit(UPDATE_ITEM_SUCCESS, newItems)
            dispatch('ui/' + UI_CLOSE_DIALOG, null, { root: true })
        } catch (error) {
            // TODO: handle error in ui
            commit(ADD_ITEM_ERROR)
            console.error(ADD_ITEM_ERROR, error)
        }
    },

    [DELETE_ITEM_REQUEST]: async ({commit, dispatch}, itemID) => {
        commit(DELETE_ITEM_REQUEST)
        try {
            let newItems = await apiCall('item/delete', 'post', itemID)
            // TODO: (optionally) potential cache update
            commit(DELETE_ITEM_SUCCESS, newItems)
            dispatch('ui/' + UI_CLOSE_DIALOG, null, { root: true })
        } catch (error) {
            // TODO: handle error in ui
            commit(ADD_ITEM_ERROR)
            console.error(ADD_ITEM_ERROR, error)
        }
    }
}

export default {
    namespaced,
    state,
    mutations,
    actions
}

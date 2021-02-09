import {
    AUTH_SIGNIN_ERROR,
    AUTH_SIGNIN_REQUEST,
    AUTH_SIGNIN_SUCCESS,
    AUTH_LOGOUT_ERROR,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_SIGNUP_ERROR,
    AUTH_SIGNUP_REQUEST,
    AUTH_SIGNUP_SUCCESS
} from "@/store/actions/auth";
import {apiCall} from "@/utils/api";
import {UI_CLOSE_DIALOG} from "@/store/actions/ui";

const namespaced = true

const state = {status: '', token: ''}

const getters = {
    isSigningIn: state => state.status === 'signing in',
    isSignInErrored: state => state.status === 'sign in error'
}

// TODO: (proposal) rewrite state status field as enum like ui/DialogType
const mutations = {
    [AUTH_SIGNIN_REQUEST]: (state) => {
        state.status = 'signing in'
    },
    [AUTH_SIGNIN_SUCCESS]: (state, token) => {
        state.status = 'sign in success'
        state.token = token
    },
    // TODO: add error description
    [AUTH_SIGNIN_ERROR]: (state) => {
        state.status = 'sign in error'
    },
    [AUTH_SIGNUP_REQUEST]: (state) => {
        state.status = 'signing up'
    },
    [AUTH_SIGNUP_SUCCESS]: (state, token) => {
        state.status = 'sign up success'
        state.token = token
    },
    // TODO: add error description
    [AUTH_SIGNUP_ERROR]: (state) => {
        state.status = 'sign up error'
    },
    [AUTH_LOGOUT_REQUEST]: (state) => {
        state.status = 'signing out'
    },
    [AUTH_LOGOUT_SUCCESS]: (state) => {
        state.status = 'sign out success'
        state.token = ''
    },
    // TODO: add error description
    [AUTH_LOGOUT_ERROR]: (state) => {
        state.status = 'sign out error'
    }
}

const actions = {
    [AUTH_SIGNIN_REQUEST]: async ({commit}, userLogin) => {
        commit(AUTH_SIGNIN_REQUEST)
        try {
            let response = await apiCall('auth/login', 'post', userLogin)
            commit(AUTH_SIGNIN_SUCCESS, response.token)
            commit('ui/' + UI_CLOSE_DIALOG, null, { root: true })
        } catch (error) {
            // TODO: handle error in ui in ui
            commit(AUTH_SIGNIN_ERROR)
            console.error(AUTH_SIGNIN_REQUEST, error)
        }
    },

    [AUTH_SIGNUP_REQUEST]: async ({commit}, userSignup) => {
        commit(AUTH_SIGNUP_REQUEST)
        try {
            let response = await apiCall('register', 'post', userSignup)
            commit(AUTH_SIGNUP_SUCCESS, response.token)
            commit('ui/' + UI_CLOSE_DIALOG, null, { root: true })
        } catch (error) {
            // TODO: handle error in ui
            commit(AUTH_SIGNUP_ERROR)
            console.error(AUTH_SIGNUP_REQUEST, error)
        }
    },

    [AUTH_LOGOUT_REQUEST]: async ({commit}) => {
        commit(AUTH_LOGOUT_REQUEST)
        // TODO: clear other state modules if needed
        try {
            // TODO: token revocation api call
            commit(AUTH_LOGOUT_SUCCESS)
        } catch (error) {
            // TODO: handle error in ui
            commit(AUTH_LOGOUT_ERROR)
            console.error(AUTH_LOGOUT_REQUEST, error)
        }
    }
}

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
}

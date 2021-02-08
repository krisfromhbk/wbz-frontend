import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
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

// TODO: add getters like isLogging and isSigningUp (boolean) to make buttons disabled

// TODO: (proposal) rewrite state status field as enum like ui/DialogType
const mutations = {
    [AUTH_LOGIN_REQUEST]: (state) => {
        state.status = 'logging in'
    },
    [AUTH_LOGIN_SUCCESS]: (state, token) => {
        state.status = 'login success'
        state.token = token
    },
    // TODO: add error description
    [AUTH_LOGIN_ERROR]: (state) => {
        state.status = 'login error'
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
        state.status = 'logging out'
    },
    [AUTH_LOGOUT_SUCCESS]: (state) => {
        state.status = 'logout success'
        state.token = ''
    },
    // TODO: add error description
    [AUTH_LOGOUT_ERROR]: (state) => {
        state.status = 'logout error'
    }
}

const actions = {
    [AUTH_LOGIN_REQUEST]: async ({commit, dispatch}, userLogin) => {
        commit(AUTH_LOGIN_REQUEST)
        try {
            let response = await apiCall('auth/login', 'post', userLogin)
            commit(AUTH_LOGIN_SUCCESS, response.token)
            dispatch('ui/' + UI_CLOSE_DIALOG, null, { root: true })
        } catch (error) {
            // TODO: handle error in ui in ui
            commit(AUTH_LOGIN_ERROR)
            console.error(AUTH_LOGIN_REQUEST, error)
        }
    },

    [AUTH_SIGNUP_REQUEST]: async ({commit, dispatch}, userSignup) => {
        commit(AUTH_SIGNUP_REQUEST)
        try {
            let response = await apiCall('register', 'post', userSignup)
            commit(AUTH_SIGNUP_SUCCESS, response.token)
            dispatch('ui/' + UI_CLOSE_DIALOG, null, { root: true })
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
    mutations,
    actions
}

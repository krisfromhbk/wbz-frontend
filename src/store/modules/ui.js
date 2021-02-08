import {UI_CLOSE_DIALOG, UI_OPEN_DIALOG} from "@/store/actions/ui";

export class DialogType {
    static none = new DialogType('none')
    static login = new DialogType('login')
    static signup = new DialogType('signup')
    static addItem = new DialogType('addItem')
    static deleteItem = new DialogType('deleteItem')
    static editItem = new DialogType('editItem')

    constructor(name) {
        this.name = name
    }

    // mainly for logging purposes
    toString() {
        return `Dialog.${this.name}`
    }
}

const namespaced = true

// TODO: add a field for search input
const state = { viewLeftMenu: false, dialog: DialogType.none }

const mutations = {
    [UI_CLOSE_DIALOG]: (state) => {
        state.dialog = DialogType.none
    },
    [UI_OPEN_DIALOG]: (state, dialogType) => {
        state.dialog = dialogType
    }
}

export default {
    namespaced,
    state,
    mutations
}

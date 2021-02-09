<template>
  <div>
    <v-dialog
        :value="isDialogActive"
        temporary
        max-width="600px"
        @click:outside="closeDialog"
        @keydown.esc="closeDialog"
    >

      <v-card
          :loading="this.isSigningIn()">
        <v-card-title>
          <span class="headline">Авторизация</span>
        </v-card-title>
        <v-alert type="error" v-if="this.isSignInErrored()">
          Ошибка - введите верный логин или пароль.
        </v-alert>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Логин*"
                    required
                    v-model="username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Пароль*"
                    type="password"
                    required
                    v-model="password"
                ></v-text-field>
              </v-col>

            </v-row>
          </v-container>
          <small>*обьязательные поля</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="closeDialog"
          >
            Закрыть
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="switchToSignUp"
          >
            Зарегистрироваться
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="signIn"
          >
            Войти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import {UI_CLOSE_DIALOG, UI_OPEN_DIALOG} from "@/store/actions/ui";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import {AUTH_SIGNIN_REQUEST} from "@/store/actions/auth";
import {DialogType} from "@/store/modules/ui";

export default {
  name: "DialogAuthorization",

  data() {
    return {
      username: '',
      password: ''
    }
  },

  computed: {
    ...mapState('ui', ['dialog']),
    isDialogActive: function () {
      return this.dialog === DialogType.login
    }
  },

  methods: {
    ...mapActions('auth', [AUTH_SIGNIN_REQUEST]),
    ...mapGetters('auth', ['isSigningIn', 'isSignInErrored']),
    ...mapMutations('ui', [UI_CLOSE_DIALOG, UI_OPEN_DIALOG]),
    closeDialog() {
      this.UI_CLOSE_DIALOG()
    },
    signIn() {
      // TODO: validate form
      const {username, password} = this
      this.AUTH_SIGNIN_REQUEST({username, password})
    },
    switchToSignUp() {
      this.UI_OPEN_DIALOG(DialogType.signup)
    }
  }
}
</script>

<style scoped>

</style>
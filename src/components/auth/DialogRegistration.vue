<template>
  <div>
    <v-dialog
        v-model="registration"
        temporary
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Регистрация</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                  cols="12"
              >
                <v-text-field
                    label="Имя*"
                    required
                    v-model="username"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Почта*"
                    required
                    v-model="email"
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
          <small>*обязательные поля</small>
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
              @click="switchToLogin"
          >
            Войти
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="signUp"
          >
            Зарегистрироваться
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import {UI_CLOSE_DIALOG, UI_OPEN_DIALOG} from "@/store/actions/ui";
import {AUTH_SIGNUP_REQUEST} from "@/store/actions/auth";
import {DialogType} from '@/store/modules/ui'

export default {
  name: "DialogRegistration",

  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },

  methods: {
    ...mapActions('auth', [AUTH_SIGNUP_REQUEST]),
    ...mapMutations('ui', [UI_CLOSE_DIALOG, UI_OPEN_DIALOG]),
    closeDialog () {
      this.UI_CLOSE_DIALOG()
    },
    signUp () {
      // TODO: validate form
      const { username, email, password } = this
      this.AUTH_SIGNUP_REQUEST({ username, email, password })
    },
    switchToLogin () {
      this.UI_OPEN_DIALOG(DialogType.login)
    }
  }
}
</script>

<style scoped>

</style>
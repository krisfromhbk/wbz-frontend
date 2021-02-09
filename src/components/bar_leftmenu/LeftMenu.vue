<template>
  <v-navigation-drawer
      :value="isLeftMenuActive"
      absolute
      temporary
      width="180px"
      @input="toggle"
  >

    <v-list
        nav
        dense
    >
      <v-list-item-group

          active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <v-avatar

              color="indigo"
                    size=145
          >
            <img src="https://yt3.ggpht.com/ytc/AAUvwnhEP6kqF4b1lDgYuwv9AsrcxO_Si95dcagC_8tw2g=s900-c-k-c0x00ffffff-no-rj">
          </v-avatar>
        </v-list-item>
        <v-list-item class="mt-8" to="/user{id}">
          <v-list-item-icon>
            <v-icon>mdi-account-edit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Username</v-list-item-title>
        </v-list-item>
        <v-list-item
        >
          <v-list-item-icon>
            <v-icon>mdi-exit-run</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Выйти</v-list-item-title>
        </v-list-item>

        <v-list-item
            class="mt-8"
            to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-item to="/shop">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Магазин</v-list-item-title>
        </v-list-item>
        <v-list-item to="/cart">
          <v-list-item-icon>
            <v-icon>mdi-cart</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Корзина</v-list-item-title>
        </v-list-item>
        <v-list-item to="/about">
          <v-list-item-icon>
            <v-icon>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Контакты</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import {UI_TOGGLE_LEFT_MENU} from "@/store/actions/ui";

export default {
name: "LeftMenu",
  computed: mapState('ui', ['isLeftMenuActive']),

  methods: {
    ...mapMutations('ui', [UI_TOGGLE_LEFT_MENU]),
    toggle(e) {
      // v-navigation-drawer on outside click emits an event with false as payload
      if (!e) {
        this.UI_TOGGLE_LEFT_MENU()
      }
    }
  }
}
</script>

<style scoped>

</style>
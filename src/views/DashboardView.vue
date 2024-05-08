<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="menuOpen = !menuOpen"></v-app-bar-nav-icon>
      <v-toolbar-title>Sistema de Control Eventos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template #activator="{ props }">
          <v-btn v-bind="props" @click="props.onClick">
            <v-icon>mdi-account-circle</v-icon>
            {{ username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer app v-model="menuOpen" color="primary">
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/events">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Eventos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/users">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/auth.service'

const menuOpen = ref(true)
const router = useRouter()
const user = authService.getCurrentUser()
const username = user.userName

const logout = () => {
  authService.logout()
  router.push('/login')
}
</script>

<style scoped>
/* Aquí puedes agregar estilos personalizados si lo deseas */
</style>

<template>
  <div>
    <h2 align="center">Sistema de Control de Eventos</h2>
    <form @submit.prevent="register">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="text-center">Registro de Usuario</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="register">
                  <v-text-field v-model="user.userName" label="Usuario" required></v-text-field>
                  <v-text-field v-model="user.email" label="Email" required></v-text-field>
                  <v-text-field
                    v-model="user.password"
                    label="Contraseña"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="primary" block>Registrarse</v-btn>
                  <v-btn @click="redirectToLogin" color="secundary" block>Iniciar Sesión</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import userService from '../services/user.service'
import { ref } from 'vue'
import type { UserCreate } from '../types/user-create.interface'

const router = useRouter()
const user = ref<UserCreate>({
  userName: '',
  email: '',
  password: ''
})

const register = () => {
  userService
    .createUser(user.value)
    .then(() => {
      router.push('/login')
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error)
    })
}

const redirectToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.fill-height {
  height: 100%;
}
</style>

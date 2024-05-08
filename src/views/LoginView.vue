<template>
  <div>
    <h2 align="center">Sistema de Control de Eventos</h2>
    <form align="center" @submit.prevent="login">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-card-title class="text-center">Iniciar sesión</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <v-text-field v-model="email" label="Email" required></v-text-field>
                  <v-text-field
                    v-model="password"
                    label="Contraseña"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn type="submit" color="primary" block>Iniciar sesión</v-btn>
                  <v-btn @click="redirectToRegister" color="secundary" block
                    >Registro de Usuario</v-btn
                  >
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
import authService from '../services/auth.service'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  authService
    .login(email.value, password.value)
    .then(() => {
      router.push('/')
    })
    .catch((error) => {
      console.error('Error al iniciar sesión:', error)
    })
}
const redirectToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.fill-height {
  height: 100%;
}
</style>

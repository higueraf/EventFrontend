<template>
  <v-container>
    <v-snackbar
      v-model="showNotification"
      :timeout="timeoutMsg"
      location="right top"
      :multi-line="true"
      :vertical="true"
      :color="colorMsg"
    >
      {{ notificationMessage }}
      <v-btn v-if="showBtnYes" color="success" @click="confirmDelete"> Sí </v-btn>
      <v-btn v-if="showBtnNo" @click="cancelDelete"> No </v-btn>
    </v-snackbar>

    <v-dialog v-model="showAddUserModal" max-width="600px">
      <v-card>
        <v-card-title>{{ userId === 0 ? 'Agregar' : 'Editar' }} Evento</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveUser">
            <v-text-field v-model="newUser.userName" label="Nombre de Usuario"></v-text-field>
            <v-text-field v-model="newUser.email" label="Email"></v-text-field>
            <v-text-field type="password" v-model="newUser.email" label="Password"></v-text-field>
            <v-btn type="submit" color="primary">{{ userId === 0 ? 'Agregar' : 'Editar' }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>Lista de Usuarios</v-card-title>

      <v-row class="justify-end">
        <v-col cols="auto">
          <v-btn color="primary" @click="addUserShow">Agregar Usuario</v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-simple-table class="custom-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombre de Usuario</th>
                <th class="text-left">Correo electrónico</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userId">
                <td>{{ user.userName }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <v-btn icon @click="editUserModal(user)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="showDeleteConfirmMsg(user)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @input="loadUsers"
      rounded="circle"
      @click="handlePageClick"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import UserService from '../services/user.service'
import type { User } from '@/types/user.interface'
import type { UserCreate } from '@/types/user-create.interface'

const users = ref<User[]>([])
const newUser = ref<UserCreate>({
  userName: '',
  email: '',
  password: ''
})
const showAddUserModal = ref(false)
const numRecordsPage = ref(10)
const totalRecords = ref(0)
const currentPage = ref(1)
const order = ref('desc')
const sort = ref('UserId')
const userId = ref<number>(0)
const notificationMessage = ref('')
const showNotification = ref(false)
const showBtnYes = ref(false)
const showBtnNo = ref(false)
const timeoutMsg = ref(3000)
const colorMsg = ref('deep-orange-darken-4')

const loadUsers = async () => {
  try {
    console.log('loadUsers')
    const response = await UserService.getUsers(
      currentPage.value,
      numRecordsPage.value,
      order.value,
      sort.value
    )
    users.value = response.data.items
    totalRecords.value = response.data.totalRecords
  } catch (error) {
    console.error('Error al cargar las ocurrencias:', error)
  }
}
const handlePageClick = async () => {
  await loadUsers()
}
const addUserShow = async () => {
  newUser.value = {
    userName: '',
    email: '',
    password: ''
  }
  userId.value = 0
  showAddUserModal.value = true
}

const saveUser = async () => {
  if (userId.value === 0) {
    await UserService.createUser(newUser.value)
    notificationMessage.value = 'Evento agregado exitosamente'
  } else {
    await UserService.updateUser(userId.value.toString(), newUser.value)
    notificationMessage.value = 'Evento editado exitosamente'
  }
  userId.value = 0
  showAddUserModal.value = false
  timeoutMsg.value = 3000
  colorMsg.value = 'success'
  loadUsers()
  showNotification.value = true
}
const showDeleteConfirmMsg = async (user: User) => {
  notificationMessage.value = 'Eliminar registro'
  userId.value = user.userId
  showNotification.value = true
  showBtnNo.value = true
  showBtnYes.value = true
  timeoutMsg.value = 5000
  colorMsg.value = 'deep-orange-darken-4'
}

const editUserModal = async (user: User) => {
  newUser.value = {
    userName: user.userName,
    email: user.email,
    password: user.password
  }
  showAddUserModal.value = true
  userId.value = user.userId
}
const cancelDelete = async () => {
  showNotification.value = false
  showBtnNo.value = false
  showBtnYes.value = false
  timeoutMsg.value = 3000
}
const confirmDelete = async () => {
  await UserService.deleteUser(userId.value.toString())
  loadUsers()
  showNotification.value = false
  showBtnNo.value = false
  showBtnYes.value = false
  timeoutMsg.value = 30000
}

onMounted(() => {
  loadUsers()
})

const totalPages = computed(() => Math.ceil(totalRecords.value / numRecordsPage.value))
</script>

<style scoped>
.card-container {
  width: 100%;
}
.custom-table {
  border-collapse: collapse;
  width: 100%;
}

.custom-table th,
.custom-table td {
  padding: 8px;
}

.custom-table th {
  background-color: #f5f5f5;
  text-align: left;
}
</style>

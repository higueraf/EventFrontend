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

    <v-dialog v-model="showAddOccurrenceModal" max-width="600px">
      <v-card>
        <v-card-title>{{ occurrenceId === 0 ? 'Agregar' : 'Editar' }} Evento</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveOccurrence">
            <v-text-field
              v-model="newOccurrence.OccurrenceDate"
              label="Fecha de Evento"
              type="date"
            ></v-text-field>
            <v-text-field v-model="newOccurrence.Spot" label="Lugar"></v-text-field>
            <v-text-field v-model="newOccurrence.Description" label="Descripción"></v-text-field>
            <v-text-field v-model="newOccurrence.Price" label="Precio" type="number"></v-text-field>
            <v-btn type="submit" color="primary">{{
              occurrenceId === 0 ? 'Agregar' : 'Editar'
            }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>Lista de Eventos</v-card-title>

      <v-row class="justify-end">
        <v-col cols="auto">
          <v-btn color="primary" @click="addOccurrenceShow">Agregar Evento</v-btn>
        </v-col>
      </v-row>
      <v-card-text>
        <v-simple-table class="custom-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Fecha</th>
                <th class="text-left">Lugar</th>
                <th class="text-left">Descripción</th>
                <th class="text-left">Precio</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="occurrence in occurrences" :key="occurrence.occurrenceId">
                <td>{{ occurrence.occurrenceDate }}</td>
                <td>{{ occurrence.spot }}</td>
                <td>{{ occurrence.description }}</td>
                <td>{{ occurrence.price }}</td>
                <td>
                  <v-btn icon @click="editOccurrenceModal(occurrence)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="showDeleteConfirmMsg(occurrence)">
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
      @input="loadOccurrences"
      rounded="circle"
      @click="handlePageClick"
    ></v-pagination>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import OccurrenceService from '../services/occurrence.service'
import type { Occurrence } from '@/types/occurrence.interface'
import type { OccurrenceCreate } from '@/types/occurrence-create.interface'

const occurrences = ref<Occurrence[]>([])
const newOccurrence = ref<OccurrenceCreate>({
  OccurrenceDate: null,
  Spot: '',
  Description: '',
  Price: 0
})
const showAddOccurrenceModal = ref(false)
const numRecordsPage = ref(10)
const totalRecords = ref(0)
const currentPage = ref(1)
const order = ref('desc')
const sort = ref('OccurrenceId')
const occurrenceId = ref<number>(0)
const notificationMessage = ref('')
const showNotification = ref(false)
const showBtnYes = ref(false)
const showBtnNo = ref(false)
const timeoutMsg = ref(3000)
const colorMsg = ref('deep-orange-darken-4')

const loadOccurrences = async () => {
  try {
    console.log('loadOccurrences')
    const response = await OccurrenceService.getOccurrences(
      currentPage.value,
      numRecordsPage.value,
      order.value,
      sort.value
    )
    occurrences.value = response.data.items
    totalRecords.value = response.data.totalRecords
  } catch (error) {
    console.error('Error al cargar las ocurrencias:', error)
  }
}
const handlePageClick = async () => {
  await loadOccurrences()
}
const addOccurrenceShow = async () => {
  newOccurrence.value = {
    OccurrenceDate: null,
    Spot: '',
    Description: '',
    Price: 0
  }
  occurrenceId.value = 0
  showAddOccurrenceModal.value = true
}

const saveOccurrence = async () => {
  if (occurrenceId.value === 0) {
    await OccurrenceService.createOccurrence(newOccurrence.value)
    notificationMessage.value = 'Evento agregado exitosamente'
  } else {
    await OccurrenceService.updateOccurrence(occurrenceId.value.toString(), newOccurrence.value)
    notificationMessage.value = 'Evento editado exitosamente'
  }
  occurrenceId.value = 0
  showAddOccurrenceModal.value = false
  timeoutMsg.value = 3000
  colorMsg.value = 'success'
  loadOccurrences()
  showNotification.value = true
}
const showDeleteConfirmMsg = async (occurrence: Occurrence) => {
  notificationMessage.value = 'Eliminar registro'
  occurrenceId.value = occurrence.occurrenceId
  showNotification.value = true
  showBtnNo.value = true
  showBtnYes.value = true
  timeoutMsg.value = 5000
  colorMsg.value = 'deep-orange-darken-4'
}

const editOccurrenceModal = async (occurrence: Occurrence) => {
  newOccurrence.value = {
    OccurrenceDate: occurrence.occurrenceDate,
    Spot: occurrence.spot,
    Description: occurrence.description,
    Price: occurrence.price
  }
  showAddOccurrenceModal.value = true
  occurrenceId.value = occurrence.occurrenceId
}
const cancelDelete = async () => {
  showNotification.value = false
  showBtnNo.value = false
  showBtnYes.value = false
  timeoutMsg.value = 3000
}
const confirmDelete = async () => {
  await OccurrenceService.deleteOccurrence(occurrenceId.value.toString())
  loadOccurrences()
  showNotification.value = false
  showBtnNo.value = false
  showBtnYes.value = false
  timeoutMsg.value = 30000
}

onMounted(() => {
  loadOccurrences()
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

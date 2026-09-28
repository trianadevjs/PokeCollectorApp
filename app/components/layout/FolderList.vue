<script setup lang="ts">
// Interfaces de Tipos
export interface Folder {
  id: string
  name: string
  icon: string
  colorClass: string
}

export interface PokemonCard {
  id: string
  folderId: string
  [key: string]: any
}

// 1. Props recibidas
const props = defineProps<{
  folders: Folder[]
  cards: PokemonCard[]
}>()

// 2. Evento para emitir la acción de crear carpeta
const emit = defineEmits<{
  (e: 'create-folder'): void
}>()

// 3. Dos vías de enlace (v-model) con el id de la carpeta seleccionada mediante defineModel
const selectedFolderId = defineModel<string>({ default: 'all' })

// Conteo automático de cartas por carpeta
const getFolderCardCount = (folderId: string) => {
  if (folderId === 'all') {
    return props.cards.length
  }
  return props.cards.filter(card => card.folderId === folderId).length
}
</script>

<template>
  <div class="card bg-slate-800 border-slate-700 p-3 rounded-3 shadow-sm">
    <!-- Encabezado -->
    <div class="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-slate-700">
      <h5 class="m-0 fw-bold text-warning d-flex align-items-center gap-2">
        <i class="bi bi-folder-fill"></i> Carpetas
      </h5>
      <span class="badge bg-slate-700 text-slate-300">{{ folders.length }}</span>
    </div>

    <!-- Lista de Carpetas -->
    <div class="nav nav-pills flex-column gap-1">
      <button
        v-for="folder in folders"
        :key="folder.id"
        type="button"
        class="nav-link text-start d-flex align-items-center justify-content-between py-2.5 px-3 rounded-2 transition-all"
        :class="{
          'active': selectedFolderId === folder.id,
          'text-slate-300': selectedFolderId !== folder.id
        }"
        @click="selectedFolderId = folder.id"
      >
        <span class="d-flex align-items-center gap-2">
          <i :class="['bi', folder.icon, folder.colorClass]"></i>
          <span class="text-truncate">{{ folder.name }}</span>
        </span>
        <span 
          class="badge rounded-pill text-xs px-2.5 py-1"
          :class="selectedFolderId === folder.id 
            ? 'bg-amber-700 text-white' 
            : 'bg-slate-900 border border-slate-700 text-slate-400'"
        >
          {{ getFolderCardCount(folder.id) }}
        </span>
      </button>
    </div>

    <!-- Botón Crear Nueva Carpeta -->
    <button 
      type="button"
      class="btn btn-outline-warning btn-sm mt-4 w-100 d-flex align-items-center justify-content-center gap-2 py-2"
      @click="emit('create-folder')"
    >
      <i class="bi bi-folder-plus"></i>
      <span>Nueva Carpeta</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.bg-slate-800 { background-color: #1e293b; }
.bg-slate-700 { background-color: #334155; }
.bg-slate-900 { background-color: #0f172a; }
.border-slate-700 { border-color: #334155 !important; }
.text-slate-300 { color: #cbd5e1; }
.text-slate-400 { color: #94a3b8; }
.bg-amber-700 { background-color: #b45309; }

.nav-link {
  color: #cbd5e1;
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #334155;
    color: #ffffff;
  }

  &.active {
    background-color: #f59e0b !important;
    color: #000000 !important;
    font-weight: 600;
  }
}
</style>
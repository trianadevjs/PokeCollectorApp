<script setup lang="ts">
import { ref } from 'vue'

const isMobileSidebarOpen = ref(false)

const toggleSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}
</script>

<template>
  <div>
    <!-- NAV SUPERIOR (Desktop y Cabecera Móvil) -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom sticky-top shadow-sm">
      <div class="container-fluid px-3 px-lg-4">
        <!-- Botón Toggle para Móvil -->
        <button 
          class="btn btn-dark-custom d-lg-none me-2" 
          @click="toggleSidebar"
          aria-label="Abrir menú"
        >
          <i class="bi bi-list fs-4 text-white"></i>
        </button>

        <!-- Brand / Logotipo -->
        <a class="navbar-brand d-flex align-items-center gap-2 fw-bold me-auto me-lg-4 text-white" href="#">
          <i class="bi bi-collection-fill text-warning fs-4"></i>
          <span>Poke<span class="text-warning">Vault</span> TCG</span>
        </a>

        <!-- Buscador en el Navbar (Escritorio) -->
        <div class="search-box me-3 d-none d-lg-block flex-grow-1 max-w-400">
          <div class="input-group">
            <span class="input-group-text bg-dark border-secondary text-secondary">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control bg-dark border-secondary text-white custom-input" 
              placeholder="Buscar Pokémon, expansión, rareza..."
            >
          </div>
        </div>

        <!-- Acciones Rápidas -->
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-warning text-dark fw-bold d-flex align-items-center gap-2">
            <i class="bi bi-plus-circle-fill"></i>
            <span class="d-none d-sm-inline">Nueva Carta</span>
          </button>
          <button class="btn btn-dark-custom position-relative" title="Estadísticas">
            <i class="bi bi-pie-chart-fill text-white"></i>
          </button>
        </div>
      </div>
    </nav>

    <!-- SIDEBAR MÓVIL (Menú Desplegable Lateral) -->
    <div class="offcanvas-sidebar d-lg-none" :class="{ show: isMobileSidebarOpen }">
      <div class="offcanvas-header border-bottom border-secondary p-3 d-flex justify-content-between align-items-center">
        <h5 class="m-0 fw-bold text-warning">
          <i class="bi bi-folder-fill me-2"></i>Mis Carpetas
        </h5>
        <button class="btn-close btn-close-white" @click="toggleSidebar"></button>
      </div>
      <div class="offcanvas-body p-3">
        <!-- Buscador en Móvil -->
        <div class="input-group mb-3">
          <span class="input-group-text bg-dark border-secondary text-secondary">
            <i class="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            class="form-control bg-dark border-secondary text-white custom-input" 
            placeholder="Buscar..."
          >
        </div>

        <!-- Lista de Carpetas -->
        <div class="nav nav-pills flex-column gap-1 mb-4">
          <a class="nav-link active" href="#">
            <i class="bi bi-grid-fill me-2"></i>Todas las Cartas
            <span class="badge bg-secondary rounded-pill float-end">12</span>
          </a>
          <a class="nav-link text-white-50" href="#">
            <i class="bi bi-star-fill me-2 text-warning"></i>Más Raras (SIR)
            <span class="badge bg-dark border border-secondary rounded-pill float-end">3</span>
          </a>
          <a class="nav-link text-white-50" href="#">
            <i class="bi bi-folder2-open me-2 text-info"></i>Expansión 151
            <span class="badge bg-dark border border-secondary rounded-pill float-end">5</span>
          </a>
          <a class="nav-link text-white-50" href="#">
            <i class="bi bi-folder2-open me-2 text-danger"></i>Colección Charizard
            <span class="badge bg-dark border border-secondary rounded-pill float-end">2</span>
          </a>
        </div>

        <button class="btn btn-outline-warning btn-sm w-100">
          <i class="bi bi-folder-plus me-1"></i>Crear Nueva Carpeta
        </button>
      </div>
    </div>

    <!-- OVERLAY MÓVIL (Fondo Oscuro al abrir el sidebar) -->
    <div 
      class="sidebar-overlay d-lg-none" 
      :class="{ show: isMobileSidebarOpen }"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
/* Estilos del Navbar */
.navbar {
  background-color: rgba(15, 23, 42, 0.95) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #334155 !important;
}

.max-w-400 {
  max-width: 400px;
}

/* Forzar colores de texto en los inputs */
.custom-input {
  color: #f8fafc !important;

  &::placeholder {
    color: #94a3b8 !important;
  }

  &:focus {
    background-color: #0f172a !important;
    border-color: #f59e0b !important;
    box-shadow: 0 0 0 0.25rem rgba(245, 158, 11, 0.25) !important;
  }
}

.btn-dark-custom {
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #f8fafc;
  transition: all 0.2s ease;

  &:hover {
    background-color: #334155;
    color: #ffffff;
  }
}

/* Sidebar en Móvil */
.offcanvas-sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  background-color: #0f172a;
  border-right: 1px solid #334155;
  z-index: 1050;
  transition: left 0.3s ease;

  &.show {
    left: 0;
  }
}

/* Overlay del sidebar */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1040;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  &.show {
    opacity: 1;
    visibility: visible;
  }
}

/* Enlaces del menú lateral */
.nav-link {
  border-radius: 8px;
  padding: 10px 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  &.active {
    background-color: #f59e0b !important;
    color: #000000 !important;
    font-weight: 600;
  }
}
</style>
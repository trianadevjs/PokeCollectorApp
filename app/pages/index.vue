<script setup lang="ts">
import { ref, computed } from 'vue'

// Definición de tipos
interface PokemonCard {
  id: string
  name: string
  number: string
  expansion: string
  rarity: string
  type: string
  folderId: string
  image: string
  price: number
}

interface Folder {
  id: string
  name: string
  icon: string
  colorClass: string
}

// ESTADO DE LA API / DATOS
// Cambia `isLoading` o vacía `cards` para probar los placeholders
const isLoading = ref(false)

// Carpetas de la colección
    const folders = ref([
    { id: 'all', name: 'Todas las Cartas', icon: 'bi-grid-fill', colorClass: 'text-warning' },
    { id: 'raras', name: 'Más Raras (SIR)', icon: 'bi-star-fill', colorClass: 'text-warning' },
    { id: 'exp151', name: 'Expansión 151', icon: 'bi-folder2-open', colorClass: 'text-info' },
    { id: 'charizard', name: 'Colección Charizard', icon: 'bi-fire', colorClass: 'text-danger' }
    ])

// Lista de cartas (Simulación de respuesta de API)
const cards = ref<PokemonCard[]>([
  {
    id: '1',
    name: 'Charizard ex',
    number: '223/197',
    expansion: 'Obsidian Flames',
    rarity: 'Special Illustration Rare',
    type: 'Fuego',
    folderId: 'charizard',
    image: 'https://images.pokemontcg.io/sv3/223_hires.png',
    price: 85.50
  },
  {
    id: '2',
    name: 'Mew ex',
    number: '205/165',
    expansion: '151',
    rarity: 'Ultra Rare',
    type: 'Psíquico',
    folderId: 'exp151',
    image: 'https://images.pokemontcg.io/sv3pt5/205_hires.png',
    price: 32.00
  },
  {
    id: '3',
    name: 'Gengar VMAX',
    number: '271/264',
    expansion: 'Fusion Strike',
    rarity: 'Secret Rare',
    type: 'Oscuro',
    folderId: 'raras',
    image: 'https://images.pokemontcg.io/swsh8/271_hires.png',
    price: 190.00
  },
  {
    id: '4',
    name: 'Blastoise ex',
    number: '200/165',
    expansion: '151',
    rarity: 'Special Illustration Rare',
    type: 'Agua',
    folderId: 'exp151',
    image: 'https://images.pokemontcg.io/sv3pt5/200_hires.png',
    price: 48.00
  }
])

// FILTROS Y BÚSQUEDA
const selectedFolder = ref<string>('all')
const searchQuery = ref<string>('')
const selectedRarity = ref<string>('all')

// Filtro Reactivo de Cartas
const filteredCards = computed(() => {
  return cards.value.filter(card => {
    const matchesFolder = selectedFolder.value === 'all' || card.folderId === selectedFolder.value
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          card.expansion.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRarity = selectedRarity.value === 'all' || card.rarity === selectedRarity.value

    return matchesFolder && matchesSearch && matchesRarity
  })
})

// Cálculo del valor total
const totalValue = computed(() => {
  return filteredCards.value.reduce((acc, card) => acc + card.price, 0).toFixed(2)
})

    // Acción al presionar "Nueva Carpeta"
    const handleCreateFolder = () => {
      console.log('Abrir modal de creación de carpeta')
    }

// Efecto 3D / Holo en Hover
const handleMouseMove = (e: MouseEvent, cardId: string) => {
  const cardElement = e.currentTarget as HTMLElement
  const rect = cardElement.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const rotateX = ((y - centerY) / centerY) * -12
  const rotateY = ((x - centerX) / centerX) * 12

  cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
}

const handleMouseLeave = (e: MouseEvent) => {
  const cardElement = e.currentTarget as HTMLElement
  cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}
</script>

<template>
  <main class="container-fluid px-3 px-lg-4 py-4 min-vh-100 bg-slate-900 text-white">
    <div class="row g-4">
      
      <!-- SIDEBAR DE ESCRITORIO -->
            <aside class="col-lg-3 d-none d-lg-block">
            <div class="sticky-top top-80">
                <LayoutFolderList 
                v-model="selectedFolder"
                :folders="folders"
                :cards="cards"
                @create-folder="handleCreateFolder"
                />
            </div>
            </aside>

      <!-- ÁREA PRINCIPAL: BARRA DE FILTROS Y GRID DE CARTAS -->
      <section class="col-12 col-lg-9">
        
        <!-- RESUMEN Y CONTROLES -->
        <div class="card bg-slate-800 border-slate-700 p-3 mb-4 rounded-3">
          <div class="row align-items-center g-3">
            
            <!-- Contador de Cartas y Valor -->
            <div class="col-12 col-md-5">
              <h4 class="fw-bold mb-1 d-flex align-items-center gap-2">
                <span class="text-white">Colección</span>
                <span class="badge bg-warning text-dark fs-6">{{ filteredCards.length }} cartas</span>
              </h4>
              <p class="text-slate-400 small m-0">
                Valor estimado: <strong class="text-success">${{ totalValue }} USD</strong>
              </p>
            </div>

            <!-- Filtros Rápidos -->
            <div class="col-12 col-md-7 d-flex gap-2">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control bg-slate-900 border-slate-700 text-white custom-input"
                placeholder="Filtrar por nombre o set..."
              >

              <select v-model="selectedRarity" class="form-select bg-slate-900 border-slate-700 text-white w-auto custom-select">
                <option value="all">Todas las Rarezas</option>
                <option value="Special Illustration Rare">Special Illus. Rare</option>
                <option value="Ultra Rare">Ultra Rare</option>
                <option value="Secret Rare">Secret Rare</option>
              </select>
            </div>

          </div>
        </div>

        <!-- 1. ESTADO DE CARGA (SKELETON LOADING) -->
        <div v-if="isLoading" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
          <div v-for="n in 8" :key="n" class="col">
            <div class="card bg-slate-800 border-slate-700 p-2 h-100 skeleton-card">
              <div class="skeleton-img mb-2 rounded-2"></div>
              <div class="skeleton-text mb-1 w-75"></div>
              <div class="skeleton-text w-50"></div>
            </div>
          </div>
        </div>

        <!-- 2. ESTADO VACÍO / PLACEHOLDER (SIN INFORMACIÓN DE API) -->
        <div v-else-if="filteredCards.length === 0" class="card bg-slate-800 border-slate-700 p-5 text-center my-4 rounded-3">
          <div class="placeholder-icon mb-3">
            <i class="bi bi-box-open text-slate-500 display-1"></i>
          </div>
          <h4 class="fw-bold text-white mb-2">No se encontraron cartas</h4>
          <p class="text-slate-400 max-w-400 mx-auto mb-4">
            Aún no has agregado cartas a esta carpeta o la búsqueda no coincide con ningún resultado de tu colección.
          </p>
          <div class="d-flex gap-2 justify-content-center">
            <button @click="searchQuery = ''; selectedFolder = 'all'; selectedRarity = 'all'" class="btn btn-outline-secondary text-white">
              Limpiar Filtros
            </button>
            <button class="btn btn-warning text-dark fw-bold">
              <i class="bi bi-plus-circle-fill me-1"></i> Agregar Carta
            </button>
          </div>
        </div>

        <!-- 3. CUADRÍCULA DE CARTAS (CON DATOS) -->
        <div v-else class="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-3">
          <div v-for="card in filteredCards" :key="card.id" class="col">
            <div 
              class="card poke-card bg-slate-800 border-slate-700 h-100 overflow-hidden shadow-sm"
              @mousemove="handleMouseMove($event, card.id)"
              @mouseleave="handleMouseLeave"
            >
              <!-- Imagen de la Carta -->
              <div class="card-img-wrapper position-relative p-2">
                <img :src="card.image" :alt="card.name" class="img-fluid rounded-2 card-img-top" loading="lazy">
                <span class="badge bg-dark border border-slate-700 text-warning position-absolute top-3 right-3 shadow-sm">
                  ${{ card.price }}
                </span>
              </div>

              <!-- Detalles de la Carta -->
              <div class="card-body p-2 d-flex flex-column justify-content-between">
                <div>
                  <h6 class="card-title text-white fw-bold mb-0 text-truncate" :title="card.name">
                    {{ card.name }}
                  </h6>
                  <p class="text-slate-400 extra-small mb-1">
                    {{ card.expansion }} • {{ card.number }}
                  </p>
                </div>
                <div>
                  <span class="badge bg-slate-900 border border-slate-700 text-slate-300 extra-small text-truncate w-100">
                    {{ card.rarity }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
</template>

<style lang="scss" scoped>
/* Colores Personalizados Tema Oscuro */
.bg-slate-900 { background-color: #0f172a; }
.bg-slate-800 { background-color: #1e293b; }
.bg-slate-700 { background-color: #334155; }
.border-slate-700 { border-color: #334155 !important; }
.text-slate-300 { color: #cbd5e1; }
.text-slate-400 { color: #94a3b8; }
.text-slate-500 { color: #64748b; }

.top-80 { top: 80px; }
.extra-small { font-size: 0.75rem; }
.max-w-400 { max-width: 400px; }

/* Controles e Inputs */
.custom-input, .custom-select {
  color: #f8fafc !important;
  &:focus {
    background-color: #0f172a !important;
    border-color: #f59e0b !important;
    box-shadow: 0 0 0 0.25rem rgba(245, 158, 11, 0.2) !important;
  }
}

/* Enlaces del Sidebar */
.nav-link {
  color: #cbd5e1;
  background: transparent;
  border: 1px solid transparent;
  
  &:hover {
    background-color: #334155;
    color: #ffffff;
  }

  &.active {
    background-color: #f59e0b !important;
    color: #000000 !important;
    font-weight: 600;

    .badge {
      background-color: #d97706 !important;
      color: #ffffff !important;
    }
  }
}

/* Tarjeta 3D Holo */
.poke-card {
  transition: transform 0.15s cubic-bezier(0.2, 0, 0.2, 1);
  transform-style: preserve-3d;
  will-change: transform;
  cursor: pointer;

  &:hover {
    border-color: #f59e0b !important;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  }
}

.top-3 { top: 12px; }
.right-3 { right: 12px; }

/* CSS Skeleton Loading Animado */
.skeleton-card {
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-img {
  height: 200px;
  background-color: #334155;
}

.skeleton-text {
  height: 14px;
  background-color: #334155;
  border-radius: 4px;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
</style>
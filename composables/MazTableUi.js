import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'


{/* <script setup>
const tableRef = ref(null)

// For a user management table
const { isResizing } = useResizableColumns(tableRef, {
  skipClasses: ['actions-column', 'avatar-column', 'selection-column'],
  minWidth: 70
})

const headers = [
  { label: '', key: 'selection', classes: 'selection-column' }, // ← Not resizable
  { label: 'Avatar', key: 'avatar', classes: 'avatar-column' }, // ← Not resizable  
  { label: 'Name', key: 'name' },                               // ← Resizable (min 70px)
  { label: 'Email', key: 'email' },                             // ← Resizable (min 70px)
  { label: 'Role', key: 'role' },                               // ← Resizable (min 70px)
  { label: 'Status', key: 'status' },                           // ← Resizable (min 70px)
  { label: 'Actions', key: 'actions', classes: 'actions-column' } // ← Not resizable
]
</script> */}

export function useResizableColumns(tableRef, options = {}) {
  const {
    skipClasses = ['actions-column'],
    minWidth = 50,
    initDelay = 100
  } = options

  const isResizing = ref(false)
  const currentResizeHeader = ref(null)
  const startX = ref(0)
  const startWidth = ref(0)

  const initResizableColumns = () => {
    nextTick(() => {
      const tableEl = tableRef.value?.$el || tableRef.value
      if (!tableEl) return
      
      const headers = tableEl.querySelectorAll('thead th')
      
      if (!headers.length) return

      headers.forEach((header) => {
        // Skip if already has resize handle or if it matches skip classes
        const shouldSkip = skipClasses.some(skipClass => 
          header.classList.contains(skipClass)
        )
        
        if (header.querySelector('.resize-handle') || shouldSkip) return
        
        const handle = document.createElement('div')
        handle.className = 'resize-handle'
        header.style.position = 'relative'
        header.appendChild(handle)
        
        handle.addEventListener('mousedown', (e) => {
          e.stopPropagation()
          e.preventDefault()
          
          isResizing.value = true
          currentResizeHeader.value = header
          startX.value = e.clientX
          startWidth.value = header.offsetWidth
          
          document.addEventListener('mousemove', resizeColumn)
          document.addEventListener('mouseup', stopResize)
          document.body.classList.add('resizing-column')
        })
      })
    })
  }

  const resizeColumn = (e) => {
    if (!isResizing.value || !currentResizeHeader.value) return
    
    e.preventDefault()
    
    const width = startWidth.value + (e.clientX - startX.value)
    if (width > minWidth) {
      currentResizeHeader.value.style.width = `${width}px`
      currentResizeHeader.value.style.minWidth = `${width}px`
      
      // Update all cells in the column
      const colIndex = Array.from(currentResizeHeader.value.parentNode.children)
        .indexOf(currentResizeHeader.value)
      const tableEl = tableRef.value?.$el || tableRef.value
      
      if (tableEl) {
        const rows = tableEl.querySelectorAll('tbody tr')
        
        rows.forEach(row => {
          const cell = row.children[colIndex]
          if (cell) {
            cell.style.width = `${width}px`
            cell.style.minWidth = `${width}px`
          }
        })
      }
    }
  }

  const stopResize = (e) => {
    if (isResizing.value) {
      e?.stopPropagation()
    }
    
    isResizing.value = false
    currentResizeHeader.value = null
    document.body.classList.remove('resizing-column')
    
    document.removeEventListener('mousemove', resizeColumn)
    document.removeEventListener('mouseup', stopResize)
  }

  const handleDocumentClick = (e) => {
    if (isResizing.value) {
      e.stopPropagation()
      e.preventDefault()
      stopResize()
    }
  }

  const init = (delay = initDelay) => {
    setTimeout(() => {
      initResizableColumns()
    }, delay)
  }

  // Auto-initialize when mounted
  onMounted(() => {
    document.addEventListener('click', handleDocumentClick, true)
    init()
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick, true)
    document.removeEventListener('mousemove', resizeColumn)
    document.removeEventListener('mouseup', stopResize)
  })

  return {
    isResizing,
    currentResizeHeader,
    initResizableColumns,
    stopResize,
    init
  }
}
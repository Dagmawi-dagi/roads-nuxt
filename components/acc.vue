<template>
  <div class="tree-node" :style="{ paddingLeft: `${depth * 20 + 12}px` }">
    <div
      class="node-content"
      :class="{
        'is-folder': node.type === 'folder',
        'is-file': node.type === 'file',
        'is-expanded': isExpanded
      }"
      @click="handleClick"
    >
      <div class="node-icon">
        <i v-if="node.type === 'folder'" :class="folderIcon"></i>
        <i v-else :class="fileIcon"></i>
      </div>
      <span class="node-name">{{ node.name }}</span>
      <button
        v-if="node.type === 'folder' && hasChildren"
        class="toggle-btn"
        @click.stop="toggleExpand"
        :aria-label="isExpanded ? 'Collapse folder' : 'Expand folder'"
      >
        <i :class="chevronIcon"></i>
      </button>
    </div>

    <transition name="expand">
      <div v-if="node.type === 'folder' && isExpanded && hasChildren" class="node-children">
        <tree-node
          v-for="child in node.children"
          :key="child.path"
          :node="child"
          :depth="depth + 1"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  depth: {
    type: Number,
    default: 0
  }
})

const isExpanded = ref(false)

const hasChildren = computed(() => {
  return props.node.children && props.node.children.length > 0
})

const folderIcon = computed(() => {
  return isExpanded.value ? 'fas fa-folder-open' : 'fas fa-folder'
})

const chevronIcon = computed(() => {
  return isExpanded.value ? 'fas fa-chevron-down' : 'fas fa-chevron-right'
})

const fileIcon = computed(() => {
  const ext = props.node.extension
  if (ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif') {
    return 'fas fa-file-image'
  }
  if (ext === 'pdf') {
    return 'fas fa-file-pdf'
  }
  if (ext === 'txt') {
    return 'fas fa-file-alt'
  }
  return 'fas fa-file'
})

const toggleExpand = () => {
  if (props.node.type === 'folder' && hasChildren.value) {
    isExpanded.value = !isExpanded.value
  }
}

const handleClick = () => {
  if (props.node.type === 'folder') {
    toggleExpand()
  } else {
    // Optional: handle file click (e.g., preview or download)
    console.log('File clicked:', props.node.path)
  }
}
</script>

<style lang="scss" scoped>
.tree-node {
  user-select: none;

  .node-content {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
    margin: 2px 8px;
    position: relative;

    &:hover {
      background: #f1f5f9;
    }

    &.is-folder {
      &:hover {
        background: #f0f7ff;
      }
    }

    .node-icon {
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;

      .fa-folder {
        color: #f59e0b;
      }

      .fa-folder-open {
        color: #f59e0b;
      }

      .fa-file-image {
        color: #10b981;
      }

      .fa-file-pdf {
        color: #ef4444;
      }

      .fa-file-alt {
        color: #6b7280;
      }

      .fa-file {
        color: #6b7280;
      }
    }

    .node-name {
      flex: 1;
      font-size: 14px;
      color: #1e293b;
      font-weight: 500;
    }

    .toggle-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #94a3b8;
      transition: all 0.2s ease;
      border-radius: 4px;

      &:hover {
        background: #e2e8f0;
        color: #475569;
      }

      i {
        font-size: 12px;
        transition: transform 0.2s ease;
      }
    }
  }

  .node-children {
    overflow: hidden;
  }
}

// Expand/collapse animations
.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
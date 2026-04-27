<template>
  <div class="fade-in max-w-2xl mx-auto">
    <h1 class="text-2xl font-light text-earth-700 text-center mb-2">🌱 分享广场</h1>
    <p class="text-earth-500/60 text-xs text-center mb-8">看看大家的降欲故事，互相学习和激励</p>

    <div v-if="shares.length === 0" class="text-center py-16">
      <div class="text-5xl mb-4">🌸</div>
      <p class="text-earth-500/60 text-sm mb-6">还没有人分享，成为第一个吧</p>
      <router-link to="/share" class="bg-earth-500 text-white px-6 py-2.5 rounded-xl hover:bg-earth-700 transition text-sm inline-block">
        去分享
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div v-for="s in shares" :key="s.id" class="bg-white rounded-2xl p-6 shadow-sm">
        <div class="flex items-start gap-4">
          <div class="text-2xl mt-1">{{ randomEmoji(s.id) }}</div>
          <div class="flex-1 min-w-0">
            <p class="text-earth-700 text-sm font-medium mb-1">{{ s.insight }}</p>
            <div class="flex items-center gap-3 text-xs text-earth-500/60 mb-2">
              <span>🎯 {{ s.practice }}</span>
            </div>
            <p class="text-xs text-moss mb-3">📊 {{ s.effect }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="tag in (s.tags || [])" :key="tag"
                class="bg-earth-500/8 text-earth-500/70 text-xs px-2.5 py-0.5 rounded-full">
                #{{ tag }}
              </span>
            </div>
            <p class="text-xs text-earth-500/30 mt-3">{{ s.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const shares = ref(JSON.parse(localStorage.getItem('shares') || '[]'))

function randomEmoji(id) {
  const emojis = ['🔥', '💪', '✨', '🌸', '🍃', '🌙', '⭐', '🌊', '🕊️', '🧘']
  return emojis[id % emojis.length]
}
</script>

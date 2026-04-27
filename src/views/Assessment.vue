<template>
  <div class="fade-in max-w-lg mx-auto">
    <h1 class="text-2xl font-light text-earth-700 text-center mb-8">低功耗自测</h1>
    <p class="text-earth-500/70 text-sm text-center mb-8">评估你当前的"功耗等级"，找到改善的方向</p>

    <div v-if="!started" class="text-center py-12">
      <div class="text-5xl mb-6">📊</div>
      <p class="text-earth-500/70 text-sm mb-8">共 10 题，约 3 分钟</p>
      <button @click="started = true" class="bg-earth-500 text-white px-8 py-3 rounded-xl hover:bg-earth-700 transition text-sm">
        开始自测
      </button>
    </div>

    <div v-else-if="currentIndex < questions.length" class="space-y-6">
      <div class="text-center text-earth-500/50 text-xs mb-4">{{ currentIndex + 1 }} / {{ questions.length }}</div>
      <div class="bg-white rounded-2xl p-8 shadow-sm">
        <h2 class="text-earth-700 text-lg font-light mb-6">{{ questions[currentIndex].text }}</h2>
        <div class="space-y-3">
          <button v-for="(opt, i) in questions[currentIndex].options" :key="i"
            @click="selectAnswer(opt.score)"
            class="w-full text-left px-5 py-4 rounded-xl border border-earth-500/10 hover:border-earth-500/40 hover:bg-earth-500/5 transition text-sm text-earth-700">
            {{ opt.text }}
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <div class="bg-white rounded-2xl p-10 shadow-sm">
        <div class="text-5xl mb-4">{{ result.icon }}</div>
        <h2 class="text-2xl font-light text-earth-700 mb-2">{{ result.title }}</h2>
        <p class="text-earth-500/70 text-sm mb-1">得分：{{ totalScore }} / 50</p>
        <p class="text-earth-500/60 text-xs mb-8">{{ result.desc }}</p>
        <div class="w-full bg-cream rounded-full h-2 mb-8 max-w-xs mx-auto">
          <div class="h-2 rounded-full transition-all duration-1000" :style="{ width: (totalScore / 50 * 100) + '%', backgroundColor: result.color }"></div>
        </div>
        <button @click="reset" class="bg-earth-500/10 text-earth-500 px-6 py-2 rounded-xl hover:bg-earth-500/20 transition text-sm">
          重新测试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { questions } from '../data/questions.js'

const started = ref(false)
const currentIndex = ref(0)
const scores = ref([])
const totalScore = ref(0)
const result = computed(() => {
  const s = totalScore.value
  if (s >= 40) return { icon: '🏆', title: '低功耗战士', color: '#6b8f71', desc: '你已经掌握了低功耗生存的精髓。继续影响身边的人吧。' }
  if (s >= 25) return { icon: '⚡', title: '进阶中', color: '#c49a6c', desc: '有意识在改变，但还不稳定。坚持就是胜利。' }
  return { icon: '🌘', title: '需要觉醒', color: '#8b5e3c', desc: '被欲望和环境牵着走是常态，但你已迈出觉察的第一步。' }
})

function selectAnswer(score) {
  scores.value.push(score)
  totalScore.value = scores.value.reduce((a, b) => a + b, 0)
  currentIndex.value++
}

function reset() {
  currentIndex.value = 0
  scores.value = []
  totalScore.value = 0
  started.value = false
}
</script>

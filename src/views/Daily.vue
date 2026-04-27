<template>
  <div class="fade-in max-w-lg mx-auto">
    <h1 class="text-2xl font-light text-earth-700 text-center mb-2">每日微行动</h1>
    <p class="text-earth-500/60 text-xs text-center mb-8">每天一个小改变，一步一步降低功耗</p>

    <div class="bg-white rounded-2xl p-8 shadow-sm mb-6">
      <p class="text-earth-700 text-sm font-light mb-6 leading-relaxed">{{ todayAction }}</p>
      <button @click="toggleDone"
        class="w-full py-3 rounded-xl border transition text-sm"
        :class="isDone
          ? 'bg-moss/10 border-moss/30 text-moss'
          : 'border-earth-500/20 text-earth-500 hover:border-earth-500/40'">
        {{ isDone ? '✅ 已完成' : '☐ 标记完成' }}
      </button>
    </div>

    <!-- 本周记录 -->
    <div class="bg-white/70 rounded-2xl p-6 shadow-sm">
      <h3 class="text-earth-500 text-xs mb-4 tracking-widest">本周记录</h3>
      <div class="flex gap-2 justify-center">
        <div v-for="(d, i) in weekDays" :key="i"
          class="w-10 h-10 rounded-full flex items-center justify-center text-xs transition"
          :class="d.done ? 'bg-moss/20 text-moss' : 'bg-earth-500/5 text-earth-500/30'">
          {{ d.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const actions = [
  '今天不买任何非必需品。',
  '散步 20 分钟，不带手机。',
  '一整天不看短视频。',
  '只吃两餐，体验一下轻断食。',
  '把手机放在另一个房间睡觉。',
  '整理一个抽屉，扔掉不需要的东西。',
  '写一句你今天克制住的欲望。',
  '冥想 5 分钟，只关注呼吸。',
  '今天不点外卖，自己做饭。',
  '阅读 30 分钟纸质书。',
  '对一件你习惯抱怨的事，换一个角度看待。',
  '记录今天花了多少钱，划掉不必要的。',
  '早起一杯温水，不吃早餐前不碰手机。',
  '做 20 个俯卧撑 + 30 秒平板支撑。',
  '今天对每个人都说一句好话。',
  '关掉所有 App 通知，保持一天。',
  '今天不说"我忙"和"我没时间"。',
  '整理手机桌面，把消耗注意力的 App 藏起来。',
  '给一个久未联系的人发条真诚的问候。',
  '睡前写下今天的三件好事。',
]

const todayKey = new Date().toISOString().slice(0, 10)
const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
const todayAction = actions[dayOfYear % actions.length]

const doneMap = JSON.parse(localStorage.getItem('daily-done') || '{}')
const isDone = ref(!!doneMap[todayKey])

function toggleDone() {
  isDone.value = !isDone.value
  const map = JSON.parse(localStorage.getItem('daily-done') || '{}')
  if (isDone.value) map[todayKey] = true
  else delete map[todayKey]
  localStorage.setItem('daily-done', JSON.stringify(map))
}

const weekDays = computed(() => {
  const days = '日一二三四五六'.split('')
  const map = JSON.parse(localStorage.getItem('daily-done') || '{}')
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key = d.toISOString().slice(0, 10)
    return { label: days[d.getDay()], done: !!map[key] }
  })
})
</script>

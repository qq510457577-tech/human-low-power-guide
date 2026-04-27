<template>
  <div class="fade-in max-w-lg mx-auto">
    <h1 class="text-2xl font-light text-earth-700 text-center mb-2">💢 降欲分享</h1>
    <p class="text-earth-500/60 text-xs text-center mb-8">分享你降低某一种欲望的实践经历，让更多人受益</p>

    <!-- 步骤1：输入 -->
    <div v-if="step === 'input'" class="bg-white rounded-2xl p-8 shadow-sm">
      <textarea v-model="rawText" rows="6"
        placeholder="例如：我之前每天必喝一杯奶茶，后来发现一个月光奶茶就花了600块，而且越喝越渴。后来我决定戒掉，用白开水和绿茶代替，第一周很难受，但坚持两周后发现口味变了，不再想喝甜的了…"
        class="w-full bg-cream/50 rounded-xl p-4 text-sm text-earth-700 placeholder:text-earth-500/30 border-0 resize-none outline-none focus:ring-1 focus:ring-earth-500/30"></textarea>
      <div class="flex justify-between items-center mt-4">
        <span class="text-xs text-earth-500/40">{{ rawText.length }} 字</span>
        <button @click="doDistill" :disabled="rawText.length < 10 || distilling"
          class="bg-earth-500 text-white px-6 py-2.5 rounded-xl hover:bg-earth-700 transition text-sm disabled:opacity-30">
          {{ distilling ? '提炼中…' : '✨ LLM 提炼' }}
        </button>
      </div>
    </div>

    <!-- 步骤2：确认/编辑 -->
    <div v-if="step === 'confirm'" class="space-y-4">
      <div class="bg-white rounded-2xl p-8 shadow-sm">
        <div class="flex items-center gap-2 mb-6">
          <span class="text-earth-500 text-xs">🧠 LLM 已提炼</span>
          <span class="text-earth-500/30 text-xs">请确认或编辑后提交</span>
        </div>
        <div class="space-y-4">
          <div>
            <label class="text-xs text-earth-500/60 block mb-1">💡 核心理念</label>
            <input v-model="distilled.insight" class="w-full bg-cream/50 rounded-xl px-4 py-2.5 text-sm text-earth-700 border-0 outline-none focus:ring-1 focus:ring-earth-500/30">
          </div>
          <div>
            <label class="text-xs text-earth-500/60 block mb-1">🎯 具体做法</label>
            <input v-model="distilled.practice" class="w-full bg-cream/50 rounded-xl px-4 py-2.5 text-sm text-earth-700 border-0 outline-none focus:ring-1 focus:ring-earth-500/30">
          </div>
          <div>
            <label class="text-xs text-earth-500/60 block mb-1">📊 身心变化</label>
            <input v-model="distilled.effect" class="w-full bg-cream/50 rounded-xl px-4 py-2.5 text-sm text-earth-700 border-0 outline-none focus:ring-1 focus:ring-earth-500/30">
          </div>
          <div>
            <label class="text-xs text-earth-500/60 block mb-1">🏷️ 标签</label>
            <div class="flex flex-wrap gap-2">
              <span v-for="(tag, i) in distilled.tags" :key="i"
                class="bg-earth-500/10 text-earth-500 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                {{ tag }}
                <button @click="distilled.tags.splice(i, 1)" class="text-earth-500/40 hover:text-earth-500">&times;</button>
              </span>
              <select @change="addTag" v-model="newTag" class="text-xs bg-cream/50 rounded-full px-3 py-1 border-0 outline-none text-earth-500/60">
                <option value="">+ 添加标签</option>
                <option v-for="t in availableTags" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="step = 'input'" class="flex-1 bg-earth-500/10 text-earth-500 py-2.5 rounded-xl hover:bg-earth-500/20 transition text-sm">返回修改</button>
          <button @click="submitShare" class="flex-1 bg-earth-500 text-white py-2.5 rounded-xl hover:bg-earth-700 transition text-sm">确认发布</button>
        </div>
      </div>
    </div>

    <!-- 步骤3：完成 -->
    <div v-if="step === 'done'" class="text-center py-12">
      <div class="text-5xl mb-4">🎉</div>
      <h2 class="text-xl font-light text-earth-700 mb-2">分享成功</h2>
      <p class="text-earth-500/60 text-sm mb-8">感谢你的分享，降欲路上不孤单</p>
      <div class="flex gap-3 justify-center">
        <button @click="reset" class="bg-earth-500/10 text-earth-500 px-6 py-2.5 rounded-xl hover:bg-earth-500/20 transition text-sm">再分享一条</button>
        <router-link to="/square" class="bg-earth-500 text-white px-6 py-2.5 rounded-xl hover:bg-earth-700 transition text-sm">去看看广场</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { distillShare } from '../utils/llm.js'

const rawText = ref('')
const distilling = ref(false)
const step = ref('input')
const newTag = ref('')

const availableTags = ['购物欲', '食欲', '信息欲', '社交欲', '占有欲', '娱乐欲', '懒惰', '攀比心', '极简', '运动', '饮食', '数字戒断', '冥想', '阅读', '早起']

const distilled = ref({ insight: '', practice: '', effect: '', tags: [] })

function addTag() {
  if (newTag.value && !distilled.value.tags.includes(newTag.value)) {
    distilled.value.tags.push(newTag.value)
  }
  newTag.value = ''
}

async function doDistill() {
  distilling.value = true
  try {
    const result = await distillShare(rawText.value)
    distilled.value = result
    step.value = 'confirm'
  } catch (e) {
    alert('提炼失败，请重试')
  } finally {
    distilling.value = false
  }
}

function submitShare() {
  const share = {
    id: Date.now(),
    ...distilled.value,
    raw: rawText.value,
    date: new Date().toISOString().slice(0, 10),
  }
  const list = JSON.parse(localStorage.getItem('shares') || '[]')
  list.unshift(share)
  localStorage.setItem('shares', JSON.stringify(list))
  step.value = 'done'
}

function reset() {
  rawText.value = ''
  distilled.value = { insight: '', practice: '', effect: '', tags: [] }
  step.value = 'input'
}
</script>

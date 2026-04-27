<template>
  <div class="fade-in">
    <!-- Hero -->
    <section class="text-center py-20 space-y-6">
      <h1 class="text-4xl md:text-5xl font-light text-earth-700 tracking-wider">
        人类低功耗生存指南
      </h1>
      <p class="text-earth-500/80 text-lg font-light max-w-xl mx-auto leading-relaxed">
        <em>心外无物，相由心生。</em><br>
        真正的低功耗不是躺平，而是通过主观意志<br class="hidden sm:inline">
        和自律，从根本上减少对欲望的依赖。
      </p>
    </section>

    <!-- 每日一句 -->
    <section class="text-center mb-16">
      <div class="inline-block bg-white/70 rounded-2xl px-8 py-6 shadow-sm max-w-lg">
        <p class="text-earth-700/70 text-xs mb-2 tracking-widest">✦ 每日心法 ✦</p>
        <p class="text-earth-700 text-lg font-light italic">{{ dailyQuote }}</p>
      </div>
    </section>

    <!-- 三大支柱 -->
    <section class="grid md:grid-cols-3 gap-6 mb-16">
      <div class="bg-white rounded-2xl p-8 shadow-sm fade-in delay-1">
        <div class="text-3xl mb-4">🧠</div>
        <h2 class="text-earth-700 text-lg font-medium mb-3">心外无物</h2>
        <p class="text-earth-500/80 text-sm leading-relaxed">主观意志为王，不随外物起伏。向内求索，不为外界所动。</p>
      </div>
      <div class="bg-white rounded-2xl p-8 shadow-sm fade-in delay-2">
        <div class="text-3xl mb-4">🔥</div>
        <h2 class="text-earth-700 text-lg font-medium mb-3">抵欲望</h2>
        <p class="text-earth-500/80 text-sm leading-relaxed">对抗多巴胺陷阱，断舍离。少即是多，克制即是自由。</p>
      </div>
      <div class="bg-white rounded-2xl p-8 shadow-sm fade-in delay-3">
        <div class="text-3xl mb-4">💪</div>
        <h2 class="text-earth-700 text-lg font-medium mb-3">锻炼身体</h2>
        <p class="text-earth-500/80 text-sm leading-relaxed">身体是底层操作系统。体能充沛，精神方能持久。</p>
      </div>
    </section>

    <!-- 入口导航 -->
    <section class="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      <router-link to="/assessment" class="block bg-white/70 rounded-xl px-6 py-5 text-center hover:bg-white transition shadow-sm">
        <span class="text-earth-500 text-sm">📊 低功耗自测</span>
        <p class="text-earth-700/60 text-xs mt-1">评估你的功耗等级</p>
      </router-link>
      <router-link to="/daily" class="block bg-white/70 rounded-xl px-6 py-5 text-center hover:bg-white transition shadow-sm">
        <span class="text-earth-500 text-sm">✅ 每日微行动</span>
        <p class="text-earth-700/60 text-xs mt-1">每天一个小改变</p>
      </router-link>
      <router-link to="/share" class="block bg-white/70 rounded-xl px-6 py-5 text-center hover:bg-white transition shadow-sm">
        <span class="text-earth-500 text-sm">💢 降欲分享</span>
        <p class="text-earth-700/60 text-xs mt-1">分享你的降欲实践</p>
      </router-link>
      <router-link to="/square" class="block bg-white/70 rounded-xl px-6 py-5 text-center hover:bg-white transition shadow-sm">
        <span class="text-earth-500 text-sm">🌱 分享广场</span>
        <p class="text-earth-700/60 text-xs mt-1">看看大家的降欲故事</p>
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const quotes = [
  '寡欲则心清，心清则事明。',
  '不是拥有的太少，而是想要的太多。',
  '身勤则强，心静则明。',
  '不以物喜，不以己悲。',
  '少看屏幕多走路，少吃外卖多做饭。',
  '欲望的尽头是空虚，克制的尽头是自由。',
  '运动是唯一稳赚不赔的投资。',
  '断舍离的本质不是扔东西，是断念。',
  '一日无过可改，即一日无步可进。',
  '你控制不了的事，就别控制了。',
]
const dailyQuote = ref(quotes[new Date().getDate() % quotes.length])
</script>

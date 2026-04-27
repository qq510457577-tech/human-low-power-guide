<template>
  <div class="min-h-screen bg-cream">
    <nav class="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-earth-500/10">
      <div class="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <router-link to="/" class="text-earth-700 font-light text-lg tracking-wider">
          🔥 低功耗
        </router-link>
        <div class="flex gap-6 text-sm text-earth-500">
          <router-link to="/assessment" class="hover:text-earth-700 transition">自测</router-link>
          <router-link to="/daily" class="hover:text-earth-700 transition">每日</router-link>
          <router-link to="/guide" class="hover:text-earth-700 transition">指南</router-link>
          <router-link to="/share" class="hover:text-earth-700 transition">分享</router-link>
          <router-link to="/square" class="hover:text-earth-700 transition">广场</router-link>
        </div>
      </div>
    </nav>
    <main class="max-w-4xl mx-auto px-6 py-10">
      <router-view />
    </main>
    <footer class="text-center text-earth-500/50 text-xs py-8 border-t border-earth-500/5">
      心外无物 · 低功耗生存
    </footer>
  </div>
</template>

<script setup>
</script>

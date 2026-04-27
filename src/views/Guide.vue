<template>
  <div class="fade-in max-w-2xl mx-auto">
    <h1 class="text-2xl font-light text-earth-700 text-center mb-8">指南</h1>
    <div class="grid md:grid-cols-2 gap-4">
      <router-link v-for="a in articles" :key="a.slug"
        :to="`/guide/${a.slug}`"
        class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition block">
        <span class="text-xs text-earth-500/60 tracking-wider">{{ a.category }}</span>
        <h2 class="text-earth-700 text-base font-medium mt-1 mb-2">{{ a.title }}</h2>
        <p class="text-earth-500/70 text-sm leading-relaxed">{{ a.summary }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { articles } from '../data/articles.js'
</script>

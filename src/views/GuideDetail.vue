<template>
  <div class="fade-in max-w-2xl mx-auto" v-if="article">
    <router-link to="/guide" class="text-earth-500/60 text-xs hover:text-earth-500 transition">&larr; 返回指南</router-link>
    <article class="mt-6 bg-white rounded-2xl p-8 md:p-10 shadow-sm prose-custom">
      <span class="text-xs text-earth-500/60 tracking-wider">{{ article.category }}</span>
      <h1 class="text-2xl font-light text-earth-700 mt-2 mb-6">{{ article.title }}</h1>
      <div class="text-earth-700/80 text-sm leading-relaxed space-y-4" v-html="renderedContent"></div>
    </article>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { articles } from '../data/articles.js'

const route = useRoute()
const article = ref(articles.find(a => a.slug === route.params.slug))

const renderedContent = computed(() => {
  if (!article.value) return ''
  return article.value.content
    .split('\n').map(line => {
      if (line.startsWith('## ')) return `<h2 class="text-lg font-medium text-earth-700 mt-8 mb-3">${line.slice(3)}</h2>`
      if (line.startsWith('### ')) return `<h3 class="text-base font-medium text-earth-700 mt-6 mb-2">${line.slice(4)}</h3>`
      if (line.startsWith('- ')) return `<li class="ml-4 text-earth-700/80">${line.slice(2)}</li>`
      if (line.startsWith('> ')) return `<blockquote class="border-l-2 border-earth-500/30 pl-4 italic text-earth-500/70 my-4">${line.slice(2)}</blockquote>`
      if (line.trim() === '') return '<div class="h-2"></div>'
      return `<p class="mb-3">${line}</p>`
    }).join('')
})
</script>

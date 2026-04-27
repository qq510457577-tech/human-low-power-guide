import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Assessment from '../views/Assessment.vue'
import Daily from '../views/Daily.vue'
import Guide from '../views/Guide.vue'
import GuideDetail from '../views/GuideDetail.vue'
import Share from '../views/Share.vue'
import Square from '../views/Square.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/assessment', name: 'Assessment', component: Assessment },
  { path: '/daily', name: 'Daily', component: Daily },
  { path: '/guide', name: 'Guide', component: Guide },
  { path: '/guide/:slug', name: 'GuideDetail', component: GuideDetail },
  { path: '/share', name: 'Share', component: Share },
  { path: '/square', name: 'Square', component: Square },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

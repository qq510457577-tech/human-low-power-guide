const DEEPSEEK_KEY = ''

const SYSTEM_PROMPT = `你是一个"降欲分享"提炼助手。用户会分享一段关于降低某种欲望的实践经历，你需要提炼为JSON格式（不要markdown标记，纯JSON）：

{
  "insight": "一句话核心理念（从分享中提炼的核心认知）",
  "practice": "具体做法（用户做了什么来降低欲望，50字以内）",
  "effect": "身心变化（降欲后的实际效果，30字以内）",
  "tags": ["欲望类型标签", "生活方式标签"]
}

欲望类型标签参考：购物欲 食欲 信息欲 社交欲 占有欲 娱乐欲 懒惰 攀比心
生活方式标签参考：极简 运动 饮食 数字戒断 冥想 阅读 早起

请确保output是纯JSON，不要有任何其他文字。`

export async function distillShare(text) {
  if (!DEEPSEEK_KEY) {
    // 降级方案：本地简单提炼
    return fallbackDistill(text)
  }

  try {
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    })
    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content || ''
    return JSON.parse(raw.replace(/```json\n?|```/g, '').trim())
  } catch (e) {
    console.warn('LLM distill failed, using fallback:', e)
    return fallbackDistill(text)
  }
}

function fallbackDistill(text) {
  // 关键词匹配的本地降级方案
  const tags = []
  if (/吃|喝|糖|零食|外卖|饮食|食欲|戒糖/i.test(text)) tags.push('食欲')
  if (/买|购物|消费|花钱|剁手|衣服|数码/i.test(text)) tags.push('购物欲')
  if (/手机|屏幕|短视频|刷|抖音|微博|社交媒体/i.test(text)) tags.push('信息欲')
  if (/社交|聚会|应酬|讨好|无效|社交/i.test(text)) tags.push('社交欲')
  if (/占有|囤积|收藏|拥有/i.test(text)) tags.push('占有欲')
  if (/娱乐|游戏|剧|综艺|刷剧/i.test(text)) tags.push('娱乐欲')
  if (/懒|拖延|早起|运动|行动|坚持/i.test(text)) tags.push('懒惰')
  if (/攀比|比较|嫉妒|别人|羡慕/i.test(text)) tags.push('攀比心')

  if (tags.length === 0) tags.push('降欲')

  return {
    insight: text.slice(0, 30) + '…',
    practice: text.slice(0, 50) + '…',
    effect: '请补充效果…',
    tags: tags.slice(0, 3),
  }
}

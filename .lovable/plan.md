
# MC0003 故事 PPT 页面

做一个单页 PPT 风格的故事讲述应用，按左右键（或点击底部按钮）翻页，沉浸式叙述 MC0003 从筹备到 endorse 再到执行的完整过程。

## 视觉方向

- 深色专业风（深墨蓝 #0B1220 背景 + 暖金/琥珀 #E6B566 高光 + 柔白文字），传递"科学决策、关键时刻"的氛围，避免通用蓝紫渐变
- 中文衬线标题（Noto Serif SC）+ 中文无衬线正文（Noto Sans SC），层次清晰、阅读舒适
- 固定 16:9 画布（1920×1080），按窗口 scale 自适应；每页统一留白与页码

## 翻页交互

- ← / → / Space / PageUp / PageDown 切换
- 底部进度条 + 上一页/下一页按钮 + 页码 (n / total)
- URL hash `#3` 同步当前页，刷新保持位置
- 顶部细进度线显示阅读进度
- 入场动画：标题/段落淡入上移

## 章节结构（约 14 页）

1. 封面 — "MC0003：在不确定中，用科学推动确定性"，副标题 + 作者署名位
2. 背景 — 第二次 governance meeting 的压力（第一次未明确 endorse）
3. 一·会议准备｜为什么是 MDG — 可及性/依从性、degrader 解决耐药、默沙东内部空白；风险与跨界学习
4. 一·会议准备｜从 117 页到 49 页 — 数据动态变化、ZQ 的 comment、6 天定稿的提炼
5. 二·会上｜挑战 — 5 主项目×10–15min、10 high-level×5min "点戏"；后半段领导疲劳、节奏失控
6. 二·会上｜我的判断 — "nothing to lose"，从铺细节切到精准 framing
7. 二·会上｜5 句话（要点页） — 用 5 张并排卡片展示：MDG 平台、中国优势癌种＋泛瘤、多重 MOA、选择性/安全性、IND submitted
8. 二·会上｜映射到决策维度 — 创新性 / 中国优势 / market size / asset stage / 科学可行性
9. 二·会上｜现场反应 — 当场结论：让 Johnny 看 chemistry，可推进
10. 二·会上｜我学到了什么 — 科学表达真正影响决策
11. 三·会后 — 寇总赴美 engage Johnny；我准备数据详版＋notes，最终拿到 endorsement
12. 四·执行｜不放弃科学严谨 — deep dive 仍是控风险关键；新 MOA，跨 function 1:1 align
13. 四·执行｜实验验证的硬骨头 — 三元复合亲和力、3D 模型药效、读出定义、宽范围验证
14. 五·总结 — Scientific Leadership 的三件事：识别关键科学维度 / 简洁影响 stakeholder / 坚持风险控制；落到"在不确定中，用科学推动确定性"

每页排版按类型变化（封面大字、要点页 5 卡片网格、对比页两栏、引言页大号引文），避免每页都是"标题+列表"的雷同感。

## 技术要点

- 新增路由 `src/routes/story.tsx`（也把 `src/routes/index.tsx` 替换为直接渲染该故事，作为站点首页）
- 单文件组件 + 一个 `slides` 数组（每项 `{ id, render() }`），渲染当前 index
- 通过 `useEffect` 注册键盘监听 + `hashchange`
- 用 CSS 变量定义配色 token；Tailwind 仅做布局/间距；正文/标题用语义 class（`.slide-title`, `.slide-body` 等）
- 加载 Google Fonts（Noto Serif SC / Noto Sans SC）通过 `__root.tsx` 的 `links` 注入

## 不做

- 不接后端、不存数据
- 不做演讲者备注/全屏 API（保持简洁，键盘翻页足够）
- 不加音效或视频

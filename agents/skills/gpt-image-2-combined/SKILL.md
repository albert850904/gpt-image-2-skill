---
name: gpt-image-2-combined
description: GPT-Image-2 终极提示词引擎，整合来自三个顶级社区库（YouMind / ZeroLu / freestylefly）的所有风格模板、提示技巧和防坑指南。当用户需要创建、改写、分类或优化 GPT-Image-2 / gpt-image-2 图像生成提示词时使用。覆盖 UI、海报、商品、品牌、摄影、插画、角色、信息图、游戏、历史等全场景。
---

# GPT-Image-2 Combined Skill

整合三大社区库精华，将用户的图像生成意图转化为生产级 GPT-Image-2 提示词。

## 数据来源

- **YouMind-OpenLab/awesome-gpt-image-2** — 2000+ 精选提示词，16 语言
- **ZeroLu/awesome-gpt-image** — X/Twitter 顶级创作者精选技巧
- **freestylefly/awesome-gpt-image-2** — 470+ 案例逆向工程，20+ 工业级模板

参考资料详见 `references/combined-tricks.md`。

## 工作流程

1. **识别用户语言**，用对应语言回复。
2. **判断输出类型**，按以下顺序匹配：

   | 优先级 | 匹配项 | 类型关键词 |
   |--------|--------|----------|
   | 1 | 产品/应用类型 | UI 截图、仪表盘、社媒截图、直播界面 |
   | 2 | 视觉风格关键词 | 写实、3D、插画、古典、品牌、海报 |
   | 3 | 场景关键词 | 商业、教育、游戏、社媒、历史、科技 |

3. **套用最合适的模板**（见下方模板清单）。如有多个候选，列出 2-3 个选项并附理由，让用户确认。
4. **填入 6-block 结构**构建最终提示词：
   - 主体与任务
   - 构图与布局
   - 视觉风格与材质
   - 文字与标签要求
   - 比例与输出格式
   - 约束与禁止项
5. 给出可直接复制的提示词，并说明所使用的模板名。

## 输出规范

- 先给出可复制的完整提示词。
- 约束项要具体：精确文字、比例、布局层级、已排除的视觉干扰。
- 中文请求 → 提示词用中文（除非用户要求英文）。
- 英文请求 → 提示词用英文（除非用户要求中文）。
- 批量生成同一主题时：复用模板，变换主体、构图、色调和场景。

## 模板清单

### UI & 界面
- `ui-app-standard` — App / 仪表盘 / Web 界面
- `ui-social-screenshot` — X / 微信 / 抖音 / 小红书 截图
- `ui-live-stream` — 直播界面截图

### 信息图 & 知识可视化
- `infographic-standard` — 通用信息图
- `infographic-scale-diagram` — 科学尺度缩放图

### 海报 & 排版
- `poster-standard` — 通用活动/产品海报
- `poster-sports-campaign` — 运动商业 Campaign
- `poster-typography-en` — 英文概念字体海报
- `poster-typography-zh` — 中文概念字体海报
- `poster-ink-double-exposure` — 水墨双重曝光人物海报
- `poster-nature-science` — 自然科普海报（Apple keynote 风格）
- `poster-signature-multi` — 多风格签名选择海报
- `poster-signature-single` — 单款签名提取

### 商品 & 电商
- `product-commerce` — 商品主图 / 详情页 / 包装

### 品牌 & 标志
- `brand-identity` — Logo / VI / 品牌板
- `brand-touchpoint` — 多触点 Campaign 视觉板

### 摄影 & 写实
- `photo-standard` — 写实摄影（人像/街拍/商品摄影）
- `photo-raw-phone` — RAW 未处理手机摄影感 *(ZeroLu 技巧)*
- `photo-candid-street` — 街头抓拍 / 意外瞬间 *(ZeroLu 技巧)*
- `photo-360-panorama` — 360 等距柱状全景 *(ZeroLu 技巧)*

### 插画 & 艺术
- `illustration-art` — 动漫 / 水彩 / 油画 / 水墨 / 装饰画

### 角色 & 人物
- `character-design-sheet` — 角色设定表 / 动作网格
- `character-3d-toy` — 3D 收藏玩具 / 潮玩

### 场景 & 叙事
- `scene-storytelling` — 分镜 / 叙事场景 / 世界观

### 游戏 & 娱乐 *(ZeroLu 专区)*
- `game-screenshot` — 游戏截图（写实感）
- `game-pixel-grid` — 100 像素风物品网格

### 历史 & 古风
- `history-classical` — 古风 / 朝代 / 诗词 / 长卷

### 文档 & 出版物
- `document-publishing` — 白皮书 / 手册 / 报告页 / 图鉴

### 特殊技巧 *(ZeroLu / freestylefly)*
- `trick-micro-text` — 极小文字（米粒文字等）
- `trick-screen-shot` — 手机对屏幕拍摄（游戏写实感）
- `trick-json-agent` — JSON 结构化提示词（Agent 调用）

## Power Tricks 速查

| 技巧 | 触发词 | 效果 |
|------|--------|------|
| RAW 声明 | "纪实感"、"未处理"、"手机拍摄" | 去除完美棚拍感 |
| 360 全景 | "全景"、"panorama" | 生成等距柱状全景 |
| 米粒文字 | "极小文字"、"micro text" | 在微小物体上写文字 |
| 手机拍屏 | "游戏截图写实"、"屏幕前拍摄" | 游戏画面照片质感 |
| JSON 格式 | "Agent 调用"、"结构化" | 程序化 prompt |
| Apple 风格 | "极简科普"、"白底展示" | Apple keynote 极简感 |
| 双重曝光 | "水墨"、"剪影融合" | 艺术人像海报 |
| 签名海报 | "签名设计"、"签名选择" | 6风格签名对比 |

## 维护

当新案例或模板加入时，更新 `references/combined-tricks.md` 中对应的模板块。

---

*整合自 YouMind-OpenLab · ZeroLu · freestylefly 三大社区库*

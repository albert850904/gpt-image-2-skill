# GPT-Image-2 Combined Prompting Tricks Reference

Synthesized from three community repositories:
- YouMind-OpenLab/awesome-gpt-image-2 (2000+ curated prompts, 16 languages)
- ZeroLu/awesome-gpt-image (top creator picks from X/Twitter)
- freestylefly/awesome-gpt-image-2 (470+ reverse-engineered cases, 20+ industrial templates)

---

## Universal 6-Block Prompt Structure

Every high-quality GPT-Image-2 prompt should cover these blocks in order:

```
1. [SUBJECT & TASK]     — what object/scene/person, what action
2. [COMPOSITION]        — camera angle, framing, layout, hierarchy
3. [VISUAL STYLE]       — aesthetic, material, lighting, color palette
4. [TEXT & LABELS]      — exact required text, font style, language
5. [FORMAT]             — aspect ratio, output type, resolution hint
6. [CONSTRAINTS]        — negative list: what to avoid
```

The more blocks you fill, the less the model improvises. Skip blocks only when you trust the default.

---

## Template Categories

### 1. UI & Interfaces

**Standard App/Dashboard**
```
为[产品类型]生成一张[iOS/Android/Web]界面图。
核心功能：[功能A]、[功能B]、[功能C]。
视觉风格：[极简/科技/拟物]，主色[颜色]，强调色[颜色]。
布局：[顶部导航/双栏/卡片流]，信息层级清晰，留白充足。
输出：高保真UI截图，文字清晰可读，比例[9:16/16:9]。
约束：文字必须准确显示，禁止乱码和占位文本，比例固定。
```

**Social Platform Screenshot (X / WeChat / Douyin / Xiaohongshu)**
```
生成一张[平台]内容截图，[深色/浅色]模式，比例[9:16/3:4/1:1]。
账号信息：[头像描述/用户名/认证标识]
正文内容：[具体文本，包含指定中文]
互动数据：[点赞/评论/转发/收藏数量]
界面元素：[状态栏/操作栏]
约束：文字必须准确，禁止乱码，比例固定。
```

**Live-stream Interface**
```
生成一张[抖音/快手/B站]直播界面截图。
主播：[描述]，姿态：[坐/站/动作]，服装：[描述]。
背景：[直播间描述]，灯光：[暖/冷/混合]。
UI层：顶部人数+关注，左下弹幕，右下商品卡片/礼物，底部输入框。
风格：[写实截图/高保真UI]，比例9:16。
约束：弹幕可读，元素不遮挡主播面部。
```

**JSON Agent Format (recommended for programmatic use)**
```json
{
  "type": "UI Screenshot",
  "platform": "iOS",
  "product": "Fitness App",
  "layout": "Card-based feed with bottom tab bar",
  "style": { "theme": "Dark Mode", "primary_color": "Neon Green" },
  "constraints": "High fidelity, readable text, 9:16 aspect ratio"
}
```

**Pitfalls:** Specify platform + ratio + layout. Lock text readability. Distinguish platform-specific chrome (X blue checkmark, Douyin music disc, Xiaohongshu dual-column).

---

### 2. Infographics & Knowledge Visualization

**Standard Infographic**
```
生成[具体主题]信息图，目标读者为[人群]。
结构：标题区 + [3-5]个模块（图标+短标题+1-2句说明）。
图表类型：[流程图/对比图/关系图/时间线]。
风格：[专业报告/科普插画]，主色[颜色]，背景[浅/深]。
输出：信息层级清晰、可读性高的中文信息图。
约束：不要长段正文塞进画面，模块数量锁定[N]个。
```

**Scientific Scale Diagram**
```
为[主题]生成一张科学尺度缩放信息图。
结构：6-8个圆形或六边形框，从微观到宏观递进排列。
每框包含：尺度名称、3-5词洞察、测量单位/放大倍率、高细节3D渲染。
用细线连接各尺度，避免重复层级。
标题："[主题]：AT EVERY SCALE"。
约束：不要通用放大镜图标，不要所有框大小一样，不要长段正文。
```

**Pitfalls:** Control module count. Use short copy only. No paragraphs inside the image.

---

### 3. Posters & Typography

**Campaign Poster (Standard)**
```
设计一张[活动/产品/电影]海报，主题为[主题词]。
主视觉：[主体元素]，标题：[文案]，副标题：[文案]。
版式：[居中/左对齐/对角构图]，风格：[复古/未来/极简]。
色彩：[主色+辅色]，氛围：[情绪词]。
输出：单张成品海报，可用于社媒传播。
约束：不要拼贴展示板，不要样机框。
```

**Sports Campaign Poster**
```
设计一张[运动项目]商业Campaign海报。
主体：[运动员/模特]，姿态：[冲刺/挥拍/力量动作]。
核心道具：[球鞋/球拍/哑铃]，以夸张比例成为视觉锚点。
大字标题："[主标题]"，辅助文案："[口号/数据]"。
风格：高端运动品牌广告，强光影，反光地面，干净构图。
配色：[主色+辅色]。
约束：不要错误运动器材，不要杂乱拼贴，主体清晰，文字可读。
输出：1:1或4:5，适合社媒传播。
```

**Conceptual Typography Poster (English)**
```
Create ONE finished premium conceptual typography poster for the exact title: "[TITLE]"

Single poster only. No moodboard, grid, presentation board, mockup, captions, prompt text.

The title must be the dominant visual structure: huge, readable, powerful, spelled exactly.
Typography is the hero — custom letterforms expressing the temperament of the title.

If the title refers to a known person, make a large editorial portrait occupy 40–70% of the composition, interacting with the typography (overlapping, emerging from, cast shadow, breaking through).

Use a restrained 4–6 color system: background / primary type / figure tone / emotional accent / support / texture.

Style: high-end editorial poster, museum-quality graphic design, dramatic scale, intelligent whitespace, silkscreen/lithograph grain, paper fibers, ink imperfections.

Avoid: generic word art, glossy 3D lettering, random icons, cluttered collage, misspelled typography.
```

**Conceptual Typography Poster (Chinese)**
```
为标题「[标题]」生成一张完成度极高的高级概念字体海报，只需一张。
不要moodboard、网格排版、展示板、样机、说明文字、过程稿。
标题必须是主视觉结构：巨大、可读、有力量、拼写完全正确。
字体是主角——字重、字宽、对比度、间距、变形必须表达标题气质。
如标题指向知名人物：大型编辑肖像占构图40%-70%，与字体互动。
使用受限4-6色调色板。
风格：高端编辑海报，博物馆级平面设计，戏剧性尺度，少元素，聪明留白。
避免：通用字效，光泽3D字体，随机图标，素材库写实，杂乱拼贴，拼写错误。
```

**Multi-Style Signature Selection Poster**
```
你是一个高端签名设计系统。
输入姓名：[姓名]
生成一张9:16竖版「多风格签名选择海报」，展示6种签名方案。
版式：纯白背景，留白40%以上，顶部大标题，2列×3行卡片网格。
6种风格：极简理性 / 狂放张力 / 松弛随性 / 东方行草 / 锋利结构 / 实验风格。
每卡片：编号+风格名+大尺寸签名+一句短气质说明+极轻点缀色。
禁止：字体拼贴，颜色杂乱，签名太小，排版松散，缺乏笔势。
```

**Ink Double Exposure Portrait Poster**
```
生成一张[人物/角色]的水墨双重曝光人物海报，9:16竖版。
上半区：放大的人物头部/面部轮廓，形成识别锚点。
中下区：全身或半身主体，姿态为[站姿/动作/凝视]。
剪影内部融合：[关键场景]+[象征物]+[环境纹理]，形成双重曝光叙事。
视觉连接：用云雾/水墨扩散/飞白边缘/负空间把各部分连成动线。
风格：东方水墨+写实电影感，克制高级，留白充足，层次丰富不杂乱。
文字：少量可读，像海报题签。
约束：不要硬拼贴，不要塞满背景，不要廉价武侠特效，主体清晰。
```

**Nature Science Poster (Apple Keynote Style)**
```
生成一张[物种名]的9:16竖版高级科普海报，Apple keynote风格。
背景：纯白或极浅灰白渐变，大量留白。
主体：超高清[物种名]，占画面50%-70%，棚拍光影，真实阴影。
顶部：大标题[中文物种名]+副标题[一句定位]+英文名+分布信息。
底部四栏：细线icon+彩色标题+1-3行短文，竖线分隔，不用卡片框。
底部总结句：灰色小字。
风格：Apple-inspired, premium editorial, clean typography, minimal infographic。
约束：不要传统信息图卡片，不要圆角框，不要复杂底纹，不要广告感。
```

---

### 4. Products & E-commerce

```
生成一张[商品名]的商业主图。
商品：[详细描述]，卖点：[卖点A/B/C]，材质：[材质]。
场景：[场景描述]，光线：[棚拍/自然/戏剧性]，构图：[居中/斜角]。
版块：主商品区 + 卖点标签 + 辅助道具。
约束：不要弱化商品识别的无关道具，约束包装文字和卖点表达。
输出：商业级别产品主图。
```

---

### 5. Brand & Logos

```
生成一套[品牌名]的品牌视觉系统。
品牌定位：[定位]，调色板：[主色+辅色]，字体风格：[字体描述]。
内容：Logo系统 + 品牌板 + VI样机（[触点列表]）。
视觉规则：所有应用统一配色和字体逻辑。
约束：不要无关Logo变体，不要混乱配色，品牌文字准确。
```

---

### 6. Photography & Photorealism

**Standard Photorealistic**
```
生成一张[场景描述]的写实照片。
机位：[远/中/近景]，镜头：[广角/标准/长焦/微距]。
光源：[自然光/棚拍/夜间路灯]，质感：[描述]，背景：[描述]。
加入可信的小瑕疵增强纪实感。
约束：不要过度磨皮，不要完美棚拍感（除非商业美妆）。
```

**RAW Phone Camera Style (ZeroLu trick)**
```
生成一张完全RAW质感、未经处理、未经编辑、具备完整iPhone相机画质的图像。
场景：[具体场景描述]，[运动模糊/轻微手抖]。
约束：不要过度后期，保留RAW感颗粒和自然色彩。
```

**Candid Street Moment (ZeroLu trick)**
```
生成一张街头抓拍/意外瞬间：[具体事件]。
机位高度：[腰部/肩部/地面]，运动模糊：[程度]，街景：[描述]。
约束：避免摆拍感和广告棚拍感，避免太干净的构图，事件要可信。
```

**360 Equirectangular Panorama (ZeroLu trick)**
```
[地点/场景]的360等距柱状全景图
```

---

### 7. Illustration & Art Styles

```
生成[主题]的[风格：动漫/水彩/油画/水墨/装饰画]插画。
构图：[描述]，主体：[描述]，配色：[描述]。
笔触材质：[描述]，情绪：[描述]，完成度：[草稿/完整]。
约束：不要只写风格不写构图。参考图任务需说明保留哪些特征。
```

---

### 8. Characters & Consistency

**Character Design Sheet**
```
生成一张[角色名]的角色设定表。
身份锚点：[脸/发型/服装/特征]，比例：[描述]。
动作数量：[N]个，版式：[网格排列]。
约束：不同动作间服装细节保持一致，面部保持一致。画面拥挤时减少动作数。
```

**3D Collectible Toy (freestylefly trick)**
```
基于参考图生成一个3D收藏玩具/潮玩。
保留参考图的脸和服装锚点。
材质：[材质]，包装：[描述]，底座：[描述]，光线：[描述]。
约束：不要没有身份细节的通用玩具，包装文字少量且准确。
```

---

### 9. Scenes & Storytelling

```
生成一张[主题]叙事场景图。
人物：[描述]，地点：[描述]，时间：[描述]。
冲突/情绪：[描述]，机位：[描述]。
用场景细节服务故事而非装饰。
约束：不要通用幻想背景，让故事线索在画面里可见。
```

---

### 10. Games & Entertainment (ZeroLu specialty)

```
生成一张[游戏名]风格的游戏截图/场景。
内容：[具体场景/对局描述]。
风格：[游戏名]的官方视觉美学，细节真实。
```

**Photorealistic game screenshot trick:**
```
[游戏名]游戏内画面，非常细致，非常真实。
镜头是对着一台固定的4K显示器近距离拍摄的（画面带轻微模糊，像是手持拍摄）。
场景：[具体描述]。
```

**Micro text trick (ZeroLu trick):**
```
[大量某物品]，其中有一个上面写着极小的文字"[文字]"
```

**100 pixel art items grid (ZeroLu trick):**
```
生成一张单图，里面包含100个完全不同的像素风物品，每个物品都带有有意义的标签。
```

---

### 11. History & Classical Themes

```
生成[主题]的[朝代/历史风格]主题视觉。
朝代：[朝代]，服饰制度：[描述]，器物参考：[描述]。
版式：[长卷/册页/海报]，文化气质：[描述]。
约束：需要历史准确时不要朝代混搭，不要随机现代物件。
```

---

### 12. Documents & Publishing

```
生成一张[白皮书/手册/报告页面/百科图鉴]版式图。
页面尺寸：[A4/16:9]，分栏：[单/双/三]。
内容层级：标题+副标题+正文+图表+说明。
约束：避免密集小字，图表和说明对齐页面网格。
```

---

## Power Tricks Summary

| 技巧 | 来源 | 用法 |
|------|------|------|
| RAW未处理声明 | ZeroLu | 追求纪实感摄影 |
| 6-block结构 | freestylefly | 所有类型通用 |
| JSON Agent Format | freestylefly | 程序化/Agent调用 |
| 360等距柱状全景 | ZeroLu | 全景图生成 |
| 米粒微型文字 | ZeroLu | 极小文字特效 |
| 100像素风物品网格 | ZeroLu | 批量图标生成 |
| "手机对屏幕拍摄"trick | ZeroLu | 游戏截图写实感 |
| 负面约束锁定 | 三个repo通用 | 所有类型 |
| 平台特征锁定 | freestylefly | UI/截图类 |
| 比例在最前声明 | freestylefly | 所有类型 |
| 文字可读性约束 | 三个repo通用 | 含文字的场景 |
| 角色身份锚点 | freestylefly | 角色一致性 |
| Apple keynote风格触发词 | freestylefly | 科普/极简海报 |
| 双重曝光水墨 | freestylefly | 人物艺术海报 |

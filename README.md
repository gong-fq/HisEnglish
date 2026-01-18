# Chronos: 英语史探索

龚凤乾教授设计的交互式英语史学习工具，集成 DeepSeek AI 智能问答助手和对话历史管理功能。

## ✨ 功能特点

- 📚 **13个英语发展阶段**：从原始日耳曼语到当代英语，涵盖语音、语法、词汇等多维度演变
- 🎯 **中英双语内容**：每个时期都有详细的中英文对照说明
- 🔊 **语音朗读功能**：支持中英文文本的语音播放
- 🤖 **AI智能助手**：基于 DeepSeek API 的专业语言史问答
- 💬 **智能语言识别**：中文提问自动中文回复，英文提问自动英文回复
- 📝 **对话历史管理**：
  - 自动保存所有对话记录
  - 随时查看和恢复历史对话
  - 单个删除或批量清空功能
  - 对话按时间排序展示
- 🎨 **优雅的用户界面**：现代化设计，跳动圆点加载动画
- 📖 **权威参考资料**：每个时期都提供学术参考链接

## 🚀 快速部署到 Netlify

### 方法一：通过 Netlify 网站部署（推荐）

#### 1. 准备工作
- GitHub 账户
- Netlify 账户（可使用 GitHub 登录）
- DeepSeek API Key（从 [https://platform.deepseek.com](https://platform.deepseek.com) 获取）

#### 2. 上传到 GitHub
```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: English History Explorer"

# 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/your-username/chronos-english-history.git

# 推送到 GitHub
git push -u origin main
```

#### 3. 连接 Netlify
1. 登录 [https://app.netlify.com](https://app.netlify.com)
2. 点击 **"Add new site"** > **"Import an existing project"**
3. 选择 **"GitHub"**，授权并选择您的仓库
4. 构建设置：
   - **Build command**: `echo 'No build required'`（或留空）
   - **Publish directory**: `.`（当前目录）
5. 点击 **"Deploy site"**

#### 4. 配置环境变量
1. 进入 **Site settings** > **Environment variables**
2. 添加新变量：
   - **Key**: `DEEPSEEK_API_KEY`
   - **Value**: 您的 DeepSeek API Key
3. 保存后点击 **Trigger deploy** 重新部署

### 方法二：通过 Netlify CLI 部署

#### 1. 安装 Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. 登录 Netlify
```bash
netlify login
```

#### 3. 初始化项目
```bash
netlify init
```

按提示选择：
- **Create & configure a new site**
- 输入站点名称
- 选择团队

#### 4. 设置环境变量
```bash
netlify env:set DEEPSEEK_API_KEY "your_deepseek_api_key_here"
```

#### 5. 部署
```bash
netlify deploy --prod
```

## 💻 本地开发

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
创建 `.env` 文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件，添加您的 API Key：
```
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 3. 启动开发服务器
```bash
netlify dev
```

### 4. 访问应用
打开浏览器访问 [http://localhost:8888](http://localhost:8888)

## 📖 使用指南

### 浏览英语史
1. **选择时期**：点击左侧导航栏的不同历史时期
2. **查看内容**：浏览中英双语的简介和详细内容
3. **语音朗读**：点击播放按钮听取内容
4. **深度解析**：点击"获取深度史料解析"按钮查看详细信息

### AI 助手对话
1. **打开对话**：点击右下角蓝色聊天图标
2. **开始提问**：输入关于当前时期的问题
3. **智能回复**：AI 会根据您的语言自动用中文或英文回答
4. **新建对话**：点击 **+** 图标开始新对话
5. **查看历史**：点击时钟图标查看所有历史对话

### 历史记录管理
- **查看历史**：点击对话窗口顶部的时钟图标
- **加载对话**：点击历史记录项目恢复之前的对话
- **删除对话**：点击单个对话的垃圾桶图标删除
- **清空所有**：点击顶部的垃圾桶图标清空所有历史

### 示例问题

**中文问题：**
- "古英语和现代英语有什么主要区别？"
- "元音大推移是什么时候发生的？"
- "诺曼征服对英语有什么影响？"
- "莎士比亚创造了哪些英语词汇？"

**English Questions:**
- "What are the main features of Old English?"
- "When did the Great Vowel Shift occur?"
- "How did the Norman Conquest affect English?"
- "What words did Shakespeare create?"

## 📁 项目结构

```
chronos-english-history/
├── index.html                # 主应用文件
├── netlify.toml             # Netlify 配置
├── package.json             # 项目配置
├── .env.example            # 环境变量模板
├── .gitignore              # Git 忽略文件
├── README.md               # 项目文档
└── netlify/
    └── functions/
        └── chat.js         # DeepSeek AI 聊天后端
```

## 🛠 技术栈

- **前端框架**: React 18 (CDN)
- **样式**: TailwindCSS
- **图标**: Font Awesome 6
- **后端**: Netlify Functions (Serverless)
- **AI模型**: DeepSeek Chat API
- **存储**: LocalStorage (对话历史)
- **部署**: Netlify

## 🔧 故障排查

### AI 助手无响应或报错

**检查清单：**

1. **环境变量设置**
   ```bash
   # 本地检查
   cat .env
   
   # Netlify 检查
   netlify env:list
   ```
   - 确保 `DEEPSEEK_API_KEY` 已正确设置
   - 修改后需要重新部署

2. **API Key 有效性**
   - 访问 [https://platform.deepseek.com](https://platform.deepseek.com)
   - 检查 API Key 是否有效
   - 确认账户余额充足

3. **查看函数日志**
   ```bash
   # 本地开发
   # 查看终端输出
   
   # Netlify 生产环境
   # 访问 Site > Functions > chat 查看日志
   ```

4. **测试 API 连接**
   ```bash
   curl -X POST https://your-site.netlify.app/.netlify/functions/chat \
     -H "Content-Type: application/json" \
     -d '{
       "messages": [{"role":"user","content":"测试"}],
       "currentEra": {"name":"测试","enName":"Test","year":"2024"}
     }'
   ```

### 对话历史丢失

对话历史保存在浏览器的 LocalStorage 中：
- 清除浏览器数据会丢失历史
- 不同浏览器或设备间不共享
- 建议定期导出重要对话

### 部署失败

1. **检查文件完整性**
   ```bash
   ls -la
   # 确保所有文件都已提交
   ```

2. **查看部署日志**
   - Netlify 后台 > Deploys > 点击具体部署查看日志

3. **重新部署**
   ```bash
   netlify deploy --prod
   ```

## 🔐 安全提示

1. **保护 API Key**
   - 永远不要将 API Key 提交到代码仓库
   - 使用环境变量存储敏感信息
   - 定期更换 API Key

2. **Git 配置**
   确保 `.gitignore` 包含：
   ```
   .env
   node_modules/
   .netlify/
   ```

3. **成本控制**
   - 设置 API 使用限额
   - 监控 API 调用次数
   - 定期检查账单

## 📚 参考资源

### DeepSeek API
- 文档: [https://platform.deepseek.com/docs](https://platform.deepseek.com/docs)
- API Key 管理: [https://platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)

### Netlify
- 文档: [https://docs.netlify.com](https://docs.netlify.com)
- Functions 指南: [https://docs.netlify.com/functions/overview](https://docs.netlify.com/functions/overview)

### 学术资源
- Oxford English Dictionary: [https://www.oed.com](https://www.oed.com)
- British Library: [https://www.bl.uk](https://www.bl.uk)
- Linguistic Society: [https://www.linguisticsociety.org](https://www.linguisticsociety.org)

## 🤝 贡献

欢迎提出问题和改进建议！

## 📄 许可证

MIT License

## 👨‍🏫 作者

龚凤乾教授

---

**享受探索英语演变历史的旅程！** 🌍📖✨

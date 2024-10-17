const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 6099; // 选择的端口

// 设置静态文件夹为更新文件的目录
const updatesDir = path.join(__dirname, 'updates');

// 列出静态文件夹中的文件
app.get('/updates/', (req, res) => {
  fs.readdir(updatesDir, (err, files) => {
    if (err) {
      return res.status(500).send('无法读取目录');
    }

    // 创建一个文件列表
    const fileList = files.map(file => `<li><a href="/updates/${file}">${file}</a></li>`).join('');
    res.send(`<h1>更新文件列表</h1><ul>${fileList}</ul>`);
  });
});

// 提供静态文件服务
app.use('/updates', express.static(updatesDir));

// 启动服务器
app.listen(PORT, () => {
  console.log(`更新服务器正在运行，访问地址：http://localhost:${PORT}/updates/`);
});

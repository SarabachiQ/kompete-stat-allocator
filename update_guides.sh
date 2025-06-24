#!/data/data/com.termux/files/usr/bin/bash

JST_TIME=$(TZ=Asia/Tokyo date "+%Y-%m-%d_%H-%M")
NEW_FILE="KOMPETE_GUIDE_${JST_TIME}.md"

# 新ガイド生成（相互リンク付き）
cat > $NEW_FILE << 'EOF'
# 🧠 KOMPETE Stat Allocator 攻略ブック（${JST_TIME}作成）

...（ここに攻略ブック本文テンプレ改めて入れてください）...

---

## 🔗 関連ファイル

- [GUIDE index](KOMPETE_GUIDE_index.md)
- [TERMS v0.1](KOMPETE_TERMS_v0.1.md)
- [README](README.md)

EOF

# indexファイルに追加
cat >> KOMPETE_GUIDE_index.md << EOF

- [${JST_TIME}版]($NEW_FILE)
EOF

echo "✅ Created $NEW_FILE and updated index"

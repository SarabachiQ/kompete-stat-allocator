#!/data/data/com.termux/files/usr/bin/bash

JST_TIME=$(TZ=Asia/Tokyo date "+%Y-%m-%d_%H-%M")

FILENAME="KOMPETE_GUIDE_${JST_TIME}.md"

cat > $FILENAME << 'EOF'
```markdown
# 🧠 KOMPETE Stat Allocator 攻略ブック（${JST_TIME}作成）

この攻略ブックは、KOMPETE用「Stat Allocator」開発の記録です。作業効率を高め、過去の認識を正しく共有する目的で記録しています。

---

## 📁 プロジェクト構成

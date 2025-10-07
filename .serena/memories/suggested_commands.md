# 開発コマンドと使用方法

## 主要なスクリプト

### 開発関連
```bash
# 開発モード（ホットリロード付き）
npm run dev

# 本番用ビルド
npm run build

# 本番サーバー起動
npm start
```

### コード品質管理
```bash
# リント実行（チェックのみ）
npm run lint

# リント実行（自動修正付き）
npm run lint:fix

# 型チェック
npm run typecheck
```

### VoltAgent関連
```bash
# VoltAgent CLI
npm run volt
```

## 環境設定

### 1. 初期セットアップ
```bash
# 依存関係インストール
npm install

# 環境変数設定
cp .env.example .env
```

### 2. 必要なAPIキー
- **OpenAI API Key**: https://platform.openai.com/api-keys
- **Qiita API Key**: Qiita設定から取得

### 3. 環境変数設定 (.env)
```env
OPENAI_API_KEY=your-openai-api-key
QIITA_API_KEY=your-qiita-api-key

# VoltOps（任意）
VOLTAGENT_PUBLIC_KEY=your-public-key
VOLTAGENT_SECRET_KEY=your-secret-key
```

## Dockerでの実行
```bash
# Dockerイメージビルド
docker build -t volt-qiita-agent .

# Dockerコンテナ実行
docker run -p 3141:3141 --env-file .env volt-qiita-agent
```

## VoltOps監視
- 開発時: http://localhost:3141 で自動接続
- 本番時: console.voltagent.dev でリアルタイム監視
# AWS Battle

AWSサービスの公式アイコンを使用したトリプルトライアドゲームです。

## 特徴

- **実際のAWSアイコン**: AWS公式アイコンパッケージから10種類のサービスアイコンを使用
  - Amazon EC2, S3, Lambda, RDS, DynamoDB, EBS, Aurora, Batch, EFS, ElastiCache
- **UDフォント**: 目に優しいBIZ UDPGothicフォントを使用
- **淡い配色**: 目に優しく識別しやすい淡い色合いを採用
- **トリプルトライアドルール**: 3x3のボードでカードの数値を比較して相手のカードを奪取

## ゲームルール

1. プレイヤーとCPUがそれぞれ5枚のAWSサービスカードを持ってゲーム開始
2. 3x3のボードに交互にカードを配置
3. 配置したカードの数値が隣接する相手のカードより大きい場合、相手のカードを奪取
4. 全てのマスが埋まった時点で、より多くのカードを持っている方が勝利

## 実行方法

### 方法1: Pythonサーバーを使用
```bash
python aws_battle_server.py
```
ブラウザで http://localhost:5001 にアクセス

### 方法2: 直接HTMLファイルを開く
aws_battle.htmlファイルをブラウザで直接開く

## ファイル構成

- `aws_battle.html` - メインのHTMLファイル
- `aws_battle.css` - スタイルシート（淡い配色、UDフォント）
- `aws_battle.js` - ゲームロジック
- `aws_battle_server.py` - Pythonサーバー
- `Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803/` - AWS公式アイコンパッケージ

## 使用されるAWSサービス

各カードには実際のAWSサービスの特性を反映した数値が設定されています：

- **Amazon EC2** - コンピューティングの基盤サービス
- **Amazon S3** - オブジェクトストレージサービス
- **AWS Lambda** - サーバーレスコンピューティング
- **Amazon RDS** - リレーショナルデータベース
- **Amazon DynamoDB** - NoSQLデータベース
- **Amazon EBS** - ブロックストレージ
- **Amazon Aurora** - 高性能データベース
- **AWS Batch** - バッチ処理サービス
- **Amazon EFS** - ファイルシステム
- **Amazon ElastiCache** - インメモリキャッシュ

## 技術仕様

- **HTML5** - ゲーム画面の構造
- **CSS3** - 淡い色合いのデザイン、UDフォント
- **JavaScript** - ゲームロジック、DOM操作
- **Python Flask** - 静的ファイル配信
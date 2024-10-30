# [K-means法 クラスタリング](https://kmeans-clustering.vercel.app)

> 人工知能とデータマイニング 任意課題3

[プロジェクトはこちら(WebApp)](https://kmeans-clustering.vercel.app)

[レポートはこちら(pdf)](https://github.com/user-attachments/files/17566025/aiAndDataming_task3.pdf)

![ogp](https://github.com/user-attachments/assets/8ff9fc00-43bd-4cf3-a900-68e01c12fcfd)


このプロジェクトは、CSVファイルから読み込んだ東京都市大学横浜キャンパスの2号館の太陽光発電システムのデータに対してバッグエンドでK-meansクラスタリング(k=3)を実行し、その結果をJSON形式で返しクライアントで表示するNext.jsアプリケーションです。

## プロジェクト概要

18時間×31日分の実発電量、日射量、気温、消費電力量のデータを持つ`data1.csv`、`data2.csv`、`data3.csv`のいずれかを使用して、K-means法でクラスタリングを行います。このAPIは、クラスタリング結果をクライアントに返し、データ分析や視覚化のために利用できます。

## ファイル構成

```

/k-means
├── /app
│   ├── /api
│   │   └── /clustering
│   │       └── route.ts         # クラスタリング処理のAPIルート
│   └── page.tsx                 # クラスタリング結果を表示するクライアントページ
|   └── layout.tsx               # Layoutページ
├── /data
│   ├── data1.csv                # 元データの一部 (実発電量、日射量、気温、消費電力量)
│   ├── data2.csv                # 元データの一部 (上限値が1になるように変換されたデータ)
│   └── data3.csv                # 元データの一部 (下限値が0、上限値が1になるように変換されたデータ)
│   └── sysData.xlsx             # エクセルファイル (全て結合されたデータ)
├── package.json
└── README.md

```

## 必要な環境

- Node.js v18.18.0以上
- Next.js v15
- TypeScript

## インストールとセットアップ

1. **リポジトリのクローン**:

   ``` bash
   git clone https://github.com/ManatoYamashita/k-means-clustering.git
   cd k-means-clustering
   ```

2. **依存関係のインストール**:

   ``` bash
   npm install
   ```

3. **データファイルの配置**:
   プロジェクトルートに`data`フォルダを作成し、`data1.csv`、`data2.csv`、`data3.csv`を配置してください。

## 使用方法

1. **サーバーの起動**:

   ``` bash
   npm run dev
   ```

2. **APIエンドポイントの使用**:
   ブラウザまたはAPIクライアントで`http://localhost:3000/api/clustering`にアクセスします。APIはランダムに選ばれたCSVファイルからデータを読み込み、クラスタリング結果をJSON形式で返します。

3. **クライアントページの表示**:

   ![k-means](https://github.com/user-attachments/assets/853ded59-093a-4763-8087-d51ea91af7ca)

   クライアントサイドでクラスタリング結果を確認するには、ブラウザで`http://localhost:3000`を開いてください。

## データの処理フロー

1. **CSVファイルの読み込み**:
   `Papa.parse`を使ってCSVファイルを読み込み、太陽光発電システムの実発電量、日射量、気温、消費電力量のデータを抽出します。データの空欄がある行はスキップします。

2. **K-meansクラスタリング**:
   `kmeans-js`ライブラリを使用してK-meansクラスタリング(今回はk=3)を実行し、データをいくつかのクラスタに分割します。

3. **クラスタリング結果の返却**:
   クラスタリング結果はJSON形式で返却され、クライアントページで視覚化されます。

## 注意事項

- CSVファイルの内容に空欄や不正なデータが含まれると、該当の行はスキップされます。
- クラスタリング結果の構造が変わる場合があるため、デバッグやデータの整形の際にはコンソールログを確認してください。

## ライブラリ

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [PapaParse](https://www.papaparse.com/) - CSVファイルのパース
- [kmeans-js](https://www.npmjs.com/package/kmeans-js) - K-meansクラスタリング

## ライセンス

MIT

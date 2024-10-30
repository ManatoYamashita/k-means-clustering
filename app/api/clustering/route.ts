import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import Papa from "papaparse";
import kmeans from "kmeans-js";

// CSVファイルを読み込む関数
const loadCsvData = async (filePath: string) => {
  return new Promise<number[][]>((resolve, reject) => {
    const file = fs.createReadStream(filePath);
    const data: number[][] = [];

    Papa.parse(file, {
      header: false,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("CSV parsing complete. Rows parsed:", results.data.length);

        // 必要なデータ範囲 (18時間 x 31日分)を抽出し、数値データとして取得
        (results.data as string[][]).slice(0, 558).forEach((row, index) => {
          const actualPower = row[0] ? parseFloat(row[0]) : null;
          const solarRadiation = row[1] ? parseFloat(row[1]) : null;
          const temperature = row[2] ? parseFloat(row[2]) : null;
          const powerConsumption = row[3] ? parseFloat(row[3]) : null;

          if (
            actualPower === null || solarRadiation === null ||
            temperature === null || powerConsumption === null
          ) {
            console.warn(`Skipping invalid row ${index + 1}:`, row);
            return; // 無効な行をスキップ
          }

          data.push([actualPower, solarRadiation, temperature, powerConsumption]);
        });
        resolve(data);
      },
      error: (error) => {
        console.error("Error parsing CSV file:", error);
        reject(error);
      },
    });
  });
};

export async function GET() {
  try {
    // ランダムでCSVファイルを選択
    const random = Math.floor(Math.random() * 3) + 1;
    const selectedFile = `data${random}.csv`; // ランダムで選ばれたファイル名
    const csvFilePath = path.join(process.cwd(), "data", selectedFile);

    // データの読み込み
    const data = await loadCsvData(csvFilePath);
    console.log("Data loaded successfully. Sample data:", data.slice(0, 5));

    // K-meansクラスタリングの実行
    const k = 3;
    const km = new kmeans({ k });
    const clusteringResult = km.cluster(data);

    // クラスタ結果と選択したファイル名をJSONとして返す
    return NextResponse.json({ clusters: clusteringResult, file: selectedFile });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error in API route:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

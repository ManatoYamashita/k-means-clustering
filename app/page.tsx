"use client"

import { useEffect, useState, useRef, createRef } from "react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import gsap from "gsap"
import styles from "./page.module.css"

type ClusterData = {
  clusters: number[][],
  file: string
}

export default function HomePage() {
  const [clusters, setClusters] = useState<number[][] | null>(null)
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [clusterRefs, setClusterRefs] = useState<React.RefObject<HTMLDivElement>[]>([])
  const containerRef = useRef(null)

  const fetchClusters = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/clustering")
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data: ClusterData = await response.json()
      setSelectedFile(data.file)
      setClusters(data.clusters ?? null)
      
      // 新しいクラスターデータが来たときに ref を更新
      setClusterRefs((refs) =>
        data.clusters.map((_, i) => refs[i] || createRef())
      )
    } catch (error) {
      console.error("Error fetching clusters:", error)
      setError("クラスタリングデータの取得に失敗しました。後でもう一度お試しください。")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchClusters()
  }, [])

  useEffect(() => {
    if (clusters) {
      // 各クラスターデータの要素にアニメーションを適用
      clusterRefs.forEach((ref) => {
        gsap.from(ref.current, {
          opacity: 0,
          y: -50,
          duration: 0.8,
          ease: "power2.out",
        })
      })
    }
  }, [clusters, clusterRefs])

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <main ref={containerRef} className="flex-grow m-auto mt-6">
        <h1 className={`text-3xl font-bold mb-6 ${styles.fadeInSlideUp}`}>人工知能とデータマイニング 任意課題3</h1>
        <h2 className={`font-semibold mb-4 ${styles.fadeInSlideUp}`}><Link href="https://manapuraza.com">g2172117: 山下マナト</Link></h2>

        <p className={`mb-4 ${styles.fadeInSlideUp}`}>K-means法でdata1.csvまたはdata2.csv、data3.csvをランダムでクラスタリングするプログラム。(k=3)クラスタリング結果は以下</p>

        <Button
          onClick={fetchClusters}
          className={`mb-4 px-4 py-2 hover:bg-white hover:text-primary border border-primary ${styles.fadeInSlideUp}`}
        >
          クラスタリングを再実行
        </Button>

        <hr className="mb-4" />
        {selectedFile && (
          <p className="mb-4 inline-flex items-center">
            <Image
              src="/file.svg"
              alt="Kmeans clustered file"
              width={16}
              height={16}
              className="mr-1"
            />
            <span className="font-semibold">{selectedFile}</span>
          </p>
        )}

        {error ? (
          <Alert variant="destructive">
            <AlertTitle>エラー</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center text-lg text-primary mb-4">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              データを読み込み中...
            </div>
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-[250px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[200px] mt-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : clusters && clusters.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clusters.map((cluster, index) => (
              <Card key={index} ref={clusterRefs[index]}>
                <CardHeader>
                  <CardTitle>Cluster: {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside">
                    {cluster.map((item, idx) => (
                      <li key={idx}>dataPoint: <strong>{item}</strong></li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Alert>
            <AlertTitle>情報</AlertTitle>
            <AlertDescription>クラスタリングデータが見つかりませんでした。</AlertDescription>
          </Alert>
        )}
      </main>

      <hr className="mb-4 mt-6" />

      <ol className="fadeInSlideUp list-decimal list-inside mt-6 mb-6 ml-4">
          <li><Link className="text-blue-600 hover:underline" href="https://nextjs.org">Next.js Approuter</Link> with <Link className="text-blue-600 hover:underline" href="https://www.typescriptlang.org/">Typescript</Link>: javascriptアプリケーション</li>
          <li><Link className="text-blue-600 hover:underline" href="https://ui.shadcn.com">shadcn-ui</Link>: UIコンポーネント</li>
          <li><Link className="text-blue-600 hover:underline" href="https://www.npmjs.com/package/kmeans-js">kmeans-jsライブラリ</Link>: kmeans法によるクラスタリング</li>
          <li><Link className="text-blue-600 hover:underline" href="https://www.papaparse.com/">papaparseライブラリ</Link>: CSVのパース</li>
      </ol>

      <footer className="fadeInSlideUp mt-8 py-4 text-center text-sm text-gray-600">
        <p>©︎2024 <Link href="https://manapuraza.com" className="text-blue-600 hover:underline">山下マナト</Link> / <Link href="https://github.com/ManatoYamashita/kmeans-clustering" className="text-blue-600 hover:underline">Githubリポジトリ</Link> / <Link href="/aiAndDataming_task3.pdf">レポート</Link></p>
      </footer>
    </div>
  )
}

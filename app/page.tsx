'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

type ClusterData = {
  clusters: number[][]
}

export default function HomePage() {
  const [clusters, setClusters] = useState<number[][] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchClusters = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/clustering")
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data: ClusterData = await response.json()
        console.log("API response data:", data) // Debug log
        setClusters(data.clusters ?? null)
      } catch (error) {
        console.error("Error fetching clusters:", error)
        setError("クラスタリングデータの取得に失敗しました。後でもう一度お試しください。")
      } finally {
        setIsLoading(false)
      }
    }
    fetchClusters()
  }, [])

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <main className="flex-grow">
        <h1 className="text-3xl font-bold mb-6">人工知能とデータマイニング 任意課題3</h1>
        <h2 className="font-semibold mb-4">g2172117: 山下マナト</h2>

        <p className="mb-4">K-means法でdata1.csvまたはdata2.csv、data3.csvをランダムでクラスタリングするプログラム。クラスタリング結果は以下</p>

        <hr className="mb-4" />

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
              <Card key={index}>
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

      <ol className="list-decimal list-inside mt-6 mb-6 ml-4">
          <li><Link className="text-blue-600 hover:underline" href="https://nextjs.org">Next.js Approuter</Link> with <Link className="text-blue-600 hover:underline" href="https://www.typescriptlang.org/">Typescript</Link>で作成</li>
          <li><Link className="text-blue-600 hover:underline" href="https://ui.shadcn.com">shadcn-ui</Link></li>
          <li><Link className="text-blue-600 hover:underline" href="https://www.npmjs.com/package/kmeans-js">kmeans-jsライブラリ</Link></li>
      </ol>

      <footer className="mt-8 py-4 text-center text-sm text-gray-600">
        ©︎2024 <Link href="https://manapuraza.com" className="text-blue-600 hover:underline">manapuraza.com</Link> / <Link href="https://github.com/manatoYamshita" className="text-blue-600 hover:underline">Githubリポジトリ</Link>
      </footer>
    </div>
  )
}

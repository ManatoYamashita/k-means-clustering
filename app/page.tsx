"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import ClusterList from "@/components/ClusterList";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Footer from "@/components/Footer";

type ClusterData = {
  clusters: number[][];
  file: string;
};

export default function HomePage() {
  const [clusters, setClusters] = useState<number[][] | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchClusters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/clustering");

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: ClusterData = await response.json();
      setSelectedFile(data.file);
      setClusters(data.clusters ?? null);
    } catch (error) {
      console.error("Error fetching clusters:", error);
      setError(
        "クラスタリングデータの取得に失敗しました。後でもう一度お試しください。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClusters();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <main className="flex-grow m-auto mt-6">
        <Header />

        <Button
          onClick={fetchClusters}
          className={`mb-4 px-4 py-2 hover:bg-white hover:text-primary border border-primary ${styles.fadeInSlideUp} ${styles.delay2}`}
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
          <LoadingSkeleton />
        ) : clusters && clusters.length > 0 ? (
          <ClusterList clusters={clusters} />
        ) : (
          <Alert>
            <AlertTitle>情報</AlertTitle>
            <AlertDescription>
              クラスタリングデータが見つかりませんでした。
            </AlertDescription>
          </Alert>
        )}
      </main>
      
      <hr className="mb-4 mt-6" />

      <Footer />
    </div>
  );
}

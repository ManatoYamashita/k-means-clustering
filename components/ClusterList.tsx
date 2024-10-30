import ClusterCard from "./ClusterCard";
import { useEffect, useState, createRef } from "react";
import gsap from "gsap";

type ClusterListProps = {
  clusters: number[][];
};

export default function ClusterList({ clusters }: ClusterListProps) {
  const [clusterRefs, setClusterRefs] = useState<
    React.RefObject<HTMLDivElement>[]
  >([]);

  useEffect(() => {
    // クラスタの数に合わせて ref を作成
    setClusterRefs((refs) =>
      clusters.map((_, i) => refs[i] || createRef<HTMLDivElement>())
    );
  }, [clusters]);

  useEffect(() => {
    // 各クラスタカードに時間差をつけてアニメーションを適用
    gsap.from(
      clusterRefs.map((ref) => ref.current), // すべての ref を対象に
      {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2, // 各要素のアニメーションの開始間隔
      }
    );
  }, [clusterRefs]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clusters.map((cluster, index) => (
        <ClusterCard
          key={index}
          cluster={cluster}
          index={index}
          ref={clusterRefs[index]}
        />
      ))}
    </div>
  );
}

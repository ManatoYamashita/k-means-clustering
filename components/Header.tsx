import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Header() {
  return (
    <header className="mt-6">
      <h1 className={`text-3xl font-bold mb-6 ${styles.fadeInSlideUp}`}>
        人工知能とデータマイニング 任意課題3
      </h1>
      <h2 className={`font-semibold mb-4 ${styles.fadeInSlideUp}`}>
        <Link href="https://manapuraza.com">g2172117: 山下マナト</Link>
      </h2>
      <p className={`mb-4 ${styles.fadeInSlideUp} ${styles.delay1}`}>
        K-means法でdata1.csvまたはdata2.csv、data3.csvをランダムでクラスタリングするプログラム。(k=3)クラスタリング結果は以下
      </p>
    </header>
  );
}

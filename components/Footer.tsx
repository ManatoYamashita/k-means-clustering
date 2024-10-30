import Link from "next/link";
import styles from "@/app/page.module.css";

export default function Footer() {
  return (
    <footer
      className={`mt-8 py-4 text-center text-sm text-gray-600 ${styles.fadeInSlideUp} ${styles.delay1}`}
    >
        <ol
        className={`list-decimal list-inside text-start mt-6 mb-6 ml-4 ${styles.fadeInSlideUp}`}
        >
            <li>
                <Link
                    className="text-blue-600 hover:underline"
                    href="https://nextjs.org"
                >
                Next.js Approuter
                </Link>{" "}
                with{" "}
                <Link
                    className="text-blue-600 hover:underline"
                    href="https://www.typescriptlang.org/"
                >
                Typescript
                </Link>
                : javascriptアプリケーション
            </li>
            <li>
                <Link
                    className="text-blue-600 hover:underline"
                    href="https://ui.shadcn.com"
                >
                shadcn-ui
                </Link>
                : UIコンポーネント
            </li>
            <li>
                <Link
                    className="text-blue-600 hover:underline"
                    href="https://www.npmjs.com/package/kmeans-js"
                >
                kmeans-jsライブラリ
                </Link>
                : kmeans法によるクラスタリング
            </li>
            <li>
                <Link
                    className="text-blue-600 hover:underline"
                    href="https://www.papaparse.com/"
                >
                papaparseライブラリ
                </Link>
                : CSVのパース
            </li>
            <li>
                <Link
                    href="https://github.com/ManatoYamashita/kmeans-clustering"
                    className="text-blue-600 hover:underline"
                >
                    Githubリポジトリ
                </Link>
            </li>
            <li>
                <Link 
                    className="text-blue-600 hover:underline" 
                    href="/aiAndDataming_task3.pdf"
                >
                レポート
                </Link>
            </li>
        </ol>
        <p>
            ©︎2024{" "}
            <Link href="https://manapuraza.com" className="text-blue-600 hover:underline">
            東京都市大学情報システム学科 山下マナト(g2172117)
            </Link>
        </p>
    </footer>
  );
}

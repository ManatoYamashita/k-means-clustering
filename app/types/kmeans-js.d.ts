// kmeans-js.d.ts
declare module 'kmeans-js' {
  type KMeansOptions = {
    k: number;
    maxIter?: number;
  };

  type KMeansResult = {
    centroids: number[][];
    clusters: number[][];
  };

  export default class KMeans {
    constructor(options: KMeansOptions);
    cluster(data: number[][]): KMeansResult;
  }
}

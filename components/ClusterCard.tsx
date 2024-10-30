import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type ClusterCardProps = {
  cluster: number[];
  index: number;
  ref?: React.RefObject<HTMLDivElement>;
};

const ClusterCard = React.forwardRef<HTMLDivElement, ClusterCardProps>(
  ({ cluster, index }, ref) => (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>Cluster: {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside">
          {cluster.map((item, idx) => (
            <li key={idx}>
              dataPoint: <strong>{item}</strong>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
);

ClusterCard.displayName = "ClusterCard";

export default ClusterCard;

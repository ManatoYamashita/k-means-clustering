import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function LoadingSkeleton() {
  return (
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
  );
}

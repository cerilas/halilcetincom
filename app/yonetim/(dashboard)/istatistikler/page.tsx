import { AnalyticsDashboard } from "@/components/analytics-dashboard";
import { GoogleRankTracker } from "@/components/google-rank-tracker";

export default function IstatistiklerPage() {
  return (
    <div className="h-full space-y-8">
      <GoogleRankTracker />
      <AnalyticsDashboard />
    </div>
  );
}

import { DetailView } from "@/components/containers/detail-view";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function RecipientDetail() {
  return(
    <div>
    <TooltipProvider>
      <DetailView />
    </TooltipProvider>
    </div>
  )
}
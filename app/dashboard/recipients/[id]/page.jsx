import { DetailView } from "@/components/containers/detail-view";
import { TooltipProvider } from "@/components/ui/tooltip";
import DetailView2 from "./DetailView2";

export default function RecipientDetail() {
  return(
    <div>
    <TooltipProvider>
      <DetailView recipientId={2} />
    </TooltipProvider>
    {/* <DetailView2 recipientId={2} /> */}
    </div>
  )
}
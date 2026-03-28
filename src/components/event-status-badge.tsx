import type { EventStatus } from "@/data/events";
import { getEventStatusLabel, getEventStatusVariant } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

type EventStatusBadgeProps = {
  status: EventStatus;
};

export function EventStatusBadge({ status }: EventStatusBadgeProps) {
  return (
    <Badge variant={getEventStatusVariant(status)}>
      {getEventStatusLabel(status)}
    </Badge>
  );
}

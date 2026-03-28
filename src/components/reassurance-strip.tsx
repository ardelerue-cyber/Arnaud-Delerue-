import { contact } from "@/data/contact";
import { show } from "@/data/show";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  { label: "Durée", value: show.tech.duree },
  { label: "Format", value: show.tech.format },
  { label: "Lieux", value: "Théâtres, hôtels, restaurants, lieux privés" },
  { label: "Booking", value: contact.email },
];

export function ReassuranceStrip() {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {item.label}
            </p>
            <p className="text-sm text-neutral-200 sm:text-base">{item.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

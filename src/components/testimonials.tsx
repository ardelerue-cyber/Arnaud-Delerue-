import { testimonials } from "@/data/testimonials";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const kindLabel = {
  presse: "Presse",
  public: "Public",
} as const;

export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((item) => (
        <Card
          key={`${item.author}-${item.source}`}
          className="relative border-white/10 bg-white/5"
        >
          <CardContent className="flex h-full flex-col gap-4">
            <div className="text-4xl leading-none text-white/40">“</div>
            <p className="text-sm text-neutral-200">{item.quote}</p>
            <div className="mt-auto flex items-center justify-between gap-3 text-xs text-neutral-400">
              <div>
                <div className="text-sm text-neutral-200">{item.author}</div>
                <div>{item.source}</div>
              </div>
              <Badge variant={item.kind === "presse" ? "default" : "secondary"}>
                {kindLabel[item.kind]}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

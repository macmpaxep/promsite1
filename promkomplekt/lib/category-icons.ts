import {
  CircleDot, Settings, Waves, Zap, Droplet, Disc, Link2,
  RectangleHorizontal, Wind, Filter as FilterIcon, Wrench, type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  bearings: CircleDot,
  gearboxes: Settings,
  hydraulics: Waves,
  electrical: Zap,
  pumps: Droplet,
  seals: Disc,
  couplings: Link2,
  belts: RectangleHorizontal,
  pneumatics: Wind,
  filters: FilterIcon,
};

export function getCategoryIcon(category: string): LucideIcon {
  return categoryIcons[category] ?? Wrench;
}

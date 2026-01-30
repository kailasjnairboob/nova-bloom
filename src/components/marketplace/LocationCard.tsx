import { motion } from "framer-motion";
import { MapPin, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Location {
  id: number;
  name: string;
  location: string;
  type: "Solar" | "Wind" | "Hybrid";
  image: string;
  capacity: string;
  capacityKw: number;
  annualGeneration: string;
  maxUserCapacity: string;
  score: number;
  description: string;
}

interface LocationCardProps {
  location: Location;
  onPlanInstallation: (location: Location) => void;
  index: number;
}

const typeBadgeClass = {
  Solar: "badge-solar",
  Wind: "badge-wind",
  Hybrid: "badge-hybrid",
};

export const LocationCard = ({ location, onPlanInstallation, index }: LocationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <div className="glass-card overflow-hidden hover:border-primary/50 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 rating-badge">
            <span className="font-mono font-bold">{location.score}/5</span>
          </div>
          
          {/* Type Badge */}
          <div className="absolute bottom-4 left-4">
            <span className={typeBadgeClass[location.type]}>{location.type}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Location */}
          <h3 className="font-heading text-2xl font-bold text-foreground mb-1 tracking-wide">
            {location.name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
            <MapPin className="w-4 h-4" />
            {location.location}
          </div>

          {/* Stats Grid */}
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Capacity Available</span>
              <span className="font-mono font-semibold text-accent">
                {location.capacity} <span className="text-muted-foreground text-xs">kW</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Annual Generation</span>
              <span className="font-mono font-semibold text-primary">
                {location.annualGeneration} <span className="text-muted-foreground text-xs">Units/kW</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Max User Capacity</span>
              <span className="font-mono font-semibold text-foreground">
                {location.maxUserCapacity} <span className="text-muted-foreground text-xs">kW</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
            {location.description}
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => onPlanInstallation(location)}
            className="w-full btn-orange rounded-lg flex items-center justify-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            PLAN INSTALLATION
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

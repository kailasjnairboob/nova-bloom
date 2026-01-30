import { useState } from "react";
import { motion } from "framer-motion";
import { LocationCard, Location } from "@/components/marketplace/LocationCard";
import { InstallationModal } from "@/components/marketplace/InstallationModal";

// Location images - using placeholder images for demo
const locations: Location[] = [
  {
    id: 1,
    name: "Rajasthan Solar Park",
    location: "Jodhpur, Rajasthan",
    type: "Solar",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    capacity: "500",
    capacityKw: 500,
    annualGeneration: "1500",
    maxUserCapacity: "25",
    score: 4.9,
    description: "Desert solar installation with optimal sun exposure",
  },
  {
    id: 2,
    name: "Tamil Nadu Wind Farm",
    location: "Tirunelveli, Tamil Nadu",
    type: "Wind",
    image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&h=400&fit=crop",
    capacity: "750",
    capacityKw: 750,
    annualGeneration: "2200",
    maxUserCapacity: "15",
    score: 4.8,
    description: "Coastal wind farm with consistent wind patterns",
  },
  {
    id: 3,
    name: "Gujarat Hybrid Station",
    location: "Kutch, Gujarat",
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=400&fit=crop",
    capacity: "600",
    capacityKw: 600,
    annualGeneration: "2000",
    maxUserCapacity: "20",
    score: 4.9,
    description: "Combined solar and wind for 24/7 generation",
  },
  {
    id: 4,
    name: "Karnataka Solar Array",
    location: "Pavagada, Karnataka",
    type: "Solar",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=600&h=400&fit=crop",
    capacity: "550",
    capacityKw: 550,
    annualGeneration: "1450",
    maxUserCapacity: "25",
    score: 4.8,
    description: "High altitude solar park with excellent irradiance",
  },
  {
    id: 5,
    name: "Andhra Pradesh Wind",
    location: "Anantapur, Andhra Pradesh",
    type: "Wind",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&h=400&fit=crop",
    capacity: "400",
    capacityKw: 400,
    annualGeneration: "1800",
    maxUserCapacity: "15",
    score: 4.7,
    description: "Plateau wind farm with steady monsoon winds",
  },
  {
    id: 6,
    name: "Maharashtra Hybrid",
    location: "Dhule, Maharashtra",
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop",
    capacity: "450",
    capacityKw: 450,
    annualGeneration: "1900",
    maxUserCapacity: "20",
    score: 4.8,
    description: "Integrated solar-wind system with battery storage",
  },
];

export const MarketplaceSection = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanInstallation = (location: Location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-dark" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container relative z-10 px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wider">
            MARKETPLACE
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Choose your location and start generating clean energy
          </p>
        </motion.div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              onPlanInstallation={handlePlanInstallation}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Installation Modal */}
      <InstallationModal
        location={selectedLocation}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

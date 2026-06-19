import { Accordion } from "../../../components/ui/Accordion";
import type { GuidebookResponse } from "../../../shared/dtos/guidebook.dto";

type Restaurant = GuidebookResponse["restaurants"][number];

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  return (
    <Accordion title="Restaurantes Próximos">
      <div className="space-y-4">
        {restaurants.map((restaurant, index) => (
          <div
            key={index}
            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <p className="font-semibold text-seazone-navy text-sm">
              {restaurant.name}
            </p>
            <p className="text-xs text-seazone-coral mt-0.5 font-medium">
              {restaurant.cuisine}
            </p>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
              {restaurant.description}
            </p>
          </div>
        ))}
      </div>
    </Accordion>
  );
}

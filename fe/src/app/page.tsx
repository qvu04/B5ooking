import PlanBanner from "./components/Home/PlanBanner";
import PopularLocation from "./components/Home/PopularLocation";
import TravelDealCard from "./components/Home/TravelDealCard";

export default function Home() {
  return (
    <div className="p-6">
      <TravelDealCard />
      <PopularLocation />
      <PlanBanner />
    </div>
  );
}

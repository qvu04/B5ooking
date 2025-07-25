import PlanBanner from "./components/Home/PlanBanner";
import PopularBlog from "./components/Home/PopularBlog";
import PopularHotel from "./components/Home/PopularHotel";
import PopularLocation from "./components/Home/PopularLocation";
import PopularTravel from "./components/Home/PopularTravel";
import TravelDealCard from "./components/Home/TravelDealCard";

export default function Home() {
  return (
    <div className="p-6">
      <PopularLocation />
      <PopularHotel />
      <PopularTravel />
      <TravelDealCard />
      <PopularBlog />
      <PlanBanner />
    </div>
  );
}

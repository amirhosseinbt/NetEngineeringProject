//components
import Header from "@/components/Header";
import Tab from "@/components/Tabs";
import TabContent from "@/components/TabsContenet";
import ModuleLinks from "@/components/shared/ModuleLinks";
import HomeStats from "@/components/home/HomeStats";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <HomeStats />
      <ModuleLinks />
      <Tab />
      <TabContent />
    </div>
  );
}

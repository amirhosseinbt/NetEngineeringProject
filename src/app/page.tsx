//components
import Header from "@/components/Header";
import Tab from "@/components/Tabs";
import TabContent from "@/components/TabsContenet";
import ModuleLinks from "@/components/shared/ModuleLinks";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <ModuleLinks />
      {/* <Tab /> */}
      {/* <TabContent /> */}
    </div>
  );
}

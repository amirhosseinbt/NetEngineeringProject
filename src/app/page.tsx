//components
import Header from "@/components/Header";
import Tab from "@/components/Tabs";
import TabContent from "@/components/TabsContenet";
import UserHomeHero from "@/components/home/UserHomeHero";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="page-shell">
        <UserHomeHero />
        <div className="content-shell mt-4">
          <Tab />
          <TabContent />
        </div>
      </div>
    </div>
  );
}

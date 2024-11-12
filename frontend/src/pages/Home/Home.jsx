import Features from "../../components/Features";
import FrequentQuestion from "../../components/FrequentQuestion";
import Hero from "../../components/Hero";

function Home() {
  return (
    <>
      {/* 
    <div className="p-4 md:p-14">
        <div className="container mx-auto">

        </div>
    </div>
     */}
      <Hero />
      <Features/>
      <FrequentQuestion/>
    </>
  );
}

export default Home;

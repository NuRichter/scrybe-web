import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Forge from "@/components/Forge";
import Terminal from "@/components/Terminal";
import Pipeline from "@/components/Pipeline";
import Spec from "@/components/Spec";
import Tuning from "@/components/Tuning";
import FieldNotes from "@/components/FieldNotes";
import Deploy from "@/components/Deploy";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="grain relative min-h-screen">
      <Background />
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Forge />
        <Terminal />
        <Pipeline />
        <Spec />
        <Tuning />
        <FieldNotes />
        <Deploy />
        <Footer />
      </div>
    </main>
  );
}

import { Header } from "@/components/layout/Header";
import { HomeHero } from '@/features/homepage/HomeHero';
import { WhatIBuild } from '@/features/homepage/WhatIBuild';
import { SelectedSystems  } from '@/features/homepage/SelectedSystems';
import { AboutSection } from "@/features/homepage/AboutSection";
import { SkillsSection } from "@/features/homepage/SkillsSection";

import { Footer  } from '@/features/homepage/Footer';


export default function HomePage() {
  return (
    <main>
      <Header />
      <HomeHero/>
      {/* <WhatIBuild/> */}
      <AboutSection />
      <SelectedSystems/>
      <SkillsSection />
      <Footer/>
    </main>
  )
}

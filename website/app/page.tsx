import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import SustainableBanner from "@/components/home/SustainableBanner";
import Testimonials from "@/components/home/Testimonials";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FadeIn from "@/components/ui/FadeIn";

export default function HomePage() {
  return (
    <div>
      <FadeIn delay={0}>
        <HeroBanner />
      </FadeIn>
      <FadeIn delay={0.1}>
        <CategoryGrid />
      </FadeIn>
      <FadeIn delay={0.1}>
        <BestSellers />
      </FadeIn>
      <FadeIn delay={0.1}>
        <FeaturedProducts />
      </FadeIn>
      <FadeIn delay={0.1}>
        <SustainableBanner />
      </FadeIn>
      <FadeIn delay={0.1}>
        <Testimonials />
      </FadeIn>
    </div>
  );
}

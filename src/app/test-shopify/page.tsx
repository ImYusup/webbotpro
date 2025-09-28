import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CTASection } from "@/components/cta-section";
import { shopifyFetch } from "@/lib/shopify";

const query = `
{
  products(first: 3) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
}
`;
export default async function HomePage() {
    const data = await shopifyFetch(query);

    return (
        <div className="min-h-screen">
            <main>
                <HeroSection />
                <ServicesSection />
                <WhyChooseSection />
                <TestimonialsSection />
                <CTASection />

                {/* Debug Shopify */}
                <section className="p-10">
                    <h2 className="text-xl font-bold mb-4">Produk dari Shopify</h2>
                    <ul className="space-y-4">
                        {data.products.edges.map(({ node }: any) => (
                            <li key={node.id} className="p-4 border rounded-lg shadow">
                                <h3 className="font-semibold text-lg">{node.title}</h3>
                                <a
                                    href={`/products/${node.handle}`}
                                    className="text-blue-500 hover:underline"
                                >
                                    Lihat produk →
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

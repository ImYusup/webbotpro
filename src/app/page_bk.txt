// src/app/page.tsx
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { shopifyFetch } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";

// Define the GraphQL response type
interface Product {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

interface ShopifyData {
  products: {
    edges: {
      node: Product;
    }[];
  };
}

const query = `
  {
    products(first: 4) {
      edges {
        node {
          id
          title
          handle
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default async function HomePage() {
  const data = await shopifyFetch<ShopifyData>(query);
  const products = data?.products?.edges.map((edge) => edge.node) || [];

  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <ServicesSection />
        {/* Mini Products Section (di bawah Testimonials) */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
            {products.length === 0 ? (
              <p className="text-center text-gray-500">No products available or server error.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((prod) => {
                  const image = prod.images.edges[0]?.node;
                  const price = prod.variants.edges[0]?.node.price;
                  return (
                    <div
                      key={prod.id}
                      className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
                    >
                      {image?.url ? (
                        <Image
                          src={image.url}
                          alt={image.altText || prod.title}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="p-3">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{prod.title}</h3>
                        <p className="text-md font-bold text-green-600 mb-2">
                          {price ? `${price.amount} ${price.currencyCode}` : "Price not available"}
                        </p>
                        <Link
                          href={`/products/${prod.handle}`}
                          className="text-blue-500 text-xs hover:underline"
                        >
                          View Product →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
        <WhyChooseSection />
        <TestimonialsSection />
      </main>
    </div>
  );
}
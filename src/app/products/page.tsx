import { shopifyFetch } from "@/lib/shopify";
import Image from "next/image";

// Define Shopify Products Response Interface
interface ProductEdge {
  node: {
    id: string;
    title: string;
    handle: string;
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      }>;
    };
  };
}

interface ShopifyProductsResponse {
  products: {
    edges: ProductEdge[];
  };
}

const query = `
  {
    products(first: 12) {
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
                id
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

export default async function ProductsPage() {
  try {
    const data = await shopifyFetch<ShopifyProductsResponse>(query);
    if (!data || !data.products) {
      throw new Error("Failed to fetch products from Shopify");
    }
    const products = data.products.edges.map((edge: ProductEdge) => edge.node);

    return (
      <div className="min-h-screen py-10">
        <main className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((prod) => {
                const image = prod.images.edges[0]?.node;
                const price = prod.variants.edges[0]?.node.price;
                const variantId = prod.variants.edges[0]?.node.id;

                if (!variantId) {
                  console.warn(`No variant ID for product: ${prod.title}`);
                }

                return (
                  <div
                    key={prod.id}
                    className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-white"
                  >
                    {image?.url ? (
                      <Image
                        src={image.url}
                        alt={image.altText || prod.title}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="p-4">
                      <h2 className="font-semibold text-lg mb-2 line-clamp-2">{prod.title}</h2>
                      <p className="text-xl font-bold text-green-600 mb-4">
                        {price ? `${price.amount} ${price.currencyCode}` : "Price not available"}
                      </p>
                      {variantId ? (
                        <a
                          href={`/products/${prod.handle}`} // Ngarah ke dynamic route
                          className="w-full block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                        >
                          View Product
                        </a>
                      ) : (
                        <p className="text-center text-red-500">Unable to view - No variant available</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {products.length > 0 && (
            <div className="mt-8 text-center">
              <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">Load More</button>
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading products page:", error);
    return (
      <div className="min-h-screen py-10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Error 404 - Page Not Found</h1>
          <p className="text-gray-600 mb-4">Something went wrong while loading the products.</p>
          <a href="/" className="text-blue-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    );
  }
}
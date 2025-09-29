// src/lib/shopify.ts
export async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}) {
  const response = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
      },
      body: JSON.stringify({ query, variables }),
    }
  );

  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL Error:", result.errors);
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data as T;
}

export async function getProductData(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
        media(first: 10) {
          edges {
            node {
              __typename
              ... on MediaImage {
                id
                image {
                  url
                  altText
                  width
                  height
                }
              }
              ... on Video {
                id
                sources {
                  url
                  mimeType
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: any }>(query, { handle });
  return data?.productByHandle || null;
}

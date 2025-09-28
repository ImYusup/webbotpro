import { shopifyFetch } from "./shopify";

export async function getProductData(handle: string) {
  const query = `
    query getProduct($handle: String!) {
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
              __typename
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ productByHandle: any }>(
    JSON.stringify({
      query,
      variables: { handle },
    })
  );

  return data?.productByHandle || null;
}


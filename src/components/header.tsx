// src/components/header.ts
"use client";

import { Menu, X, Bot } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API route
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        const items = data.products.edges.map((edge: any) => edge.node);
        setProducts(items);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  const navLinkClass = "text-foreground font-bold text-lg hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary" />
          <span className="font-bold text-2xl">WebBotPro</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#services" className={navLinkClass}>
            Services
          </Link>
          <Link href="/products" className={navLinkClass}>
            Products
          </Link>
          <Link href="/#why-choose" className={navLinkClass}>
            Why Choose Us
          </Link>
          <Link href="/#testimonials" className={navLinkClass}>
            Testimonials
          </Link>
          <Link href="/#contact" className={navLinkClass}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/#services"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <div>
              <Link
                href="/products"
                className={navLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <div className="pl-4 mt-2 space-y-2">
                {error ? (
                  <p className="text-red-500 text-base">Failed to load products</p>
                ) : products.length === 0 ? (
                  <p className="text-gray-500 text-base">Loading...</p>
                ) : (
                  products.map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/products/${prod.handle}`}
                      className="block px-2 py-1 hover:bg-gray-100 rounded text-base flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {prod.images.edges[0]?.node?.url && (
                        <img
                          src={prod.images.edges[0].node.url}
                          alt={prod.images.edges[0].node.altText || prod.title}
                          className="w-8 h-8 object-cover rounded mr-2"
                        />
                      )}
                      <div>
                        <p>{prod.title}</p>
                        <p className="text-sm font-bold">
                          {prod.variants.edges[0]?.node.price.amount} {prod.variants.edges[0]?.node.price.currencyCode}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
            <Link
              href="/#why-choose"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Why Choose Us
            </Link>
            <Link
              href="/#testimonials"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/#contact"
              className={navLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
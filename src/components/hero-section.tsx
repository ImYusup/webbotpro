// src/components/hero-section.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, PlayCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const images = [
  "/assets/webbotpro.com-1.png",
  "/assets/webbotpro.com-2.png",
  "/assets/webbotpro.com-3.png",
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-16 bg-gradient-to-br from-teal-700 via-teal-600 to-emerald-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Ready to Automate and Grow Your Business?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-8"
            >
              We help agencies and businesses streamline operations, boost efficiency, and scale faster with
              powerful automation, smart digital marketing systems, and actionable business intelligence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://wa.me/6285975149508?text=Hello%20WebBotPro%2C%20I%27m%20interested%20in%20seeing%20how%20your%20automation%20and%20digital%20marketing%20solutions%20can%20help%20grow%20my%20business.%20Could%20you%20arrange%20a%20demo%20to%20explain%20further%3F%20Thank%20you!"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="text-base px-8 py-6 bg-white text-teal-700 hover:bg-gray-100">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Book a Free Demo
                </Button>
              </a>

              <a
                href="/services"   // Ganti dengan link yang kamu mau
                className="no-underline"
              >
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-white text-teal-700 hover:bg-gray-100"
                >
                  Learn More
                </Button>
              </a>
            </motion.div>

            {/* TRUST BADGES */}
            <div className="flex flex-wrap gap-6 mt-10 text-sm text-white/80">
              <div>✔ Expert Automation</div>
              <div>✔ Proven Digital Marketing</div>
              <div>✔ Business Intelligence</div>
            </div>
          </div>

          {/* RIGHT SLIDER */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-[420px] md:h-[480px]"
                >
                  <Image
                    src={images[current]}
                    alt="WebBotPro Dashboard"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-4 gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all ${idx === current ? "w-8 bg-white" : "w-2.5 bg-white/40"}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
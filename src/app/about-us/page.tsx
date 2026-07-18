// src/app/about-us/page.tsx
"use client";

import React from "react";
import { Bot, Award } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-black mb-4">
            About WebBotPro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering businesses with smart automation and digital solutions from Bandung, Indonesia.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-10">
           <div className="md:w-1/3">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-12 w-12 text-primary" />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                WebBotPro is a Bandung-based technology company specializing in WhatsApp automation,
                e-commerce solutions, and digital marketing. We help businesses streamline operations
                and grow faster with smart technology.
              </p>
            </div>
          </div>

          {/* Legal PT Section */}
          <div className="mt-12 border-t pt-10">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Award className="text-amber-600" /> Legal Company Information
            </h3>

            <div className="bg-gray-50 p-8 rounded-2xl text-center">
              <p className="text-gray-600 mb-6">
                WebBotPro is a legally registered company in Indonesia.
              </p>

              <div className="max-w-md mx-auto">
                <img
                  src="/assets/legal-pt.png"
                  alt="Legal Document - PT WebBotPro"
                  className="w-full rounded-2xl shadow-lg border border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-3">Official Company Document</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
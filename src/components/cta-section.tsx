import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Automate and Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 font-serif leading-relaxed">
            Join hundreds of businesses that have transformed their operations with our automation, digital marketing,
            and business intelligence solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/6285975149508?text=Hello%20WebBotPro%2C%20I%20would%20like%20to%20know%20more%20about%20your%20automation%2C%20digital%20marketing%2C%20and%20business%20intelligence%20solutions.%20Could%20you%20share%20more%20details%3F%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Contact Us for a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a
              href="https://wa.me/6285975149508?text=Hello%20WebBotPro%2C%20I'm%20interested%20in%20seeing%20how%20your%20automation%20and%20digital%20marketing%20solutions%20can%20help%20grow%20my%20business.%20Could%20you%20arrange%20a%20demo%20to%20explain%20further%3F%20Thank%20you!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline font-medium"
            >
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                WhatsApp Us
              </Button>
            </a>
          </div>
          <p className="text-sm mt-6 opacity-75">Free consultation • Custom solutions • Proven results</p>
        </div>
      </div>
    </section>
  );
}
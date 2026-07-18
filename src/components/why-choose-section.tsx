// src/components/why-choose-section.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Award, DollarSign, Puzzle } from "lucide-react"

const reasons = [
  {
    icon: Zap,
    title: "Scalable Solutions",
    description: "Our solutions grow with your business, from startup to enterprise level.",
  },
  {
    icon: Award,
    title: "Proven Expertise",
    description: "Years of experience delivering successful digital transformation projects.",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective",
    description: "Maximize ROI with efficient automation that reduces operational costs.",
  },
  {
    icon: Puzzle,
    title: "Seamless Integration",
    description: "Works perfectly with your existing systems and business processes.",
  },
]

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="py-8 lg:py-12 bg-white">   {/* ← Sudah dikurangi */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose
            <span className="text-primary block">WebBotPro?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-serif">
            We deliver results that matter to your business growth and success
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="text-center border-0 shadow-lg hover:shadow-xl transition-all h-full"
            >
              <CardHeader className="pb-4">
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                  <reason.icon className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base font-serif leading-relaxed">
                  {reason.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
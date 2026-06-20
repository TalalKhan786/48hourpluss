"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageCircle, Clock, AlertTriangle, Info } from "lucide-react"

export function UsageInstructions() {
  const timeline = [
    {
      time: "Immediate",
      effect: "Enhanced energy and vitality",
      description: "Feel the natural boost within minutes of consumption",
    },
    {
      time: "2-4 Hours",
      effect: "Peak effectiveness period",
      description: "Maximum benefits and optimal performance",
    },
    {
      time: "48 Hours",
      effect: "Extended benefits continue",
      description: "Long-lasting effects for sustained wellness",
    },
  ]

  const safetyWarnings = [
    "Accelerates blood flow - may cause temporary skin redness",
    "Adult use only (18+ years)",
    "Consult healthcare provider if on medications",
    "Do not exceed recommended dosage",
    "Not suitable for individuals with heart conditions",
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Usage <span className="text-yellow-400">Instructions</span> & Safety
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow these guidelines for optimal results and safe consumption
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Dosage Guidelines */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Dosage Guidelines</h3>

            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="bg-yellow-500 text-black rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">Maximum 1 Sachet Daily</h4>
                  <p className="text-gray-300">
                    Take one 16g sachet per day, preferably on an empty stomach for better absorption
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Timeline */}
            <h4 className="text-xl font-bold text-white mb-4">Benefits Timeline</h4>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-600 p-2 rounded-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h5 className="font-bold text-green-400">{item.time}</h5>
                        <p className="text-white font-medium">{item.effect}</p>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Safety Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Safety Information</h3>

            <Alert className="bg-red-900 border-red-700 mb-6">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                <strong>Important:</strong> Please read all safety warnings before use
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              {safetyWarnings.map((warning, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300 text-sm">{warning}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert className="bg-blue-900 border-blue-700 mt-6">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                <strong>Storage:</strong> Keep in a cool, dry place away from direct sunlight. Refrigeration not
                required but recommended in hot climates.
              </AlertDescription>
            </Alert>
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
            onClick={() => {
              window.open(
                "https://wa.me/923194405935?text=I need dosage guidance for 48hoursplus Herbal Honey",
                "_blank",
              )
            }}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Get Dosage Guidance
          </Button>
        </div>
      </div>
    </section>
  )
}

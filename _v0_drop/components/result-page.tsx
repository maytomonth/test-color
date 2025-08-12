"use client"

import { useState } from "react"
import { Share2, RotateCcw, Copy, Check, Crown, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Toast } from "@/components/toast"
import type { ColorType } from "@/lib/types"
import { translations } from "@/lib/translations"

interface ResultPageProps {
  result: ColorType & { percentages: Record<string, number> }
  colorTypes: ColorType[]
  onRetry: () => void
  locale: string
}

export function ResultPage({ result, colorTypes, onRetry, locale }: ResultPageProps) {
  const t = translations[locale] || translations.en
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  const secondBestType = colorTypes
    .filter((type) => type.id !== result.id)
    .sort((a, b) => (result.percentages[b.id] || 0) - (result.percentages[a.id] || 0))[0]

  const copyColor = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(color)
      setToastMessage(`${t.colorCopied}: ${color}`)
      setShowToast(true)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error("Failed to copy color:", err)
    }
  }

  const getContrastColor = (bgColor: string) => {
    const hex = bgColor.replace("#", "")
    const r = Number.parseInt(hex.substr(0, 2), 16)
    const g = Number.parseInt(hex.substr(2, 2), 16)
    const b = Number.parseInt(hex.substr(4, 2), 16)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? "#000000" : "#FFFFFF"
  }

  return (
    <main className="flex-1 py-8">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        {/* Hero Header */}
        <Card
          className="rounded-xl shadow-lg border-0 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${result.palette[0]}, ${result.palette[1]})`,
          }}
        >
          <div className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-white/70 dark:bg-neutral-light text-gray-800 font-medium shadow-sm mb-6">
              {Math.round(result.percentages[result.id] || 0)}% {t.match}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {result.name[locale] || result.name.en}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              {result.description[locale] || result.description.en}
            </p>
          </div>
        </Card>

        {/* Top 2 Color Types */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Your Color Palette - #1 */}
          <Card className="rounded-xl bg-white dark:bg-neutral-dark shadow-md p-6 border-0 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                <Crown className="w-3 h-3" />
                #1
              </div>
            </div>
            <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{t.yourColorPalette}</h2>
            <div className="grid grid-cols-4 gap-3">
              {result.palette.map((color, index) => (
                <button
                  key={index}
                  onClick={() => copyColor(color)}
                  className="group relative aspect-square rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary/50"
                  style={{ backgroundColor: color }}
                  aria-label={`Copy color ${color}`}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    {copiedColor === color ? (
                      <Check className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <Copy className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div
                    className="absolute bottom-1 left-1 right-1 text-xs font-mono px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: "white",
                      fontSize: "10px",
                    }}
                  >
                    {color}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Second Best Type - #2 */}
          {secondBestType && (
            <Card className="rounded-xl bg-white dark:bg-neutral-dark shadow-md p-6 border-0 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                  <Award className="w-3 h-3" />
                  #2
                </div>
              </div>
              <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{t.secondBestType}</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex gap-1">
                  {secondBestType.palette.slice(0, 4).map((color, index) => (
                    <button
                      key={index}
                      onClick={() => copyColor(color)}
                      className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-600 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      style={{ backgroundColor: color }}
                      aria-label={`Copy color ${color}`}
                    />
                  ))}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {secondBestType.name[locale] || secondBestType.name.en}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(result.percentages[secondBestType.id] || 0)}% {t.match}
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Detailed Analysis */}
        <Card className="rounded-xl bg-white dark:bg-neutral-dark shadow-md p-6 border-0">
          <h2 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">{t.detailedAnalysis}</h2>
          <div className="space-y-4">
            {colorTypes
              .sort((a, b) => (result.percentages[b.id] || 0) - (result.percentages[a.id] || 0))
              .map((type) => (
                <div key={type.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                      style={{ backgroundColor: type.palette[0] }}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {type.name[locale] || type.name.en}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-1 max-w-xs">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${result.percentages[type.id] || 0}%`,
                          backgroundColor: type.palette[0],
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[3rem] text-right">
                      {Math.round(result.percentages[type.id] || 0)}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRetry}
            className="bg-secondary text-white hover:bg-blue-500 rounded-full px-6 py-3 font-medium shadow-sm transition-all"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t.retakeTest}
          </Button>
          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: t.shareTitle,
                  text: `${t.myColorType}: ${result.name[locale] || result.name.en}`,
                  url: window.location.href,
                })
              }
            }}
            className="bg-accent text-white hover:bg-red-500 rounded-full px-6 py-3 font-medium shadow-sm transition-all"
          >
            <Share2 className="w-4 h-4 mr-2" />
            {t.shareResult}
          </Button>
        </div>
      </div>
      {/* Toast */}
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
    </main>
  )
}

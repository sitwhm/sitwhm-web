"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8"
        >
          <a
            href="#registration"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-syntax-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-syntax-blue/25 transition-all hover:bg-[#052885] hover:shadow-xl hover:shadow-syntax-blue/30 active:scale-95"
          >
            Save Your Free Spot
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

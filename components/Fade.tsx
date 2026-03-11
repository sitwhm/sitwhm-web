"use client"

import { motion, type HTMLMotionProps } from "motion/react"
import { forwardRef, type ReactNode } from "react"

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

interface FadeProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  delay?: number
  duration?: number
}

export const FadeDiv = forwardRef<HTMLDivElement, FadeProps>(
  ({ children, delay = 0, duration = 0.4, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration, delay }}
        variants={fadeInVariant}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

FadeDiv.displayName = "FadeDiv"

export const FadeSpan = forwardRef<HTMLSpanElement, FadeProps>(
  ({ children, delay = 0, duration = 0.4, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration, delay }}
        variants={fadeInVariant}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)

FadeSpan.displayName = "FadeSpan"

interface FadeContainerProps extends HTMLMotionProps<"section"> {
  children: ReactNode
  staggerChildren?: number
}

export const FadeContainer = forwardRef<HTMLElement, FadeContainerProps>(
  ({ children, staggerChildren = 0.1, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren }}
        {...props}
      >
        {children}
      </motion.section>
    )
  }
)

FadeContainer.displayName = "FadeContainer"

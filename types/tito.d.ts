import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tito-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          event: string
          'discount-code'?: string
          releases?: string
          prefill?: string
          'save-metadata-parameters'?: string
        },
        HTMLElement
      >
      'tito-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          event: string
          'discount-code'?: string
          releases?: string
        },
        HTMLElement
      >
    }
  }
}

declare global {
  interface Window {
    tito: ((...args: unknown[]) => void) & { q?: unknown[][] }
  }
}

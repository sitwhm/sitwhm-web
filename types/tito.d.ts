import 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'tito-widget': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { event: string },
        HTMLElement
      >
    }
  }
}

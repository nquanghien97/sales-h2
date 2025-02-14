interface WomenIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

function WomenIcon({ width = 24, height = 24, title, ...rest }: WomenIconProps) {
  return (
    <svg {...rest} width={width} fill="none" height={height} focusable="false" aria-hidden="true" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {title && (
        <title>{title}</title>
      )}
      <path d="M13.94 8.31C13.62 7.52 12.85 7 12 7s-1.62.52-1.94 1.31L7 16h3v6h4v-6h3z"></path>
      <circle cx="12" cy="4" r="2"></circle>
    </svg>
  )
}

export default WomenIcon
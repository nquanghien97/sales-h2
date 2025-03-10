interface MenuIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string
}

function MenuIcon({ width = 24, height = 24, title, ...rest }: MenuIconProps) {
  return (
    <svg {...rest} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {title && <title>{title}</title>}
      <line x1="4" x2="20" y1="12" y2="12"></line>
      <line x1="4" x2="20" y1="6" y2="6"></line>
      <line x1="4" x2="20" y1="18" y2="18"></line>
    </svg>
  )
}

export default MenuIcon
interface ListIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string
}

function ListIcon({ width = 24, height = 24, title, ...rest }: ListIconProps) {
  return (
    <svg {...rest} xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {title && <title>{title}</title>}
      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
      <path d="M7 8h10"></path><path d="M7 12h10"></path>
      <path d="M7 16h10"></path>
    </svg>
  )
}

export default ListIcon
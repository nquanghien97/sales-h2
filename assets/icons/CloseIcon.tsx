interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

function CloseIcon({ width = 24, height = 24, title, ...rest } : CloseIconProps) {
  return (
    <svg {...rest} width={width} height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <title>{title}</title>
      <path d="M18 6 6 18"></path>
      <path d="m6 6 12 12"></path>
    </svg>
  )
}

export default CloseIcon
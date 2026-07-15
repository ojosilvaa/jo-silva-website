export default function Logo({ size = 36, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="5"/>
      <circle cx="50" cy="50" r="31" stroke={color} strokeWidth="3.5"/>
      <line x1="50" y1="22" x2="50" y2="62" stroke={color} strokeWidth="6" strokeLinecap="round"/>
      <path d="M50 62 Q50 80 34 80 Q26 80 26 72" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

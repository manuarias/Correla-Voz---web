interface IconProps {
  name: 'instagram' | 'youtube' | 'spotify';
  className?: string;
  size?: number;
  strokeWidth?: number;
}

interface IconSvgProps {
  size: number;
  strokeWidth: number;
  className?: string;
}

function InstagramIcon({ size, strokeWidth, className }: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size, strokeWidth, className }: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function SpotifyIcon({ size, strokeWidth, className }: IconSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
      <path d="M8 11.5c2.5 0 4.5 2 4.5 4.5M9 10c3 0 5.5 2.5 5.5 5.5M10 8.5c3.5 0 6.5 3 6.5 6.5" />
    </svg>
  );
}

export function Icon({ name, className = '', size = 24, strokeWidth = 2 }: IconProps) {
  const iconProps = { size, strokeWidth, className };

  return (
    <span className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      {name === 'instagram' && <InstagramIcon {...iconProps} />}
      {name === 'youtube' && <YoutubeIcon {...iconProps} />}
      {name === 'spotify' && <SpotifyIcon {...iconProps} />}
    </span>
  );
}

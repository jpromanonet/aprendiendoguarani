type Props = {
  src: string
  label?: string
}

export function AudioBlock({ src, label = 'Escuchar pronunciación de la clase' }: Props) {
  return (
    <div className="audio-block">
      <div className="audio-label">
        <span className="audio-dot" aria-hidden="true" />
        {label}
      </div>
      <audio controls preload="none" src={src}>
        Tu navegador no soporta audio.
      </audio>
    </div>
  )
}

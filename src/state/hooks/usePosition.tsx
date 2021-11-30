import { useEffect, useState } from 'react'
export const usePosition = () => {
  const [position, setPosition] = useState<Pick<GeolocationCoordinates, 'latitude' | 'longitude'>>()
  const [error, setError] = useState<string>()

  const onChange: PositionCallback = ({ coords: { latitude, longitude } }) => {
    setPosition({
      latitude,
      longitude,
    })
  }

  const onError: PositionErrorCallback = (error) => {
    setError(error.message)
  }

  useEffect(() => {
    const geo = navigator.geolocation
    if (!geo) {
      setError('Geolocation is not supported')
      return
    }
    // watchPosition
    const watcher = geo.getCurrentPosition(onChange, onError, {
      enableHighAccuracy: true,
      maximumAge: 10000,
    })

    // return () => geo.clearWatch(watcher);
  }, [])

  return { position, error }
}

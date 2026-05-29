export const useSpiralState = () => {
  const spiralRotation = useState<number>('spiralRotation', () => 0)

  return {
    spiralRotation
  }
}


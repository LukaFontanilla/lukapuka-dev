export const useSpiralState = () => {
  const spiralRotation = useState<number>('spiralRotation', () => 0)
  const activeSpecimenIndex = useState<number>('activeSpecimenIndex', () => 0)

  return {
    spiralRotation,
    activeSpecimenIndex
  }
}

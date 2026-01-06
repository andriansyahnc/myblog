'use client'

export const useHapticFeedback = () => {
  const triggerHaptic = (pattern: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!('vibrate' in navigator)) {
      return
    }

    const patterns: Record<'light' | 'medium' | 'heavy', number | number[]> = {
      light: 25,
      medium: 50,
      heavy: [50, 50, 50],
    }

    try {
      navigator.vibrate(patterns[pattern] as number | number[])
    } catch (e) {
      console.debug('Haptic feedback not available')
    }
  }

  return { triggerHaptic }
}

// Standalone function
export const hapticFeedback = (pattern: 'light' | 'medium' | 'heavy' = 'medium') => {
  if (!('vibrate' in navigator)) {
    return
  }

  const patterns: Record<'light' | 'medium' | 'heavy', number | number[]> = {
    light: 25,
    medium: 50,
    heavy: [50, 50, 50],
  }

  try {
    navigator.vibrate(patterns[pattern] as number | number[])
  } catch (e) {
    console.debug('Haptic feedback not available')
  }
}

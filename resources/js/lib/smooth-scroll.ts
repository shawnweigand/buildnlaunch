/**
 * Smooth scroll utility for navigating to anchor sections
 */

export interface SmoothScrollOptions {
  /** Offset from the top of the target element (in pixels) */
  offset?: number
  /** Duration of the scroll animation (in milliseconds) */
  duration?: number
  /** Easing function for the animation */
  easing?: (t: number) => number
}

const defaultOptions: Required<SmoothScrollOptions> = {
  offset: 80, // Account for fixed header
  duration: 800,
  easing: (t: number) => t * (2 - t), // ease-out
}

/**
 * Smooth scroll to an element by ID
 */
export function smoothScrollToElement(
  elementId: string,
  options: SmoothScrollOptions = {}
): void {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`)
    return
  }

  smoothScrollToElementDirect(element, options)
}

/**
 * Smooth scroll to a specific element
 */
export function smoothScrollToElementDirect(
  element: HTMLElement,
  options: SmoothScrollOptions = {}
): void {
  const { offset, duration, easing } = { ...defaultOptions, ...options }

  const startPosition = window.pageYOffset
  const targetPosition = element.offsetTop - offset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    const easedProgress = easing(progress)
    const currentPosition = startPosition + distance * easedProgress

    window.scrollTo(0, currentPosition)

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Smooth scroll to the top of the page
 */
export function smoothScrollToTop(options: SmoothScrollOptions = {}): void {
  const { duration, easing } = { ...defaultOptions, ...options }

  const startPosition = window.pageYOffset
  const distance = -startPosition
  let startTime: number | null = null

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    const easedProgress = easing(progress)
    const currentPosition = startPosition + distance * easedProgress

    window.scrollTo(0, currentPosition)

    if (progress < 1) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Check if an element is in the viewport
 */
export function isElementInViewport(element: HTMLElement, threshold = 0.1): boolean {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  const windowWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    rect.top >= -windowHeight * threshold &&
    rect.left >= -windowWidth * threshold &&
    rect.bottom <= windowHeight * (1 + threshold) &&
    rect.right <= windowWidth * (1 + threshold)
  )
}

/**
 * Get all visible sections on the page
 */
export function getVisibleSections(): HTMLElement[] {
  const sections = document.querySelectorAll('section[id]') as NodeListOf<HTMLElement>
  return Array.from(sections).filter(section => isElementInViewport(section))
}

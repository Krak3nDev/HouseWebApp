import {RefObject, useEffect} from "react"

export const useBlockSwipe = (touchRef: RefObject<HTMLElement>) => {
    useEffect(() => {
        const element = touchRef.current

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault()
        }
        element?.addEventListener("touchmove", handleTouchMove, {passive: false})

        return () => {
            element?.removeEventListener("touchmove", handleTouchMove)
        }
    }, []
    )
}
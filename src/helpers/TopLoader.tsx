// TopLoader.tsx
"use client"

import {useEffect, useState} from "react"

export function TopLoader({loading}: { loading: boolean }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let timer: NodeJS.Timeout

        if (loading) {
            setProgress(30)
            timer = setInterval(() => {
                setProgress(prev => (prev < 90 ? prev + 10 : prev))
            }, 500)
        } else {
            setProgress(100)
            setTimeout(() => setProgress(0), 300)
        }

        return () => clearInterval(timer)
    }, [loading])

    return (
        <div className="fixed top-0 left-0 w-full z-50 h-[4px] bg-transparent">
            <div
                className="h-full bg-blue-600 transition-all duration-300 ease-linear"
                style={{width: `${progress}%`}}
            />
        </div>
    )
}
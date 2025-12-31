import React, { useEffect, useState } from "react"

interface UseTimerProps {
    recording: boolean
}

export const useTimer= ({recording}: UseTimerProps) => {
    const [time, setTime] = useState(0)

    useEffect(() => {
        let interval : NodeJS.Timeout | null = null

        if (recording) {
            setTime(0)
            interval = setInterval(() => {
                setTime(prev => prev+1)
            }, 1000)
        }

        return () => {
            if (interval) clearInterval(interval)
        }
    },[recording])
    return time
}
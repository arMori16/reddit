'use client'

import { Duration, intervalToDuration } from "date-fns";
import { useEffect, useState } from "react";

export default function CountDown({ remainingTime }: { remainingTime: string }) {
    const [timeLeft, setTimeLeft] = useState<Duration | null>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            // Convert remainingTime (string) into a Date object
            const endDate = new Date(remainingTime);
            const currentTime = new Date();

            // Calculate remaining time in milliseconds
            const remainingTimeLeft = endDate.getTime() - currentTime.getTime();

            if (remainingTimeLeft > 0) {
                // Update the state with the remaining duration
                setTimeLeft(intervalToDuration({ start: 0, end: remainingTimeLeft }));
            } else {
                console.log(`YEAH`);
                clearInterval(interval); 
                setTimeLeft(null); 
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [remainingTime]); 

    return (
        <div className='flex ml-3'>
            <span className='mr-2'>|</span>
            <p>Time left: {timeLeft?.days && timeLeft.days + "d"} {timeLeft?.hours && timeLeft.hours + "h"} {timeLeft?.minutes && timeLeft.minutes + "min"} {timeLeft?.seconds && timeLeft?.seconds + 'sec'}</p>
        </div>
    );
}

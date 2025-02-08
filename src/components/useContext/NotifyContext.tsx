'use client'
import { useEffect, useState } from "react";
import notifier from "./notifier";

export const NotifyRenderer = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    notifier.subscribe(setNotifications);
    return () => notifier.unsubscribe(setNotifications);
  }, []);

  return (
    <div className="fixed z-50 inset-0 flex items-end justify-end pointer-events-none p-4">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="mb-4 w-[15rem] min-h-[2.25rem] bg-gray-300 rounded-md p-2 shadow-md text-black pointer-events-auto"
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

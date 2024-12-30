import { format } from "date-fns";

export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return String(format(date, "dd MMM HH:mm"));
};
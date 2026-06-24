export type AiResponse = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    onClose?: () => void;
};
export interface AiResponseBooking {
    data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        bookings?: any[];
        totalAmount?: number;
        text?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } | any[];
}

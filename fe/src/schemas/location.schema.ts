import { z } from "zod";

export const locationItemSchema = z.object({
    id: z.number(),
    imageLocation: z.string().nullable(),
    city: z.string(),
    district: z.string().nullable(),
    ward: z.string().nullable(),
    latitude: z.string().nullable(),
    longitude: z.string().nullable(),
});
export const locationSchema = z.array(locationItemSchema);
export type TLocationList = z.infer<typeof locationSchema>;
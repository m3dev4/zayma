import { z } from "zod"

export const registerSchema = z.object({
    firstName: z.string().min(2, "Le prenom est court").max(50),
    lastName: z.string().min(2, "Le nom est court").max(10),
    email: z.string().email("L'email n'est pas valide"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Doit contenir une majuscule")
        .regex(/[0-9]/, "Doit contenir un chiffre")
        .regex(/[^A-Za-z0-9]/, "Doit contenir un caractère spécial"),
    gender: z.enum(['male', 'female', 'other']).optional(),
    country: z.string().min(2).max(50).optional(),
})

export const loginSchema = z.object({
    email: z.string().email("L'email n'est pas valide! Veuillez reessayer"),
    password: z.string().min(1, "Mot de passe invalide")
})

export const updateProfileSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    email: z.string().email("Email invalide").optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    country: z.string().min(2).max(50).optional(),
})


export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
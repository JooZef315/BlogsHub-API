import { z } from "zod";

export const userZodSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "username is required" })
      .transform((val) => val.trim().replace(/\s+/g, "_")),
    email: z.string().email("This is not a valid email."),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPasswod: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    profilePicUrl: z.string().optional(),
  })
  .refine((data) => data.confirmPasswod === data.password, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const blogZodSchema = z
  .object({
    title: z.string().trim().min(1, { message: "blog title is required" }),
    author: z.string().min(1, { message: "the author is required" }),
    slug: z
      .string()
      .trim()
      .max(50, { message: "slug must be at most 50 characters long" })
      .optional(),
    body: z
      .string()
      .min(10, { message: "the body must be at least 10 characters long " }),
    tags: z.array(
      z
        .string()
        .trim()
        .toLowerCase()
        .transform((val) => val.trim().replace(/\s+/g, "-"))
        .pipe(z.string().min(1, { message: "a tag must be not empty" }))
    ),
    blogCoverUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      const tagsSet = new Set(data.tags);
      return tagsSet.size === data.tags.length;
    },
    {
      message: "tags must be unique",
      path: ["tags"],
    }
  );

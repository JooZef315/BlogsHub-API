import { z } from "zod";

export const userZodSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, { message: "username is required" })
      .transform((val) => val.trim().replace(/\s+/g, "_")),
    email: z.string().email("This is not a valid email.").toLowerCase(),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    profilePicUrl: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
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

export const commentZodSchema = z.object({
  body: z.string().trim().min(1, { message: "comment body is required" }),
  userId: z.string().min(1, { message: "userId is required" }),
  blogId: z.string().min(1, { message: "blogId is required" }),
  parentId: z.string().optional(),
});

export const resetingPasswordZodSchema = z
  .object({
    email: z.string().email("This is not a valid email.").toLowerCase(),
    newPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    confirmNewPassword: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long" }),
    token: z.string(),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    clerkId: v.string(),
    role: v.union(v.literal("candidate"), v.literal("interviewer")),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    console.log("Syncing user:", args);
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      console.log("User already exists, not inserting:", existingUser);
      return;
    }

    console.log("Inserting new user with role:", args.role);
    return await ctx.db.insert("users", args);
  },
});


export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is not authenticated");

    const users = await ctx.db.query("users").collect();

    return users;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    return user;
  },
});

export const updateUserRole = mutation({
  args: {
    clerkId: v.string(),
    role: v.union(v.literal("candidate"), v.literal("interviewer")),
  },
  handler: async (ctx, args) => {
    console.log("Updating role for clerkId:", args.clerkId);
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      console.error("User not found for clerkId:", args.clerkId);
      throw new Error("User not found");
    }

    console.log("User found:", user);
    return await ctx.db.patch(user._id, {
      role: args.role,
    });
  },
});

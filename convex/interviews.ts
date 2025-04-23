import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Fetch all interviews
    const interviews = await ctx.db.query("interviews").collect();

    // Filter interviews where the logged-in user is an interviewer
    const filteredInterviews = interviews.filter((interview) =>
      interview.interviewerIds.includes(identity.subject)
    );

    return filteredInterviews;
  },
});

export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const interviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject)) // Filter by candidate ID
      .collect();

    return interviews!;
  },
});

export const getInterviewByStreamCallId = query({
  args: { streamCallId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId))
      .first();
  },
});
export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    status: v.string(),
    streamCallId: v.string(),
    candidateId: v.string(),
    interviewerIds: v.array(v.string()), // A list of interviewers
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Ensure the candidateId is a valid user
    const candidate = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.candidateId))
      .first();

    if (!candidate) {
      throw new Error("Invalid candidate ID");
    }

    // Ensure the interviewerIds are valid users
    const validInterviewers = [];
    for (const interviewerId of args.interviewerIds) {
      const interviewer = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", interviewerId))
        .first();
        
      if (!interviewer) {
        throw new Error(`Invalid interviewer ID: ${interviewerId}`);
      }
      
      validInterviewers.push(interviewer);
    }

    // Proceed with creating the interview
    return await ctx.db.insert("interviews", {
      ...args,
      interviewerIds: args.interviewerIds, // Ensure valid interviewer IDs are used
    });
  },
});

export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });
  },
});
export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

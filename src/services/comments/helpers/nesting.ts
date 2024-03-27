import { Comment, Comments, Ids, NestedComment } from "./commentTypes";

export const getNestedRepliesIds = (
  comment: Comment,
  comments: Comment[]
): Ids => {
  const replies = comment.replies;
  if (replies.length < 1) {
    //base condition
    return [];
  }
  const directReplies = comments.filter((comment) =>
    replies.includes(comment._id)
  );

  const RepliesIds: any = directReplies.map((reply) => {
    const ReplyId = getNestedRepliesIds(reply, comments);
    return [reply._id, ...ReplyId];
  });

  return RepliesIds;
};

export const nestReplies = (
  comment: Comment,
  comments: Comment[]
): NestedComment[] => {
  const replies = comment.replies;
  if (replies.length < 1) {
    //base condition
    return [];
  }
  const directReplies = comments.filter((comment) =>
    replies.includes(comment._id)
  );

  const fullReplies: NestedComment[] = directReplies.map((reply) => {
    const fullReply = nestReplies(reply, comments);
    return {
      _id: reply._id,
      userId: reply.userId,
      body: reply.body,
      parentId: reply.parentId,
      replies: fullReply,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
    };
  });
  return fullReplies;
};

export const nestComments = (comments: Comments): NestedComment[] => {
  if (comments.length <= 0) {
    return [];
  }

  const rootComments: Comments = comments.filter(
    (comment) => !comment.parentId
  );

  const nestedComments = rootComments.map((comment) => {
    const fullReplies: NestedComment[] = nestReplies(comment, comments);
    const commentToReturn = {
      _id: comment._id,
      userId: comment.userId,
      body: comment.body,
      parentId: comment.parentId,
      replies: fullReplies,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
    return commentToReturn;
  });

  return nestedComments;
};

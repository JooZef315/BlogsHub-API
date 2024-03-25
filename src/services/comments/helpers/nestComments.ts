import {
  Comment,
  Comments,
  NestedComment,
  NestedComments,
} from "./commentTypes";

function nestReplies(reply: Comment, comments: Comments): NestedComment[] {
  const replies = reply.replies;
  if (replies.length < 1) {
    //base condition
    return [];
  }
  const directReplies = comments.filter((comment) =>
    replies.includes(comment._id)
  );

  const fullReplies: NestedComment[] = directReplies.map((r) => {
    const fullR = nestReplies(r, comments);
    return {
      _id: r._id,
      userId: r.userId,
      body: r.body,
      parentId: r.parentId,
      replies: fullR,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  });
  return fullReplies;
}

export const nestComments = (comments: Comments) => {
  if (comments.length <= 0) {
    return [];
  }

  const rootComments: Comments = comments.filter(
    (comment) => !comment.parentId
  );

  const nestedComments = rootComments.map((comment) => {
    const fullReplies: NestedComments = nestReplies(comment, comments);
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

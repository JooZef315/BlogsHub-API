import { Ids } from "../services/comments/helpers/commentTypes";

export const getRepliesIds = (ids: Ids) => {
  let flattenIds: string[] = [];

  ids.forEach((id) => {
    if (Array.isArray(id)) {
      flattenIds = flattenIds.concat(getRepliesIds(id));
    } else {
      flattenIds.push(id);
    }
  });

  return flattenIds;
};

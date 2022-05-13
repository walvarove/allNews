import { Novelty } from '../api/novelties/dao';

export class PermissionMiddleware {
  static canManageNovelty = async (
    req,
    res,
    next
  ) => {
    const user = req.user;
    const noveltyId = req.params.id;        

    if(!user?.novelties?.some(userNoveltyID => userNoveltyID.equals(noveltyId))) {
      return res.status(401).send("Unauthorized");
    }
    const novelty = await Novelty.findById(noveltyId);
    req.novelty = novelty;
    next();
  };
}
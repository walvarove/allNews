import { UserService } from './../users/service';
import { Response } from 'express';
import { Novelty } from './dao';
import { INovelty, NoveltyStatus } from './model';

export class NoveltyController {

  static async getNovelties(_, res: Response) {
    const novelties = await Novelty.find({
      status: NoveltyStatus.PUBLISHED,
    })
      .populate("author", "id username email")
      .sort("-date");
    res.status(200).send(novelties);
  }

  static async getUserNovelties(req, res) {
    const user = req.user;
    const userNovelties = await Novelty.find({ _id: { $in: user.novelties } }).select('-author').sort('-archiveDate');
    return res.status(200).send(userNovelties);
  }

  static async update(req, res) {
    const { id } = req.params;
    const noveltyParams: Partial<INovelty> = req.body;

    if (!Object.keys(noveltyParams)) {
      return res
        .status(400)
        .json("You must provide at least one novelty param to update");
    }

    try {

      const params = {
        status: noveltyParams.status,
        ...(noveltyParams.status === NoveltyStatus.ARCHIVED && { archiveDate: new Date() })
      }
      
      const updatedNovelty = await Novelty.findByIdAndUpdate(id, params, {
        new: true,
      });
      return res.status(200).send(updatedNovelty);
    } catch {
      return res.status(404).json("Not found novelty");
    }
  }


  static async deleteNovelty(req, res) {
    const { id } = req.params;
    try {
      const deletedNovelty = await Novelty.findByIdAndDelete(id);
      await UserService.removeNovelty(req.user.id, deletedNovelty?.id);
      return res.status(204).send();
    } catch {
      return res.status(404).json("Not found novelty");
    }
  }

}
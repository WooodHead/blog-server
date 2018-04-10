const Service = require('egg').Service;

class MusicService extends Service {
  async create(target) {
    const music = new this.ctx.model.Music(Object.assign({
      created_at: this.ctx.helper.currentTime(),
    }, target))
    const result = await music.save();
    return result;
  }
  async find(id) {
    const music = await this.ctx.model.Music.findOne({_id: id});
    return music;
  }
  async remove(id) {
    const doc = await this.ctx.model.Music.remove({_id: id});
    if (doc.result.ok) {
      if (doc.result.n) return true;
      throw new Error('该音乐不存在');
    }
  }
  async update(target) {
    const music = await this.ctx.model.Music.findById({_id: target._id});
    if (music) {
      for (let key in target) {
        music[key] = target[key];
      }
      const doc = await music.save();
      return doc;
    }
    return undefined;
  }
  async search(query) {
    const result = await this.ctx.helper.search(query, this.ctx.model.Music, 'publisher');
    return result;
  }
}

module.exports = MusicService;

const Service = require('egg').Service;

class TagService extends Service {
  async create(target) {
    const tag = new this.ctx.model.Tag(Object.assign({
      created_at: this.ctx.helper.currentTime(),
    }, target))
    const result = await tag.save();
    return result;
  }
  async find(id) {
    const tag = await this.ctx.model.Tag.findOne({ _id: id });
    return tag;
  }
  async remove(id) {
    const doc = await this.ctx.model.Tag.remove({ _id: id });
    if (doc.result.ok) {
      if (doc.result.n) return true;
      throw new Error('该标签不存在');
    }
  }
  async update(target) {
    const tag = await this.ctx.model.Tag.update({ _id: target._id }, Object.assign({
      updated_at: this.ctx.helper.currentTime
    }, target));
    return tag;
  }
  async search(query) {
    const result = await this.ctx.helper.search(query, this.ctx.model.Tag);
    return result;
  }
}

module.exports = TagService;

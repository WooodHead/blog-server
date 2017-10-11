module.exports = app => {
  class {{firseUpperTemplateName}} extends app.Service {
    async create(target) {
      const currentTime = this.ctx.helper.currentTime();
      const result = await app.mysql.insert('{{tableName}}', Object.assign({
        created_at: currentTime,
        updated_at: currentTime
      }, target))
      return result.affectedRows === 1;
    }
    async find(id) {
      const {{templateName}} = await app.mysql.get('{{tableName}}', { id });
      return {{templateName}};
    }
    async findAll() {
      const {{pluralTemplateName}} = await app.mysql.get('{{tableName}}');
      return {{pluralTemplateName}};
    }
    async remove(id) {
      const result = await app.mysql.delete('{{tableName}}', { id });
      return result.affectedRows === 1;
    }
    async batchRemove(ids) {
      const result = await app.mysql.query(`
        delete from {{tableName}} where id in (${ids.join(',')})
      `)
      return result.affectedRows === ids.length;
    }
    async search(query) {
      const result = await this.ctx.helper.search('{{tableName}}', query, app.mysql);
      return result;
    }
    async update(target) {
      const currentTime = this.ctx.helper.currentTime();
      const result = await app.mysql.update('{{tableName}}', Object.assign({
        updated_at: currentTime
      }, target));
      return result.affectedRows === 1;
    }
  }
  return {{firseUpperTemplateName}};
};
const Controller = required('egg').Controller;

const createRule = {
  exampleNumber: { type: 'number', required: false },
  exampleString: 'string',
}

class {{firseUpperTemplateName}}Controller extends Controller {
  async index() {
    const { ctx, service } = this;
    const result = await service.{{templateName}}.search(ctx.query);
    ctx.body = {
      pagination: result.pagination,
      {{pluralTemplateName}}: result.records
    };
    ctx.status = 201;
  }
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const {{templateName}} = await service.{{templateName}}.find(id);
    ctx.body = {
      {{templateName}}
    };
    ctx.status = 200;
  }
  async create() {
    const { ctx, service } = this;
    ctx.validate(createRule);
    const {{templateName}} = await service.{{templateName}}.create(ctx.request.body);
    ctx.body = {
      {{templateName}}
    };
    ctx.status = 201;
  }
  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    ctx.validate(createRule);
    let {{templateName}} = ctx.request.body;
    {{templateName}}.id = id
    await service.{{templateName}}.update({{templateName}});
    ctx.body = {
      id
    };
    ctx.status = 200;
  }
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.{{templateName}}.remove(id);
    ctx.body = {
      id
    };
    ctx.status = 200;
  }
  async batchDestroy() {
    const { ctx, service } = this;
    const ids = ctx.request.body;
    await service.{{templateName}}.batchRemove(ids);
    ctx.body = {
      ids
    };
    ctx.status = 200;
  }
}

module.exports = {{firseUpperTemplateName}}Controller

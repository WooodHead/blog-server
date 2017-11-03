module.exports = class SqlHandler {
	constructor(sql) {
		this.sql = sql.toLowerCase();
	}

	setCount() {
		const sql = this.sql;
		this.sql = `select count(1) count ${sql.substring(sql.indexOf(' from '))} `;
		return this;
	}

	getAliases() {
		const sql = this.sql;
		const aliasSql = sql.substring(sql.indexOf('select ') + 7, sql.indexOf(' from '));
		const aliasMaps = aliasSql.split(',');
		const map = {};
		aliasMaps.forEach(item => {
			const mapStr = item.trim().split(' ');
			if (mapStr.length > 1) {
				const value = mapStr[0].trim();
				const key = mapStr[1].trim();
				map[key] = value;
			}
		})
		return map;
	}

	setQueryParams(queryParams) {
		const sql = this.sql;
		let preSql = this.sql;
		let extSql = '';
		if (preSql.indexOf('group by') != -1) {
			preSql = sql.substring(0, sql.indexOf('group by'));
			extSql = sql.substring(sql.indexOf('group by'));
		}
		if (preSql.indexOf('where') == -1) {
			preSql += ' where 1 = 1 ';
		}
		for (let key in queryParams) {
			let value = queryParams[key];
			value = 'string' === typeof value ? `'${value}'` : value;
			preSql += `and ${key} = ${value} `;
		}
		this.sql = `${preSql} ${extSql} `;
		return this;
	}

	setSortParams(sorter) {
		const sql = this.sql;
		if (sorter.length == 2) {
			this.sql = sql + `order by ${sorter[0]} ${sorter[1]} `;
		}
		return this;
	}

	setLimitParams(start, pageSize) {
		const sql = this.sql;
		this.sql = sql + `limit ${start}, ${pageSize}`;
		return this;
	}

	getSql() {
		return this.sql;
	}
}
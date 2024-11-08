const up = (knex) =>
	knex.schema.createTable("users", (table) => {
		table.increments("id");
		table.string("name").notNullable();
		table.string("email").notNullable();
		table.string("password").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
		table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
	});

const down = (knex) => knex.schema.dropTable("users");

export { up, down };

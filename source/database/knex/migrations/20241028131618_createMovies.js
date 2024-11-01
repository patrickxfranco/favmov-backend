const up = (knex) =>
	knex.schema.createTable("movies", (table) => {
		table.increments("id");
		table.integer("user_id").references("id").inTable("users").onDelete("CASCADE").notNullable();
		table.string("title").notNullable();
		table.text("cover").notNullable();
		table.text("description").notNullable();
		table.text("player_adress").notNullable();
		table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
		table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
	});

const down = (knex) => knex.schema.dropTable("movies");

export { up, down };

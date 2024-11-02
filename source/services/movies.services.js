import knex from "../database/knex/index.js";

class MoviesServices {
	async index(request, response) {
		const user_id = request.id;

		// Selects the ID, USER_ID, TITLE, COVER, DESCRIPTION, PLAYER_ADRESS, CREATED_AT and UPDATED_AT columns from the MOVIES table
		const userWithThisId = await knex.select("*").from("users").where({ id: user_id }).first();

		// If the user doesn't exist, returns an error
		if (!userWithThisId) {
			return response.status(400).json({ error: "User not found" });
		}

		// Selects the ID, USER_ID, TITLE, COVER, DESCRIPTION, PLAYER_ADRESS, CREATED_AT and UPDATED_AT columns from the MOVIES table
		const movies = await knex
			.select("id", "title", "cover", "description", "player_adress", "created_at", "updated_at")
			.from("movies")
			.where({ user_id: userWithThisId.id })
			.orderBy("title", "asc");

		// Returns the movies object
		return response.status(200).json(movies);
	}

	async create(request, response) {
		const user_id = request.id;
		const { title, cover, description, player_adress } = request.body;

		const userWithThisId = await knex.select("*").from("users").where({ id: user_id }).first();

		// If the user doesn't exist, returns an error
		if (!userWithThisId) {
			return response.status(400).json({ error: "User not found" });
		}

		// Checks if all fields have been completed
		if (!title || !cover || !description || !player_adress) {
			return response.status(400).json({ error: "Missing required fields" });
		}

		// Insert the movie into the database
		await knex("movies").insert({
			user_id,
			title,
			cover,
			description,
			player_adress,
		});

		// Returns a success message
		return response.status(201).json({ message: "Movie created" });
	}

	async read(request, response) {
		const movie_id = request.params.id;
		const user_id = request.id;

		const userWithThisId = await knex.select("*").from("users").where({ id: user_id }).first();

		// If the user doesn't exist, returns an error
		if (!userWithThisId) {
			return response.status(400).json({ error: "User not found" });
		}

		// Selects the ID, USER_ID, TITLE, COVER, DESCRIPTION, PLAYER_ADRESS, CREATED_AT and UPDATED_AT columns from the MOVIES table
		const movie = await knex.select("*").from("movies").where({ user_id, movie_id }).first();

		// If the movie doesn't exist, returns an error
		if (!movie) {
			return response.status(400).json({ error: "Movie not found" });
		}

		// Returns the movie object
		return response.status(200).json(movie);
	}

	async update(request, response) {
		const { title, cover, description, player_adress } = request.body;
		const movie_id = request.params.id;
		const user_id = request.id;

		const userWithThisId = await knex.select("*").from("users").where({ id: user_id }).first();

		// If the user doesn't exist, returns an error
		if (!userWithThisId) {
			return response.status(400).json({ error: "User not found" });
		}

		// Selects the ID, USER_ID, TITLE, COVER, DESCRIPTION, PLAYER_ADRESS, CREATED_AT and UPDATED_AT columns from the MOVIES table
		const movie = await knex
			.select("id", "title", "cover", "description", "player_adress")
			.from("movies")
			.where({ user_id, movie_id })
			.first();

		// If the movie doesn't exist, returns an error
		if (!movie) {
			return response.status(400).json({ error: "Movie not found" });
		}

		// Checks if all fields have been completed
		if (!title || !cover || !description || !player_adress) {
			return response.status(400).json({ error: "Missing required fields" });
		}

		// Updates the movie in the database
		await knex("movies")
			.where({ id: movie.id })
			.update({
				title: title ?? movie.title,
				cover: cover ?? movie.cover,
				description: description ?? movie.description,
				player_adress: player_adress ?? movie.player_adress,
				updated_at: knex.fn.now(),
			});

		// Returns a success message
		return response.status(200).json({ message: "Movie updated" });
	}

	async delete(request, response) {
		const movie_id = request.params.id;
		const user_id = request.id;

		const userWithThisId = await knex.select("*").from("users").where({ id: user_id }).first();

		// If the user doesn't exist, returns an error
		if (!userWithThisId) {
			return response.status(400).json({ error: "User not found" });
		}

		// Selects the ID, USER_ID, TITLE, COVER, DESCRIPTION, PLAYER_ADRESS, CREATED_AT and UPDATED_AT columns from the MOVIES table
		const movie = await knex.select("id").from("movies").where({ user_id, movie_id }).first();

		// If the movie doesn't exist, returns an error
		if (!movie) {
			return response.status(400).json({ error: "Movie not found" });
		}

		// Deletes the movie from the database
		await knex("movies").where({ user_id, movie_id }).del();

		// Returns a success message
		return response.status(200).json({ message: "Movie deleted" });
	}
}

export default MoviesServices;

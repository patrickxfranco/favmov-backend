import settings from "../../settings.json" assert { type: "json" };
import knex from "../database/knex/index.js";
import { hash, compare } from "bcrypt";

class UserServices {
	async create(request, response) {
		const { name, email, password } = request.body;

		// Checks if all fields have been completed
		if (!name || name === "" || !email || email === "" || !password || password === "") {
			// If not, returns an error
			return response.status(400).json({ error: "Missing required fields" });
		}

		// Checks if the user already exists
		const userWithExistentEmail = await knex.select("*").from("users").where({ email }).first();

		// If the user already exists, returns an error
		if (userWithExistentEmail) {
			return response.status(400).json({ error: "User already exists" });
		}

		// Checks if the password has the minimum number of characters
		if (password.length < settings.users.passwordMinCharacters) {
			return response.status(400).json({
				error: `Password must have at least ${settings.users.passwordMinCharacters} characters`,
			});
		}

		// Hashes the password
		const hashedPassword = await hash(password, 8);

		// Insert the user into the database
		await knex("users").insert({ name, email, password: hashedPassword });

		// Returns a success message
		return response.status(201).json({ message: "User created" });
	}

	async read(request, response) {
		const user_id = request.id;

		// Selects the ID, NAME, EMAIL, CREATED_AT and UPDATED_AT columns from the USERS table
		const userWithThisId = await knex
			.select("id", "name", "email", "created_at", "updated_at")
			.from("users")
			.where({ id: user_id })
			.first();

		// If the user doesn't exist, returns an error
		if (!userWithThisId) {
			return response.status(400).json({ error: "User not found" });
		}

		// Returns the user object
		return response.status(200).json(userWithThisId);
	}

	async update(request, response) {
		const { newName, newEmail, currentPassword, newPassword } = request.body;
		const user_id = request.id;

		// Selects from the database the user who has the ID entered in the parameter
		const currentUser = await knex.select("*").from("users").where({ id: user_id }).first();

		// Selects from the database the user who has the email entered in the parameter
		const userWithNewEmail = await knex
			.select("*")
			.from("users")
			.where({ email: newEmail ?? currentUser.email })
			.first();

		// If the user doesn't exist, returns an error
		if (!currentUser) {
			return response.status(400).json({ error: "User not found" });
		}

		// Check if an email has been provided
		if (userWithNewEmail) {
			// If the user already exists, returns an error
			if (userWithNewEmail.id !== currentUser.id) {
				return response.status(400).json({ error: "Email already in use" });
			}
		}

		// Check if a current password has been entered
		if (!currentPassword) {
			return response.status(400).json({ error: "Current password is required" });
		}

		// Check if the current password is correct
		if (!(await compare(currentPassword, currentUser.password))) {
			return response.status(400).json({ error: "Invalid password" });
		}

		// Check if a new password has been entered
		if (newPassword) {
			// Checks whether the new password meets the character requirement
			if (newPassword.length < settings.users.passwordMinCharacters) {
				return response.status(400).json({
					error: `Password must have at least ${settings.users.passwordMinCharacters} characters`,
				});
			}
			// Hashes the new password
			var hashedPassword = await hash(newPassword, 8);
		}

		// Updates the user in the database
		await knex("users")
			.where({ id: currentUser.id })
			.update({
				name: newName ?? currentUser.name,
				email: newEmail ?? currentUser.email,
				password: hashedPassword ?? currentUser.password,
				updated_at: knex.fn.now(),
			});

		// Returns a success message
		return response.status(200).json({ message: "User updated" });
	}

	async delete(request, response) {
		const { password } = request.body;
		const user_id = request.id;

		// Selects from the database the user who has the ID entered in the parameter
		if (!user_id) {
			return response.status(400).json({ error: "User not logged" });
		}

		// Checks if all fields have been completed
		if (!password || password === "") {
			return response.status(400).json({ error: "Missing required fields" });
		}

		// Selects from the database the user who has the ID entered in the parameter
		const currentUser = await knex.select("*").from("users").where({ id: user_id }).first();

		// If the user doesn't exist, returns an error
		if (!currentUser) {
			return response.status(400).json({ error: "User not found" });
		}

		// If the user doesn't exist, returns an error
		if (!currentUser) {
			return response.status(400).json({ error: "User not found" });
		}

		// Checks if the password is correct
		if (!(await compare(password, currentUser.password))) {
			return response.status(400).json({ error: "Invalid password" });
		}

		// Deletes the user from the database
		await knex("users").where({ id: currentUser.id }).del();

		// Returns a success message
		return response.status(200).json({ message: "User deleted" });
	}
}

export default UserServices;

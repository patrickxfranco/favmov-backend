import knex from "../database/knex/index.js";
import { compare } from "bcrypt";
import pkg from "jsonwebtoken";

const { sign } = pkg;

class Session {
	async create(request, response) {
		const { email, password } = request.body;

		// Checks if all fields have been completed
		if (!email || email === "" || !password || password === "") {
			return response.status(400).json({ error: "Missing required fields" });
		}

		// Selects from the database the user who has the email entered in the parameter
		const userWithThisEmail = await knex
			.select("*")
			.from("users")
			.where({ email: String(email).toLocaleLowerCase() })
			.first();

		// If the user doesn't exist, returns an error
		if (!userWithThisEmail) {
			return response.status(401).json({ error: "Incorrect email address and/or password" });
		}

		// Checks if the password is correct
		if (!(await compare(password, userWithThisEmail.password))) {
			return response.status(401).json({ error: "Incorrect email address and/or password" });
		}

		// Creates the JWT token
		const token = sign({ id: userWithThisEmail.id }, process.env.SECRET, {
			expiresIn: "1d",
		});

		// Returns the token
		return response.status(200).json({ token });
	}
}

export default Session;

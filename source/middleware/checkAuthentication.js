import pkg from "jsonwebtoken";

const { verify } = pkg;

function checkAuthentication(request, response, next) {
	const { authorization } = request.headers;

	if (!authorization) {
		return response.status(401).json({ error: "Invalid JWT token" });
	}

	verify(authorization, process.env.SECRET, (err, decoded) => {
		if (err) {
			return response.status(401).json({ error: "Invalid JWT token" });
		}

		request.id = decoded.id;
		return next();
	});
}

export default checkAuthentication;

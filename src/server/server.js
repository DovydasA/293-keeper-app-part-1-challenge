import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
env.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const db = new pg.Client({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});
db.connect();

const dbNotes = async () => {
	try {
		const query = "SELECT * from notes ORDER BY id ASC";
		const result = await db.query(query);
		return result.rows;
	} catch (error) {
		console.log(error);
		return error;
	}
};

app.get("/posts", async (req, res) => {
	console.log("get request received");
	const posts = await dbNotes();
	//console.log(posts);
	res.json(posts);
});

app.post("/posts", async (req, res) => {
	console.log("post request received");
	const {title, content} = req.body;
	try {
		const query =
			"INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *";
		const result = await db.query(query, [title, content]);
		res.json(result.rows[0]);
	} catch (err) {
		console.log(err);
		res.json(err);
	}
});

app.delete("/posts/:id", async (req, res) => {
	console.log("delete request");
	try {
		const query = "DELETE FROM notes WHERE id = $1";
		await db.query(query, [req.params.id]);
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

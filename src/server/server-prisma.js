import express from "express";
import {PrismaClient} from "@prisma/client";
import bodyParser from "body-parser";
import env from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
env.config();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
	console.log("get request received");
	try {
		const allNotes = await prisma.notes.findMany();
		res.json(allNotes);
	} catch (error) {
		console.error(error);
		res.status(500).json("Server error");
	}
});

app.post("/posts", async (req, res) => {
	console.log("post request received");
	const {title, content} = req.body;
	try {
		await prisma.notes.create({
			data: {
				title: title,
				content: content,
			},
		});
		res.status(200).send("New note added");
	} catch (error) {
		console.error(error);
	}
});

app.delete("/posts/:id", async (req, res) => {
	console.log("delete request");
	const {id} = req.params;
	try {
		await prisma.notes.delete({
			where: {
				id: parseInt(id),
			},
		});
		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

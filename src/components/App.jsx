import React, {useEffect, useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
//import notes from "../notes";
import CreateArea from "./CreateArea";

function App() {
	const [notes, setNotes] = useState(null);

	useEffect(async () => {
		await fetchNotes();
	}, []);

	useEffect(() => {
		console.log(notes);
	}, [notes]);

	const fetchNotes = async () => {
		try {
			const response = await fetch("http://localhost:3000/posts");
			const result = await response.json();
			setNotes(result);
		} catch (error) {
			console.log(error);
			return "error";
		}
	};

	// const handleNewNote = (note) => {
	// 	setAllNotes((prev) => [
	// 		...prev,
	// 		{
	// 			key: prev.length === 0 ? 1 : allNotes[allNotes.length - 1].key + 1,
	// 			title: note.title,
	// 			content: note.content,
	// 		},
	// 	]);
	// };

	const handleNewNote = async (note) => {
		try {
			console.log(note);
			const response = await fetch("http://localhost:3000/posts", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(note),
			});
			const result = await response.json();
			fetchNotes();
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(`http://localhost:3000/posts/${id}`, {
				method: "DELETE",
			});
			console.log(response);
			if (response.ok) {
				console.log(`Post with ID ${id} deleted successfully`);
			} else {
				console.error(
					`Failed to delete post with ID ${id}: ${response.status} ${response.statusText}`
				);
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
		await fetchNotes();
	};

	return (
		<>
			<Header />
			<CreateArea onAdd={handleNewNote} />
			{notes
				? notes.map((note) => (
						<Note
							key={note.id}
							id={note.id}
							title={note.title}
							content={note.content}
							onDelete={handleDelete}
						/>
				  ))
				: "Loading notes..."}
			<Footer />
		</>
	);
}

export default App;

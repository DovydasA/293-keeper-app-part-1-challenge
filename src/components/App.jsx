import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";
import CreateArea from "./CreateArea";

function App() {
	const [allNotes, setAllNotes] = useState([...notes]);
	const handleNewNote = (note) => {
		setAllNotes((prev) => [
			...prev,
			{
				key: prev.length === 0 ? 1 : allNotes[allNotes.length - 1].key + 1,
				title: note.title,
				content: note.content,
			},
		]);
	};
	const handleDelete = (id) => {
		setAllNotes((prev) =>
			prev.filter((note, index) => {
				if (index !== id) return note;
			})
		);
	};

	return (
		<>
			<Header />
			<CreateArea onAdd={handleNewNote} />
			{allNotes &&
				allNotes.map((note, index) => (
					<Note
						key={note.key}
						id={index}
						title={note.title}
						content={note.content}
						onDelete={handleDelete}
					/>
				))}
			<Footer />
		</>
	);
}

export default App;

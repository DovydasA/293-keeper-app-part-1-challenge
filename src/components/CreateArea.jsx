import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import {Fab} from "@mui/material";
import {Zoom} from "@mui/material";

function CreateArea({onAdd}) {
	const [isFocused, setIsFocused] = useState(false);
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setNote((prev) => ({...prev, [name]: value}));
	};

	const handleClick = (e) => {
		e.preventDefault();
		onAdd(note);
		setNote({
			title: "",
			content: "",
		});
		setIsFocused(false);
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleRemoveFocus = () => {
		setIsFocused(false);
	};

	return (
		<div onFocus={handleFocus}>
			<form className="create-note">
				{isFocused && (
					<input
						name="title"
						placeholder="Title"
						value={note.title}
						onChange={handleChange}
					/>
				)}
				<textarea
					name="content"
					placeholder="Take a note..."
					rows={isFocused ? "3" : "1"}
					value={note.content}
					onChange={handleChange}
				/>
				<Zoom in={isFocused}>
					<Fab onClick={handleClick}>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;

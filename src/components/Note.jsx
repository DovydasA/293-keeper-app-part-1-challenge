import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Note({title, content, id, onDelete}) {
	return (
		<div className="note">
			<h2>{title}</h2>
			<p>{content}</p>
			<button
				onClick={() => {
					onDelete(id);
				}}>
				<DeleteIcon />
			</button>
		</div>
	);
}

export default Note;

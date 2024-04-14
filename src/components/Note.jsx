import React from "react";

function Note({title, content, id, onDelete}) {
	return (
		<div className="note">
			<h2>{title}</h2>
			<p>{content}</p>
			<button
				onClick={() => {
					onDelete(id);
				}}>
				DELETE
			</button>
		</div>
	);
}

export default Note;

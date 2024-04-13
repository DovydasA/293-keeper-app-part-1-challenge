//5. Create a Note.jsx component to show a <div> element with a
//<h1> for a title and a <p> for the content.
//6. Make sure that the final website is styled like the example shown here:
//https://l1pp6.csb.app/

import React from "react";

function Note({title, content}) {
	return (
		<div className="note">
			<h2>{title}</h2>
			<p>{content}</p>
		</div>
	);
}

export default Note;

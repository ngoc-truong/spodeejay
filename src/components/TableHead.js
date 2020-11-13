import React from "react";

const TableHead = () => {
	return (
		<div className="head">
			<div className="bigger">Title</div>
			<div className="bigger">Artist</div>
			<div>Duration</div>
			<div>BPM</div>
			<div>Valence</div>
			<div>Energy</div>
			<div>Key</div>
			<div className="bigger">Play</div>
		</div>
	)
}

export default TableHead;
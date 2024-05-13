const fs = require("fs");
const path = require("path");

const fileRemover = (filename) => {
	fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
		if (err && err.code == "ENOENT") {
			console.log(`File ${filename} does not exist, won't remove it. `);
		} else if (err) {
			console.log(
				`Error occured while trying to remove the file ${filename}`
			);
		} else {
			console.log(`Removed ${filename}`);
		}
	});
};

module.exports = { fileRemover };

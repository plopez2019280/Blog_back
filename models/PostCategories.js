//external imports
const { Schema, model } = require("mongoose");

const PostCategoriesSchema = new Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const PostCategories = model("PostCategories", PostCategoriesSchema);


module.exports = PostCategories;

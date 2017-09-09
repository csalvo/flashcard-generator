var ClozeCard = function(text, cloze){
	this.cloze = cloze;
	if (text.indexOf(cloze) != -1){
		this.partial = text.replace(cloze, "...");
	} else {
		this.partial = "Error!";
	};
	this.fullText = text;
}
module.exports = ClozeCard;
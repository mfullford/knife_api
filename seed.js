var db = require('./models');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3000/api');


let newKnife = [
	{
	name: "Bowie",
	description: "This is one of the more popular knife patterns. It was created in the 19th century for infamous knife fighter James Bowie who eventually died at the Alamo. It is a larger knife with a crossguard and a clip point. It implements the shape of the traditional Spanish folding knife. The blade is typically anywhere from 8 to 12 inches in length and is perfect for hunting and skinning.",
	rating: 5,
	review: "This was a great knife - I used it on our hunting trip and it worked like a dream."
	},
	{
	name: "Drop Point",
	location: "This knife slopes on the spine of the blade from the handle of the knife to the tip of the blade.",
	rating: 4,
	review: "Works great for hunting!."
	},
	{
	name: "Straight-Back",
	location: "This knife has a flat back and a curved edge. Because the back is not sharp it allows you to use your hand or fingers to apply additional pressure to increase the cutting force.  Overall it’s good for slicing or chopping.",
	rating: 5,
	review: "Perfect to use in the kitchen!."
	},
];



db.Knife.create(newKnife, function(err, knife){
  if (err){
    return console.log("Error:", err);
  }
  console.log("Created new knife", knife.name)
  process.exit(); // we're all done! Exit the program.
});
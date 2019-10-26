var 	express =require ("express"),
	 	app =express(),
		mongoose=require("mongoose"),
		 bodyParser=require("body-parser")

		mongoose.connect("mongodb://localhost:27017/yalp-camp", { useNewUrlParser: true,useUnifiedTopology: true,
	useCreateIndex: true});
	app.set("view engine","ejs");
	app.use(bodyParser.urlencoded({extended: true}));


//schema set  up

var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});
var Campground=mongoose.model("Campground",campgroundSchema);
	// Campground.create(
	// {name:"Gartin Hill",
	// image:"https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
	// description:"This is ahill montain"},function(err,campground){
	// 	if(err){
	// 		console.log(err)
	// 	}else{
	// 		console.log("newly created")
	// 		console.log(campground);
	// 	}
	// }
	// )
app.get("/",function(req,res){
	res.render("landing");
})
// INDEX ROUTE WITH GIT VERB
app.get("/campground",function(req,res){
	//get all campground from DB
	Campground.find({},function(err,allCampground){
		if(err){
			console.log(err)
		}else{
			res.render("campground",{campground:allCampground})
		}
	})
})

// CREATE ROUTE WITH POST VERB
app.post("/campground" ,function(req,res){
	var name= req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var newCampground={name: name ,image:image ,description:desc}
Campground.create(newCampground,function(err,newlyCreated){
	if(err){
		console.log(err)
	}else{
		res.redirect("/campground");
	}
})
});
// NEW  NAME WITH NEW URL AND THE VERB IS GET THAT DISPLAY THE FORM 
app.get("/campground/new",function(req,res){
	res.render("new")
})
// THE SHOW  WITH PERTICUL ID 
app.get("/campground/:id",function(req,res){
//find the campground with ip 
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err)
		}else{
	res.render("show",{campground:foundCampground});
		}
	})

})

app.listen(process.env.PORT||3000 ,process.env.IP,function(){
console.log("The YalpCamp Server Has Started")
	
});

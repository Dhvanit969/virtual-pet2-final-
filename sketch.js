//Create variables here
var dog, happyDog, database;
var foods,foodStock;
var firebase;
var fedTime,lastFed;
var foodObj;
function preload()
{
  //load images here
  dog1=loadImage("images/dogImg.png");
  dog2=loadImage("images/dogImg1.png");
}

function setup() {

  database=firebase.database();
	createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dog1);
  dog.scale=0.2;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  foodStock=database.ref("Food");
   foodStock.on("value",readStock);

   fedTime=database.ref('FeedTime');
   fedTime.on("value",function(data){
     lastFed=data.val();
   });
}


function draw() {  

  background(46, 139, 87);


  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(dog2)
  }

  function display(){

  }
  drawSprites();


textSize(30);
fill("red");
text("Note please press UP_ARROW to feed food");

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+ lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : 12 AM",350,30); 
}else{
  text("Last Feed : "+ lastFed + "AM",350,30);
}

}
 
  //add styles here






//function to Read values from DB
function readStock(data){
  foods=data.val();
}

//function to write values DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
//function to update food stock and last fed time 
function feedDog(){
dog.addimage(dog2);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})
}

//function to add food in stock 
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

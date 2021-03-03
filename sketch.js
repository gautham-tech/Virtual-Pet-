var dogImg, happyDogImg;
var database, foodStock;
var dog;
var foodStock, foodS;

function preload()
{
   dogImg = loadImage("dogImg.png");
   happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.15

  foodStock=database.ref('Food')
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46,139,87);

  drawSprites();
textSize(14)
fill("white")
text("Press Up Arrow Key To Feed Drago Milk",10,50)
text("Food Remaining :"+foodS,10,70)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS)
  dog.addImage(happyDogImg)
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg)
}

}


function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

# sequelize db:create
sequelize model:generate --name Player --attributes username:string,password:string,experience:integer,level:integer,money:integer
sequelize model:generate --name Game --attributes attackerId:integer,defenderId:integer,attack:integer,defend:integer,counter:integer
sequelize model:generate --name Property --attributes name:string,price:integer
sequelize model:generate --name Item --attributes name:string,type:string,power:integer,price:integer,mlvl:integer,img:string
sequelize model:generate --name PlayerItem --attributes playerId:integer,itemId:integer
sequelize model:generate --name PlayerProperty --attributes playerId:integer,propertyId:integer
sequelize model:generate --name PlayerMessage --attributes sender:integer,receiver:integer,message:string
sequelize db:migrate


//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB')

const itemSchema = {
  name: String
}

const Item = mongoose.model('Item', itemSchema);

const listSchema = {
  name: String,
  items: [itemSchema]
}

const List = mongoose.model('List', listSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defauktItems = [item1, item2, item3];


app.get("/", async function (req, res) {

  const items = await Item.find();
  if (items.length === 0) {
    Item.insertMany(defauktItems)
    res.redirect('/');
  } else {

    res.render("list", { listTitle: 'Today', newListItems: items });
  }


});

app.post("/", async function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.listName;
  const item = new Item({
    name: itemName
  });

  if (listName === 'Today') {
    await item.save();
    res.redirect('/');
  }
  else {
    const list = await List.findOne({ name: listName });
    list.items.push(item);
    await list.save();
    res.redirect(`/${listName}`);
  }
});

app.post("/delete", async function (req, res) {
  const itemID = req.body.itemID;
  const listName = req.body.listName;
  if (listName === 'Today') {
    await Item.findByIdAndDelete(itemID);
    res.redirect('/');
  } else {
    await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemID } } });
    res.redirect(`/${listName}`);
  }

});

app.get("/:customListName", async function (req, res) {
  let listName = _.capitalize(req.params.customListName);
  const list = await List.findOne({ name: listName });
  if (!list) {
    const list = new List({
      name: listName,
      items: defauktItems
    });
    await list.save();
    res.redirect(`/${listName}`);
  }
  else {
    res.render("list", { listTitle: listName, newListItems: list.items });
  }

});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

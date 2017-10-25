var Set = function() {
  var set = Object.create(setPrototype);
  set._table = new HashTable();
  return set;
};

var setPrototype = {};

// time complexity: linear
setPrototype.add = function(item) {
  var itemToString = item.toString();
  var index = getIndexBelowMaxForKey(itemToString, this._table._limit);
  if (!this._table._storage.get(index)) {
    this._table.insert(itemToString, itemToString);
  }
};

// time complexity: linear
setPrototype.contains = function(item) {
  var itemToString = item.toString();
  var index = getIndexBelowMaxForKey(itemToString, this._table._limit);
  return this._table.retrieve(itemToString) ? true : false;
};

// time complexity: linear
setPrototype.remove = function(item) {
  var itemToString = item.toString();
  this._table.remove(itemToString);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
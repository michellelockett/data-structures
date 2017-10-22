var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = [];
  return set;
};

var setPrototype = {};

// time complexity: linear
setPrototype.add = function(item) {
  if (!this._storage.includes(item)) {
    this._storage.push(item);
  }
};

// time complexity: linear
setPrototype.contains = function(item) {
  return this._storage.includes(item);
};

// time complexity: linear
setPrototype.remove = function(item) {
  this._storage.splice(this._storage.indexOf(item), 1);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
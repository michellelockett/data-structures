var Stack = function() {
  this.storage = {};
};

Stack.prototype.push = function(value) {
  var index = this.size();
  this.storage[index] = value;
}

Stack.prototype.pop = function() {
  var index = this.size() - 1;
  var value = this.storage[index];
  delete this.storage[index];
  return value;
}

Stack.prototype.size = function() {
  return Object.keys(this.storage).length;
}

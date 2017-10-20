var Stack = function() {
  var newInstance = Object.create(stackMethods);
  newInstance.storage = {};
  return newInstance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  var index = this.size();
  this.storage[index] = value;
};

stackMethods.size = function() {
  return Object.keys(this.storage).length;
};

stackMethods.pop = function() {
  var index = this.size() - 1;
  var value = this.storage[index];
  delete this.storage[index];
  return value;
};





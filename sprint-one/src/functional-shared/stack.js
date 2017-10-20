var Stack = function() {
  var newInstance = {};
  newInstance.storage = {};
  //extend the methods to the new class
  _.extend(newInstance, stackMethods);

  return newInstance;
};

var stackMethods = {};

stackMethods.push = function(value) {
  var index = this.size();
  this.storage[index] = value;
}

stackMethods.pop = function() {
  var top = this.size() - 1;
  var value = this.storage[top];
  delete this.storage[top];
  return value;
}

stackMethods.size = function() {
  return Object.keys(this.storage).length;
}

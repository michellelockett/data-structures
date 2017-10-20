var Queue = function() {
  var newInstance = {};
  newInstance.storage = {};
  newInstance.key = 0;
  newInstance.nextInLine = 0;
  _.extend(newInstance, queueMethods);
  return newInstance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  var key = this.key;
  this.storage[key] = value;
  this.key ++;
}

queueMethods.dequeue = function() {
  var nextInLine = this.nextInLine;
  var value = this.storage[nextInLine];
  delete this.storage[nextInLine];
  this.nextInLine++;
  return value;
}

queueMethods.size = function() {
  return Object.keys(this.storage).length;
}



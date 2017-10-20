var Queue = function() {
  var newInstance = Object.create(queueMethods);
  newInstance.storage = {};
  newInstance.key = 0;
  newInstance.nextInLine = 0;
  return newInstance;
};

var queueMethods = {};

queueMethods.enqueue = function(value) {
  this.storage[this.key] = value;
  this.key++;
}

queueMethods.dequeue = function() {
  var value = this.storage[this.nextInLine];
  delete this.storage[this.nextInLine];
  this.nextInLine++;
  return value;
}

queueMethods.size = function() {
  return Object.keys(this.storage).length;
}


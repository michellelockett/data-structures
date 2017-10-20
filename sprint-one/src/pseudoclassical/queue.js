var Queue = function() {
  this.storage = {};
  this.key = 0;
  this.nextInLine = 0;
};

Queue.prototype.size = function() {
  return Object.keys(this.storage).length;
}

Queue.prototype.enqueue = function(value) {
  this.storage[this.key] = value;
  this.key++;
}

Queue.prototype.dequeue = function() {
  var value = this.storage[this.nextInLine];
  delete this.storage[this.nextInLine];
  this.nextInLine++;
  return value;
}



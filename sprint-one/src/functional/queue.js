var Queue = function() {
  var someInstance = {};
  var key = 0;
  var nextInLine = 0;

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[key] = value;
    key++;
  };

  someInstance.dequeue = function() {
    var value = storage[nextInLine];
    delete storage[nextInLine]
    nextInLine++
    return value;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };

  return someInstance;
};


var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function(value) {
    var length = someInstance.size();
    storage[length] = value;
  };

  someInstance.pop = function() {
    var key = someInstance.size() - 1;
    var value = storage[key];
    delete storage[key];
    return value;
  };

  someInstance.size = function() {
    return Object.keys(storage).length;
  };
  return someInstance;
};

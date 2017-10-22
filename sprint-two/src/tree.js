var Tree = function(value) {
  var newTree = {};
  extend(newTree, treeMethods);
  newTree.value = value;

  // your code here
  newTree.children = [];
  return newTree;
};

var extend = function(obj1, obj2) {
  for (var key in obj2) {
    obj1[key] = obj2[key];
  }
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);
  //console.log("we are adding ", child);
  this.children.push(child);
};

treeMethods.contains = function(target) {
  var traverseTree = function(node) {
    if (node.value === target) {
      return true;
    }

    if (node.value !== target && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        if (traverseTree(node.children[i])) {
          return true;
        }
      }
    }

    return false;
  };
  return traverseTree(this);
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

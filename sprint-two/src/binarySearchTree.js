//time complexity constant
var BinarySearchTree = function(value) {
  // create a root
  var newTree = {};
  extend(newTree, newTreeMethods);
  newTree.value = value;
  newTree.right = null;
  newTree.left = null;

  // keep track of nodes in order to balance
  newTree.children = [];

  // deal with balance
  return newTree;

};

var newTreeMethods = {};

var extend = function(obj1, obj2) {
  for (var item in obj2) {
    obj1[item] = obj2[item];
  }
};

//time complexity O(logn)
newTreeMethods.insert = function(value) {

  if (value < this.value) {
    if (this.left === null) {
      this.left = BinarySearchTree(value);
    } else {
      this.left.insert(value);
    }
  } else if (value > this.value) {
    if (this.right === null) {
      this.right = BinarySearchTree(value);
    } else {
      this.right.insert(value);
    }
  }
};
//time complexity O(logn)
newTreeMethods.contains = function(value) {
  // base case

  if (this.value === value) {
    return true;
  } else {
    if (value < this.value && this.left !== null) {
      return this.left.contains(value);
    } else if (value > this.value && this.right !== null) {
      return this.right.contains(value);
    }
  }
  return false;
};
//time complexity n, additional time complexity would depend on the complexity of the callback function
newTreeMethods.depthFirstLog = function(callback) {

  var traverseTree = function(tree) {
    callback(tree.value);
    //base case
    if (tree.left === null && tree.right === null) {
      return;
    } else {
      if (tree.left) {
        traverseTree(tree.left);
      }
      if (tree.right) {
        traverseTree(tree.right);
      }
    }
  };
  return traverseTree(this);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

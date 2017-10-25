//time complexity constant
var Tree = function(value) {
  var newTree = {};
  extend(newTree, treeMethods);
  newTree.value = value;
  newTree.parent = null;
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

//time complexity O(n)
treeMethods.removeFromParent = function(value) {

  var traverseTree = function(node) {
    if (node.value === value) {
      var children = node.parent.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i].value === value) {
          children.splice(i, 1);
        }
      }
    }

    if (node.value !== value && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        traverseTree(node.children[i]);
      }
    }
  };

  return traverseTree(this);
};

//time complexity constant
treeMethods.addChild = function(value) {
  var child = Tree(value);
  child.parent = this;
  this.children.push(child);
};

//time complexity O(n)
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

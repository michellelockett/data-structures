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

treeMethods.traverseTree = function(node, callback) {
  callback(node);
  var children = node.children;
  for (var i = 0; i < children.length; i++) {
    node.traverseTree(children[i], callback);
  }
};

//time complexity O(n)
treeMethods.removeFromParent = function(value) {
  var callback = function(node) {
    if (node.value === value) {
      var children = node.parent.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i].value === value) {
          children.splice(i, 1);
        }
      }
    }
  }
  this.traverseTree(this, callback);
};

//time complexity constant
treeMethods.addChild = function(value) {
  var child = Tree(value);
  child.parent = this;
  this.children.push(child);
};

//time complexity O(n)
treeMethods.contains = function(target) {
  var isTrue = false;
  var checkValue = function(node) {
    if (node.value === target) {
      isTrue = true;
    }
  }
  this.traverseTree(this, checkValue);
  return isTrue;
};


/*
 * Complexity: What is the time complexity of the above functions?
 */

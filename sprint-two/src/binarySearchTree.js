
//time complexity constant
var BinarySearchTree = function(value) {
  // create a root
  var newTree = {};
  extend(newTree, newTreeMethods);
  newTree.value = value;
  newTree.right = null;
  newTree.left = null;
  newTree.parent = null;
  newTree.depth = 0;
  newTree.balance = 'a';

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
  var newTree = BinarySearchTree(value);
  if (value < this.value) {
    if (this.left === null) {
      this.left = newTree;
      newTree.parent = this;
      newTree.depth = this.depth + 1;
    } else {
      this.left.insert(value);
    }
  } else if (value > this.value) {
    if (this.right === null) {
      this.right = newTree;
      newTree.parent = this;
      newTree.depth = this.depth + 1;
    } else {
      this.right.insert(value);
    }
  }

  this.checkDepth();
  // if (this.balance === 'a') {
  //   this.checkDepth();
  // }
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
newTreeMethods.depthFirstLog = function(callback, tree) {
  callback(tree);
  //base case
  if (tree.left === null && tree.right === null) {
    return;
  } else {
    if (tree.left) {
      this.depthFirstLog(callback, tree.left);
    }
    if (tree.right) {
      this.depthFirstLog(callback, tree.right);
    }
  }
};

newTreeMethods.checkDepth = function() {
  //a way to track the max an min depth of the tree at the time this function is called
  var depth = {
    max: 0,
    min: 0
  };

  var localMin = 10000;
  //callback function to update the depth object
  var checkMax = function(tree) {
    if (tree.depth > depth.max) {
      depth.max = tree.depth;
    }
  };
  //callback function to update the depth object
  var checkMin = function(tree) {
    if (tree.left === null && tree.right === null) {
      if (tree.depth < localMin) {
        depth.min = tree.depth;
        localMin = tree.depth;
      }
    }
  };

  this.depthFirstLog(checkMax, this);
  this.depthFirstLog(checkMin, this);

  //the condition under which we need to rebalance the tree
  var doubleMin = depth.min * 2;
  if (depth.max > doubleMin && depth.min !== 0) {
    this.rebalance();
  }

  return depth;
};



var middleOfArray = function(array) {
  var middle = Math.floor(array.length / 2);
  return {
    value: array[middle],
    left: array.slice(0, middle),
    right: array.slice(middle + 1)
  };
};

newTreeMethods.rebalance = function(tree) {
  // var changeBalance = function(tree) {
  //   tree.balance = 'b';
  // };

  // this.depthFirstLog(changeBalance, this);

  //an array to store the unbalanced tree's values
  var values = [];

  //get all the values from the unbalanced tree to store in values array
  var getNodes = function(tree) {
    values.push(tree.value);
  };
  this.depthFirstLog(getNodes, this);

  //sort the values array for relabalancing
  values.sort(function(a, b) {
    return a - b;
  });

  //get the first object with a value, left array and right array
  //that will become the root of our new rebalanced tree
  var valuesObject = middleOfArray(values);

  //creating our new root of the rebalanced tree
  var newTree = BinarySearchTree(valuesObject.value);

  //always recursively grabs the middle value of each array for optimal
  //balance in insertion

  var recursiveRebalance = function(array) {
    //base case left or right array is length 1
    if (array.length === 1) {
      newTree.insert(array[0]);
      return;
    } else {
      var newArray = middleOfArray(array);
      if (newTree.value !== newArray.value) {
        newTree.insert(newArray.value);
      }
      if (newArray.right.length > 0) {
        recursiveRebalance(newArray.right);
      }
      if (newArray.left.length > 0) {
        recursiveRebalance(newArray.left);
      }
    }
  };

  recursiveRebalance(values);

  tree = newTree;
  return tree;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */

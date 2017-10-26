//conditions for when a rebalancing is necessary
  //when max depth is more than 2 times the min depth


//rebalancing

// we need to store an array with all values --> array of nodes
// we need to have access to the length of the left side of root tree
// access to the length of the right side of the tree

   //          root
   //      10         20
   //    8    11    25    19
   //  7  9       x    x      x
   // 4 7.1                      x
   //                                x

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
      this.root = true;
    } else {
      this.left.insert(value);
    }
  } else if (value > this.value) {
    if (this.right === null) {
      this.right = newTree;
      newTree.parent = this;
      newTree.depth = this.depth + 1;
      this.root = true;
    } else {
      this.right.insert(value);
    }
  }

  this.checkDepth();
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
  var depth = {
    max: 0,
    min: 0
  }

  var checkMax = function(tree) {
    if (tree.depth > depth.max) {
      depth.max = tree.depth;
    };
  };

  var localMin = 10000;

  var checkMin = function(tree) {

    console.log("depth.min = ", depth.min);
    if (tree.left === null && tree.right === null) {
      if (tree.depth < localMin) {
        console.log('found a leaf');
        depth.min = tree.depth;
        localMin = tree.depth;
      }
    }
  };

  this.depthFirstLog(checkMin, this);
  this.depthFirstLog(checkMax, this);
  console.log(depth);

  var doubleMin = depth.min * 2;
  if (depth.max > doubleMin && depth.min !== 0) {
    //this.rebalance();
    console.log('say hello');
  }

}

newTreeMethods.rebalance = function() {
  var tree = this;
  var values = [];
  var getNodes = function(tree) {
    values.push(tree.value);
  }
  this.depthFirstLog(getNodes, this);

  values.sort(function(a, b) {
    return a - b;
  });

  var middleOfArray = function(array) {
    var middle = Math.floor(array.length / 2);
    return {
      value: array[middle],
      left: array.slice(0, middle),
      right: array.slice(middle + 1)
    };
  };

  var valuesObject = middleOfArray(values);
  var newTree = BinarySearchTree(valuesObject.value);

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
      recursiveRebalance(newArray.right);
      recursiveRebalance(newArray.left);
    }
  }

  recursiveRebalance(values);

  return newTree;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */

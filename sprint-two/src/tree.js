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
  //currentNode = currentNode || this;
  var traverseTree = function(node) {
    var isTrue = false;
    if (node.value === target) {
      return true;
    }

    if (node.value !== target && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) {
        if( traverseTree(node.children[i])) {
          isTrue = true;
        }
      }
    }
    return isTrue;
  }
  traverseTree(this);
};



// var getElementsByClassName = function(className) {
//   //an array to store the elements that do contain the class name
//   var elementArray = [];

//   //a helper function to check if an element contains the class name and if so, push onto return array
//   var hasClassName = function(element) {
//     if(element.classList && element.classList.contains(className)) {
//       elementArray.push(element);
//     }
//   }

//   //a recursive function to walk the dom
//   function walkTheDOM(node, func) {
//     //call the passed in function on the inital node
//     func(node);
//     node = node.firstChild;
//     //continue calling the function on each first child.  If there is no first child, it will call the funciton on its next
//     //sibling, therefore traversing the entire DOM
//     while (node) {
//       walkTheDOM(node, func);
//       node = node.nextSibling;
//     }

//   }

//   walkTheDOM(document.body, hasClassName);

//   return elementArray;treeMethods.addChild = function(value) {
//   var child = Tree(value);
//   this.children.push(child);
// };

// treeMethods.contains = function(target) {

//   var traverseTree = function(target, currentNode) {
//     var children = currentNode.children;
//     //base case
//     if (currentNode.value === target) {
//       return true;
//     }

//     if (children.length > 0) {
//       for (var i = 0; i < children.length; i++) {
//         traverseTree(children[i]);
//         if (i < children.length - 1) {
//           currentNode = children[i+1];
//         } else {
//           return false;
//         }
//       }
//     }
//   }
//   traverseTree(this);
// };


// };


/*
 * Complexity: What is the time complexity of the above functions?
 */


var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  //time complexity constant

  list.addToTail = function(value) {
    var newNode = Node(value);
    if (list.head === null) {
      list.head = newNode;
      list.tail = newNode;
    } else {
      list.tail.next = newNode;
      list.tail = newNode;
    }
  };

  //time complexity constant

  list.removeHead = function() {
    var originalHead = list.head.value;
    list.head = list.head.next;
    return originalHead;
  };

  // time complexity O(n) linear

  list.contains = function(target, currentNode) {
    currentNode = currentNode || list.head;
    //check to see if the value at the current node is the target
    //base case value === target, return true
    if (currentNode.value === target) {
      return true;
    }
    //recursive case
    if (currentNode.next !== null) {
      currentNode = currentNode.next;
      return list.contains(target, currentNode);
    } else {
      return false;
    }
  };
  return list;
};

//time complexity constant
var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */

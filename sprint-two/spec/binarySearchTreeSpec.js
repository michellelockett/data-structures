describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(tree) { array.push(tree.value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.depthFirstLog(func, binarySearchTree);
    expect(array).to.eql([5, 2, 3, 7]);
  });

  it('should handle negative numbers as the root value', function() {
    binarySearchTree = BinarySearchTree(-5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.left).to.equal(null);
    expect(binarySearchTree.right).to.not.equal(null);
  });

  it('should keep a lineage of parent to children', function() {
    binarySearchTree = BinarySearchTree(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.left.parent.value).to.equal(5);
    expect(binarySearchTree.left.right.parent.value).to.equal(2);
    expect(binarySearchTree.right.parent.value).to.equal(5);
  });

  it('should keep a depth property for every new node', function() {
    binarySearchTree = BinarySearchTree(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.depth).to.not.equal(null);
    expect(binarySearchTree.depth).to.equal(0);
    expect(binarySearchTree.left.depth).to.equal(1);
    expect(binarySearchTree.right.depth).to.equal(1);
    expect(binarySearchTree.left.right.depth).to.equal(2);
  });

  it('should find a minimum depth and maximum depth', function() {
    binarySearchTree = BinarySearchTree(5);
    binarySearchTree.insert(2);
    binarySearchTree.insert(1);
    binarySearchTree.insert(3);
    binarySearchTree.insert(4);
    binarySearchTree.insert(7);
    var depth = binarySearchTree.checkDepth();
    expect(depth.min).to.equal(1);
    expect(depth.max).to.equal(3);
  });

  it('should rebalance a tree when maximum depth is twice minimum depth', function() {
    var valuesBefore = [];
    var before = function(tree) {
      valuesBefore.push(tree.value);
    };
    var valuesAfter = [];
    var after = function(tree) {
      valuesAfter.push(tree.value);
    };

    binarySearchTree = BinarySearchTree(50);
    binarySearchTree.insert(20, true);
    binarySearchTree.insert(10, true);
    binarySearchTree.insert(30, true);
    binarySearchTree.insert(70, true);
    var firstDepth = binarySearchTree.checkDepth();
    expect(firstDepth.max).to.equal(2);
    expect(firstDepth.min).to.equal(1);
    binarySearchTree.depthFirstLog(before, binarySearchTree);
    binarySearchTree.insert(40, true);
    binarySearchTree.depthFirstLog(after, binarySearchTree);
    valuesAfter.sort(function(a, b) {
      return a - b;
    });
    expect(valuesAfter[Math.floor(valuesAfter.length / 2)]).to.equal(binarySearchTree.value);
  });

  it ('should confirm BinarySearchTree has a breadthFirstLog method', function() {
    expect(binarySearchTree.breadthFirstLog).to.be.a('function');
  });

  it ('should call a callback function on each node using breadth first logging', function() {
    var array = [];
    var func = function(tree) { array.push(tree.value); };
    binarySearchTree.insert(3);
    binarySearchTree.insert(2);
    binarySearchTree.insert(7);
    binarySearchTree.insert(4);
    binarySearchTree.insert(1);
    binarySearchTree.breadthFirstLog(func, binarySearchTree);
    expect(array).to.eql([5, 3, 7, 2, 4, 1]);
  });
});

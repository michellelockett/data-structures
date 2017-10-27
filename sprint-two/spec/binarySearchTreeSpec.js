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
    binarySearchTree = BinarySearchTree(50);
    binarySearchTree.insert(20);
    binarySearchTree.insert(10);
    binarySearchTree.insert(30);
    binarySearchTree.insert(40);
    binarySearchTree.insert(70);
    binarySearchTree.insert(2);
    binarySearchTree.insert(8);
    binarySearchTree.insert(81);
    binarySearchTree.insert(99);
    binarySearchTree.insert(71);
    binarySearchTree.insert(75);
    binarySearchTree.insert(76);
    binarySearchTree.insert(77);
    binarySearchTree.insert(78);
    binarySearchTree.insert(79);
    var firstDepth = binarySearchTree.checkDepth();
    expect(firstDepth.max).to.equal(8);
    expect(firstDepth.min).to.equal(3);
    var someTree = binarySearchTree.rebalance(this);
    var depth = someTree.checkDepth();
    expect(depth.max).to.equal(4);
    expect(depth.min).to.equal(3);
  });
});

describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree('root');
  });

  it('should have methods named "addChild" and "contains", and a property named "value"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it('should verify children in children array are Tree objects', function() {
    tree.addChild(5);
    tree.addChild(6);
    for (var i = 0; i < tree.children.length; i++) {
      expect(typeof tree.children[i]).to.eq('object');
    }
  });

  it('should have a root node with a parent value of null', function() {
    expect(tree.parent).to.equal(null);
  });

  it('should update a parent value when adding a child node', function() {
    tree.addChild(5);
    tree.children[0].addChild(9);

    expect(tree.children[0].parent.value).to.equal('root');
    expect(tree.children[0].children[0].parent.value).to.equal(5);
  });

  it('should remove a node and all its children', function() {
    tree.addChild(7);
    tree.addChild(4);
    tree.addChild(5);
    tree.children[0].addChild(9);
    tree.removeFromParent(7);

    expect(tree.children.length).to.equal(2);
    expect(tree.children[0].value).to.equal(4);
    expect(tree.contains(7)).to.equal(false);
    expect(tree.contains(9)).to.equal(false);
  });

  it('should execute a callback function on every node', function() {
    var double = function(node) {
      node.value = node.value * 2;
    }

    tree.addChild(7);
    tree.addChild(4);
    tree.addChild(5);
    tree.children[0].addChild(9);
    tree.traverseTree(tree, double);

    expect(tree.children[0].value).to.equal(14);
    expect(tree.children[1].value).to.equal(8);
    expect(tree.children[2].value).to.equal(10);
    expect(tree.children[0].children[0].value).to.equal(18);
  });
});

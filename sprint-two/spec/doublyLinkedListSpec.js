describe('doublyLinkedList', function() {
  var doublyLinkedList;

  beforeEach(function() {
    doublyLinkedList = DoublyLinkedList();
  });

  it('should have a head and tail', function() {
    expect(doublyLinkedList).to.have.property('head');
    expect(doublyLinkedList).to.have.property('tail');
  });

  it('should have methods named "addToTail", "removeHead", and "contains"', function() {
    expect(doublyLinkedList.addToTail).to.be.a('function');
    expect(doublyLinkedList.removeHead).to.be.a('function');
    expect(doublyLinkedList.contains).to.be.a('function');
  });

  it('should designate a new tail when new nodes are added', function() {
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.tail.value).to.equal(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.tail.value).to.equal(5);
  });

  it('should remove the head from the list when removeHead is called', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.head.value).to.equal(4);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.head.value).to.equal(5);
  });

  it('should return the value of the former head when removeHead is called', function() {
    doublyLinkedList.addToTail(3);
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.removeHead()).to.equal(3);
  });

  it('should contain a value that was added', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.contains(4)).to.equal(true);
    expect(doublyLinkedList.contains(5)).to.equal(true);
    expect(doublyLinkedList.contains(6)).to.equal(false);
  });

  it('should not contain a value that was removed', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.contains(4)).to.equal(false);
  });

  it('should contain a value when new node is added', function() {
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.tail.value).to.equal(5);
    doublyLinkedList.addToTail(25);
    expect(doublyLinkedList.tail.value).to.equal(25);
  });

  it('should contain a property of previous for each new node', function() {
    doublyLinkedList.addToTail(5);
    doublyLinkedList.addToTail(6);
    expect(doublyLinkedList.tail.previous).to.not.equal(null);
    expect(doublyLinkedList.tail.previous.value).to.equal(5);
  });

  it('should confirm previous value of head is null', function() {
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.tail.previous).to.equal(null);
  });

  it('should confirm previous value of new head is null when head is removed', function() {
    doublyLinkedList.addToTail(2);
    doublyLinkedList.addToTail(3);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.head.previous).to.equal(null);
  });

  it('should add a new node to head', function() {
    doublyLinkedList.addToTail(2);
    doublyLinkedList.addToTail(3);
    doublyLinkedList.addToHead(5);
    expect(doublyLinkedList.head.value).to.equal(5);
    expect(doublyLinkedList.head.next.value).to.equal(2);
  });

  it('should remove tail', function() {
    doublyLinkedList.addToTail(2);
    doublyLinkedList.addToTail(55);
    doublyLinkedList.addToTail(3);
    doublyLinkedList.removeTail();
    expect(doublyLinkedList.tail.value).to.equal(55);
  });
});
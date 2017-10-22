

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

// first time we call insert, we pass in 'val1' at index 0 [['val1', 'val1']]
// second time we call insert, we pass in 'val2' at index 0 [[[val1, val1], [val2, val2]]]
// expecting to return 'val1'
HashTable.prototype.insert = function(k, v) {
  var key = k; //a string
  var index = getIndexBelowMaxForKey(k, this._limit); //number
  var getValue = this._storage.get(index);
  if (getValue === undefined) {
    this._storage.set(index, [[k, v]]);
    return;
  }
  var added = false;
  this._storage.each(function(value, i, collection) {
    if (i === index) {

      for (var x = 0; x < collection[i].length; x++) {
        if (collection[i][x][0] === k) {
          collection[i][x][1] = v;
          added = true;
        }
      }
      if (!added) {
        collection[i].push([k, v]);
      }
    }

      //if there is something at that index, loop through each item in this array
        //check to see if the item[0] === k.  if it does, overwrite that value to be v
        //if none of the item[0] === k, then push [k, v] onto the array

  });
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);

  var result = this._storage.get(index);
  if (result.length === 1) {
    return result[0][1];
  } else {
    for (var i = 0; i < result.length; i++) {
      if (result[i][0] === k) {
        return result[i][1];
      }
    }
  }
  return undefined;
};

HashTable.prototype.remove = function(k) {
  console.log("k = ", k)
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._storage.each(function(value, i, collection) {
    if (index === i) {
      console.log(collection[i])
      for (var x = 0; x < collection[i].length; x++) {
        if (collection[i][x][0] === k) {
          console.log("collection i = ", collection[i])
          collection[i].splice(x, 1);
        }
      }
    }
  })
};



/*
 * Complexity: What is the time complexity of the above functions?
 */



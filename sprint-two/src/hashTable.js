
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
  if (getValue === undefined || getValue.length === 0) {
    this._storage.set(index, [[k, v]]);
  } else {
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
  }

  //check to see if the ratio is over 75% or under 25
  //only when we are not resizing the table
  var buckets = this.checkBuckets();
  if ((buckets / this._limit) >= .75) {
    this.resize('increase');
  }
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
  var index = getIndexBelowMaxForKey(k, this._limit);
  this._storage.each(function(value, i, collection) {
    if (index === i) {
      for (var x = 0; x < collection[i].length; x++) {
        if (collection[i][x][0] === k) {
          collection[i].splice(x, 1);
        }
      }
    }
  });

  //check to see if we need to half the table
  if (arguments.length === 1) {
    var buckets = this.checkBuckets();
    if ((buckets / this._limit) < .25) {
      this.resize('decrease');
    }
  }
};

HashTable.prototype.checkBuckets = function() {
  //use .each to check how many buckets have stuff in them
  var bucketsWithStuff = 0;
  this._storage.each(function(bucket, index) {
    if (Array.isArray(bucket) && bucket.length > 0) {
      bucketsWithStuff += 1;
    }
  });

  return bucketsWithStuff;
};

HashTable.prototype.resize = function(type) {
  var keysAndValues = [];
  var hashTable = this;
  //getting all key/value pairs in the original hashtable
  this._storage.each(function(bucket) {
    if (Array.isArray(bucket)) {
      for (var i = 0; i < bucket.length; i++) {
        keysAndValues.push(bucket[i]);
      }
    }
  });

  //removing all key/value pairs from hashtable
  keysAndValues.forEach(function(pair) {
    hashTable.remove(pair[0], 'secondArgument');
  });

  // //half the limit
  if (type === 'decrease') {
    console.log('need to decrease');
    this._limit = this._limit / 2;
    this._storage = LimitedArray(this._limit);
  }
  // //double the limit
  if (type === 'increase') {
    this._limit = this._limit * 2;
    this._storage = LimitedArray(this._limit);
  }

  //re-insert && re-hash each element
  for (var j = 0; j< keysAndValues.length; j++) {
    hashTable.insert(keysAndValues[j][0], keysAndValues[j][1]);
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 */



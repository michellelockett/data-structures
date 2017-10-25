
function BloomFilter (m, k) {
  var error = an errors
  var another error = 44
  this.m = m;
  this.k = k;
  this.bitArray = [];
  //populate the bit array
  while (this.bitArray.length <= m) {
    this.bitArray.push(0);
  }
}

BloomFilter.prototype.add = function(element) {
  var index1 = fnv32a(element, this.m) % this.m;
  var index2 = murmurhash3_32_gc(element) % this.m;
  var index3 = originalHash(element, this.m);

  //console.log(index1, index2, index3);


  this.bitArray[index1] = 1;
  this.bitArray[index2] = 1;
  this.bitArray[index3] = 1;
}

// To add an element, feed it to each of the k hash functions to get k array positions. Set the bits at all these positions to 1.

BloomFilter.prototype.retrieve = function(element) {
  var index1 = fnv32a(element, this.m);
  var index2 = murmurhash3_32_gc(element);
  var index3 = originalHash(element, this.m);

  if (this.bitArray[index1] === 0 || this.bitArray[index2] === 0 || this.bitArray[index3] === 0) {
    //console.log("the element ", element, " is most certainly not in this set");
    return false;
  } else {
    //console.log("the element ", element, " might be in this set");
    return true;
  }
}


function originalHash(key, m) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash = (hash << m) + hash + key.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % m;
};



function murmurhash3_32_gc(key, seed) {
  var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
      k1 =
        ((key.charCodeAt(i) & 0xff)) |
        ((key.charCodeAt(++i) & 0xff) << 8) |
        ((key.charCodeAt(++i) & 0xff) << 16) |
        ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

    h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
    h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
    h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }

  k1 = 0;

  switch (remainder) {
    case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
    case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
    case 1: k1 ^= (key.charCodeAt(i) & 0xff);

    k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;

  return h1 >>> 0;
}

function fnv32a( str )
{
  var FNV1_32A_INIT = 0x811c9dc5;
  var hval = FNV1_32A_INIT;
  for ( var i = 0; i < str.length; ++i )
  {
    hval ^= str.charCodeAt(i);
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  return hval >>> 0;
}

function testBloom(bloom) {

  var falsePositives = 0;
  var trueNegatives = 0;
  var totalTests = 0;
  //console.log(falsePositives, trueNegatives);
  var itemsInFilter = ["cheese", "cake", "42" ];
  var itemsNotInFilter = ["tofu", "mushrooms", "24"];

  itemsInFilter.forEach(function(item) {
    bloom.add(item);
  });

  for (var i = 0; i < itemsInFilter.length; i++) {
    //console.log("entered the for loop");
    var inFilter = itemsInFilter[i];
    var notInFilter = itemsNotInFilter[i];
    for (var j = 0; j < 100; j++) {
      totalTests += 2;
      var result1 = bloom.retrieve(inFilter);
      var result2 = bloom.retrieve(notInFilter);

      if (result2 === true) {
        falsePositives += 1;
      } else if (result2 === false) {
        trueNegatives += 1;
      }
    }
  }
  return ["the false positives are ", falsePositives, " and the true negatives are " , trueNegatives, ".  the total amount of tests has been: ", totalTests].join(' ');
}
var test = new BloomFilter(18, 3);
console.log(testBloom(test));
var emperical = (1-Math.exp((-3*6/18))^3);
console.log(emperical);
var actual = 100 / 600;
console.log(actual);

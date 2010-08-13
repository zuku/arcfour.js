/*
 Copyright (c) 2010 Takayuki Ogiso
  
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var ArcFour = function(keyArray) {
    this.sBox = [];
    this.initialize(keyArray);
};

ArcFour.prototype.initialize = function(keyArray) {
    var i, j = 0;
    var temp;
    var sBox2 = [];

    for (i = 0; i < 256; i++) {
        this.sBox[i] = i;
        sBox2[i] = keyArray[i % keyArray.length];
    }
    for (i = 0; i < 256; i++) {
        j = (j + this.sBox[i] + sBox2[i]) % 256;
        temp = this.sBox[i];
        this.sBox[i] = this.sBox[j];
        this.sBox[j] = temp;
    }
};

ArcFour.prototype.encrypt = function(dataArray) {
    var i;
    var x = 0, y = 0;
    var sx, sy;
    var k;
    var outputs = [];

    for (i = 0; i < dataArray.length; i++) {
        x = (x + 1) % 256;
        sx = this.sBox[x];
        y = (sx + y) % 256;
        sy = this.sBox[y];
        this.sBox[y] = sx;
        this.sBox[x] = sy;
        k = this.sBox[(sx + sy) % 256];
        outputs[i] = dataArray[i] ^ k;
    }
    return outputs;
};

ArcFour.prototype.decrypt = function(encryptedDataArray) {
    return this.encrypt(encryptedDataArray);
};

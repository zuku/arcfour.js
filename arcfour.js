
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

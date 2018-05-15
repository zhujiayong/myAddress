"use strict";

var AddressModel = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.platform = obj.platform;
        this.address = obj.address;
        this.tokenName = obj.tokenName;
    }
    else {
        this.platform = "";
        this.address = "";
        this.tokenName = "";
    }
};
AddressModel.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
}

var Addresses = function (text) {
    if (this.addressModels == null) {
        this.addressModels = new Array();
    }
    if (text) {
        var obj = JSON.parse(text);

        var array = this.addressModels
        obj.addressModels.map(function (item) {
            array.push(item);
        });
    }
}
Addresses.prototype = {
    toString: function () {
        return JSON.stringify(this);
    },
    push: function (obj) {
        this.addressModels.push(obj)
    }
}

var AddressIO = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new Addresses(text);
        },
        stringify: function (obj) {
            return obj.toString();
        }
    });
};

AddressIO.prototype = {
    init: function () { },
    get: function (nickname) {
        nickname = nickname.trim();
        if (nickname == "") {
            throw new Error("昵称错误");
        }
        return this.repo.get(nickname);
    },
    save: function (nickname, platform, tokenName, address) {
        nickname = nickname.trim();
        tokenName = tokenName.trim();
        platform = platform.trim();
        address = address.trim();
        if (nickname == "") {
            throw new Error("昵称错误");
        }
        if (tokenName == "") {
            throw new Error("通证名错误");
        }
        if (platform == "") {
            throw new Error("平台名错误");
        }
        if (address == "") {
            throw new Error("地址错误");
        }
        var model = new AddressModel();
        model.platform = platform;
        model.address = address;
        model.tokenName = tokenName;

        var models = this.repo.get(nickname);
        if (models == null) {
            models = new Addresses()
        }
        var hasold = false;
        //判断是否有相同的 平台 币种
        for (var i = 0; i < models.length; i++) {
            if (models[i].platform == model.platform && models[i].tokenName == model.tokenName) {
                models[i].address = model.address;
                hasold = true;
                break;
            }
        }
        if (!hasold)
            models.push(model);
        this.repo.put(nickname, models)
        return models ;
    }
};
module.exports = AddressIO;

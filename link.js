class Link{
    constructor(id, name, link, pLanguage) {
        this._id = id;
        this._name = name;
        this._link = link;
        this._pLanguage = pLanguage; 
    }
    set id(value) {
        this._id = value;
    }
    get id() {
        return this._id;
    }
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    set link(value) {
        this._link = value;
    }
    get link() {
        return this._link;
    }
    set pLanguage(value) {
        this._pLanguage = value;
    }
    get pLanguage() {
        return this._pLanguage;
    }
}

module.exports = Link;
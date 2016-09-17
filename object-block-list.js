"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var objects_service_1 = require('services/object-service/objects.service');
var object_block_1 = require('components/object-block/object-block');
var sortable_1 = require('components/sortable/sortable');
var slimscroll_1 = require('components/slimscroll/slimscroll');
var text_filter_1 = require('components/text-filter/text-filter');
var ObjectBlockList = (function () {
    function ObjectBlockList(_objectService) {
        var _this = this;
        this._objectService = _objectService;
        this.searchText = "Master";
        this.removeObject = function (id) {
            console.log("ID: ", id);
            console.log("Index: ", _this.objects.findIndex(function (item) { return item.ObjectID === id; }));
            _this.objects = _this.objects.filter(function (obj) {
                return obj.ObjectID !== id;
            });
        };
    }
    ObjectBlockList.prototype.sort = function (obj) {
        this.objects.splice(obj.endIndex, 0, this.objects.splice(obj.startIndex, 1)[0]);
        var updated_order = Array.from(this.objects, function (x) { return x.ObjectObjectJoinID; });
        console.log("Updated Order: ", updated_order);
        this._objectService.updateObjectRank(updated_order).subscribe(function (resp) { console.log(resp); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectBlockList.prototype, "objects", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectBlockList.prototype, "tree", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ObjectBlockList.prototype, "searchText", void 0);
    ObjectBlockList = __decorate([
        core_1.Component({
            selector: 'object-block-list',
            directives: [object_block_1.ObjectBlock, sortable_1.Sortable, slimscroll_1.Slimscroll],
            pipes: [text_filter_1.TextFilter],
            template: "\n\t\t<ul slimscroll [height]=\"tree?'':'100%'\" [sortable]=\"objects\" [ngClass]=\"{tree: tree}\" (changeOrder)=\"sort($event)\" wheel-step=\"3\">\n\t\t\t<li object-block *ngFor=\"let object of objects | TextFilter:searchText\" [object]=object (objectDeleted)=\"removeObject($event)\" attr.data-objectobjectjoinid=\"{{object.ObjectObjectJoinID}}\"></li>\n\t\t</ul>\n\t",
            styles: ["\n\t\tul {\n\t\t\tlist-style:\tnone;\n\t\t\tmargin: 0;\n\t\t\tpadding: 1px 5px 0 0;\n\t\t}\n\t\tul, li{     \n\t\t\tposition: relative;    \n\t\t}\n\t\t.tree {\n\t\t\tpadding-bottom: 5px;\n\t\t}\n\t\tli {\n\t\t\tpadding 0;\n\t\t}\n\t\t.tree > li {\n\t\t\tpadding: 0 0 0 10px;\n\t\t}\n\t\t/* chop off overflowing lines */\n\t\tul {\n\t\t\toverflow: hidden;\n\t\t}\n\t\t.tree li::before, li::after{\n\t\t\tcontent: '';\n\t\t\tposition: absolute;\n\t\t\tleft: 0;\n\t\t}\n\t\t/* horizontal line on inner list items */\n\t\t.tree li::before{\n\t\t\tborder-top: 1px solid #333;\n\t\t\ttop: 10px;\n\t\t\twidth: 10px;\n\t\t\theight: 0;\n\t\t}\n\t\t/* vertical line on list items */    \n\t\t.tree li::after{\n\t\t\tborder-left: 1px solid #333;\n\t\t\theight: 100%;\n\t\t\twidth: 0px;\n\t\t\ttop: -10px;\n\t\t}\n\t\t/* lower line on list items from the first level \n\t\t\t because they don't have parents */\n\t\t.tree > li::after{\n\t\t\ttop: 10px;\n\t\t}\n\t\t/* hide line from the last of the first level list items */\n\t\t.tree > li:last-child::after{\n\t\t\tdisplay:none;\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof objects_service_1.ObjectService !== 'undefined' && objects_service_1.ObjectService) === 'function' && _a) || Object])
    ], ObjectBlockList);
    return ObjectBlockList;
    var _a;
}());
exports.ObjectBlockList = ObjectBlockList;
//# sourceMappingURL=object-block-list.js.map
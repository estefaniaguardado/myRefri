"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* global $ */
var enterKeycode = 13;
function setQuantityInput(unitySelect) {
    var selectedOption = $(unitySelect).find(':selected').val();
    if (selectedOption === 'gram' || selectedOption === 'mililiter') {
        $('input#quantityInput').val(50);
        $('input#quantityInput').attr('step', 50);
        $('input#quantityInput').attr('max', 100000);
        $('input#quantityInput').attr('min', 50);
    }
    else {
        $('input#quantityInput').val(1);
        $('input#quantityInput').attr('step', 1);
        $('input#quantityInput').attr('max', 100);
        $('input#quantityInput').attr('min', 1);
    }
}
function setUnitySelect(units) {
    units.forEach(function (unit) {
        $('select#unitySelect').append($('<option>', {
            selected: false,
            value: unit,
            text: unit,
        }));
    });
    $('select#unitySelect option:eq(0)').prop('selected', true);
    setQuantityInput($('select#unitySelect'));
    $('li#unity').show();
    $('li#quantity').show();
    $('li#submitNewItem').show();
}
$('select#selectProducts').change(function createUnitsSelect() {
    var hasPreviousOptions = $('select#unitySelect').children('option').length > 0;
    if (hasPreviousOptions) {
        $('select#unitySelect option').remove();
    }
    var selectedOption = $(this).find(':selected').val();
    $.ajax({
        headers: { accept: 'application/json' },
        url: "/products/" + selectedOption,
        type: 'GET',
        success: function (data) {
            setUnitySelect(data.units);
        },
    });
});
$('select#unitySelect').change(function createQuantityInput() {
    setQuantityInput($(this));
    $('li#quantity').show();
});
$('form#itemForm').keypress(function enterSubmitEvent(e) {
    if (e.keyCode === enterKeycode) {
        e.preventDefault();
        $(this).parent().find('input#addItemButton').trigger('click');
    }
});
$('button#deleteItemButton').click(function deleteHandler(deleteEvent) {
    deleteEvent.preventDefault();
    var idItemToRemove = $(this).closest('.detailsItem').attr('id');
    $.ajax({
        url: "/item/" + idItemToRemove,
        type: 'DELETE',
        success: function () {
            $("div#" + idItemToRemove).remove();
        },
    });
});
function getDetailsItembyId(id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: { accept: 'application/json' },
            type: 'GET',
            url: "/item/" + id,
            success: function (data) {
                resolve(data);
            },
            error: function (e) {
                reject(e);
            },
        });
    });
}
function getDetailsProductItemById(id) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            headers: { accept: 'application/json' },
            type: 'GET',
            url: "/products/" + id,
            success: function (data) {
                resolve(data);
            },
            error: function (e) {
                reject(e);
            },
        });
    });
}
function setItemUnitySelect(item, product) {
    product.units.forEach(function (unit) {
        var isSelected;
        if (item.unity !== unit) {
            isSelected = false;
        }
        else {
            isSelected = true;
        }
        $('select#itemUnitySelect').append($('<option>', {
            selected: isSelected,
            value: unit,
            text: unit,
        }));
    });
}
function setItemQuantityInput(unity, quantity) {
    $('input#itemQuantityInput').val(quantity);
    if (unity === 'gram' || unity === 'mililiter') {
        $('input#itemQuantityInput').attr('step', 50);
        $('input#itemQuantityInput').attr('max', 100000);
        $('input#itemQuantityInput').attr('min', 50);
    }
    else {
        $('input#itemQuantityInput').attr('step', 1);
        $('input#itemQuantityInput').attr('max', 100);
        $('input#itemQuantityInput').attr('min', 1);
    }
}
$('button#modifyItemButton').click(function modifyHandler(event) {
    return __awaiter(this, void 0, void 0, function () {
        function saveChange(modalEvent) {
            modalEvent.preventDefault();
            var unityItem = $('select#itemUnitySelect').find(':selected').val();
            var quantityItem = $('input#itemQuantityInput').val();
            $.ajax({
                type: 'PUT',
                url: "/item/" + idItemSelected,
                data: { unityItem: unityItem, quantityItem: quantityItem },
                success: function () {
                    var contentItem = $("div#" + idItemSelected).contents();
                    contentItem.filter('#quantityDetailItem').contents().replaceWith(quantityItem);
                    contentItem.filter('#unityDetailItem').contents().replaceWith(unityItem);
                    $('#dialog-confirm').dialog('close');
                },
            });
        }
        function enterEvent() {
            $('#dialog-confirm').keypress(function enterKeyPress(e) {
                if (e.keyCode === enterKeycode) {
                    $(this).parent().find('button:contains(\'Save\')').trigger('click');
                }
            });
        }
        var idItemSelected, result, item, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    idItemSelected = $(this).closest('.detailsItem').attr('id');
                    return [4 /*yield*/, getDetailsItembyId(idItemSelected)];
                case 1:
                    result = _a.sent();
                    item = result['result'];
                    return [4 /*yield*/, getDetailsProductItemById(item.productId)];
                case 2:
                    product = _a.sent();
                    $('#modifyItemP').text(item.name);
                    $('select#itemUnitySelect option').remove();
                    setItemUnitySelect(item, product);
                    setItemQuantityInput(item.unity, item.quantity);
                    $('#dialog-confirm').dialog({
                        closeOnEscape: false,
                        resizable: false,
                        height: 'auto',
                        width: 400,
                        modal: true,
                        buttons: {
                            Save: saveChange,
                            Cancel: function cancelDialog() {
                                $(this).dialog('close');
                            },
                        },
                        open: enterEvent,
                    });
                    return [2 /*return*/];
            }
        });
    });
});
$('select#itemUnitySelect').change(function modifiedItemQuantitySelect() {
    var selectedOption = $(this).find(':selected').val();
    if (selectedOption === 'gram' || selectedOption === 'mililiter') {
        $('input#itemQuantityInput').val(50);
        $('input#itemQuantityInput').attr('step', 50);
        $('input#itemQuantityInput').attr('max', 100000);
        $('input#itemQuantityInput').attr('min', 50);
    }
    else {
        $('input#itemQuantityInput').val(1);
        $('input#itemQuantityInput').attr('step', 1);
        $('input#itemQuantityInput').attr('max', 100);
        $('input#itemQuantityInput').attr('min', 1);
    }
});

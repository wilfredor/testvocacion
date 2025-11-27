/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 553:
/***/ ((module) => {

(function(){
"use strict";
var doc = document;
var win = window;
var docEle = doc.documentElement;
var createElement = doc.createElement.bind(doc);
var div = createElement('div');
var table = createElement('table');
var tbody = createElement('tbody');
var tr = createElement('tr');
var isArray = Array.isArray, ArrayPrototype = Array.prototype;
var concat = ArrayPrototype.concat, filter = ArrayPrototype.filter, indexOf = ArrayPrototype.indexOf, map = ArrayPrototype.map, push = ArrayPrototype.push, slice = ArrayPrototype.slice, some = ArrayPrototype.some, splice = ArrayPrototype.splice;
var idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/;
var classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/;
var htmlRe = /<.+>/;
var tagRe = /^\w+$/;
// @require ./variables.ts
function find(selector, context) {
    var isFragment = isDocumentFragment(context);
    return !selector || (!isFragment && !isDocument(context) && !isElement(context))
        ? []
        : !isFragment && classRe.test(selector)
            ? context.getElementsByClassName(selector.slice(1).replace(/\\/g, ''))
            : !isFragment && tagRe.test(selector)
                ? context.getElementsByTagName(selector)
                : context.querySelectorAll(selector);
}
// @require ./find.ts
// @require ./variables.ts
var Cash = /** @class */ (function () {
    function Cash(selector, context) {
        if (!selector)
            return;
        if (isCash(selector))
            return selector;
        var eles = selector;
        if (isString(selector)) {
            var ctx = (isCash(context) ? context[0] : context) || doc;
            eles = idRe.test(selector) && 'getElementById' in ctx
                ? ctx.getElementById(selector.slice(1).replace(/\\/g, ''))
                : htmlRe.test(selector)
                    ? parseHTML(selector)
                    : find(selector, ctx);
            if (!eles)
                return;
        }
        else if (isFunction(selector)) {
            return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
        }
        if (eles.nodeType || eles === win)
            eles = [eles];
        this.length = eles.length;
        for (var i = 0, l = this.length; i < l; i++) {
            this[i] = eles[i];
        }
    }
    Cash.prototype.init = function (selector, context) {
        return new Cash(selector, context);
    };
    return Cash;
}());
var fn = Cash.prototype;
var cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`
fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools
if (typeof Symbol === 'function') { // Ensuring a cash collection is iterable
    fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}
function isCash(value) {
    return value instanceof Cash;
}
function isWindow(value) {
    return !!value && value === value.window;
}
function isDocument(value) {
    return !!value && value.nodeType === 9;
}
function isDocumentFragment(value) {
    return !!value && value.nodeType === 11;
}
function isElement(value) {
    return !!value && value.nodeType === 1;
}
function isBoolean(value) {
    return typeof value === 'boolean';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
function isUndefined(value) {
    return value === undefined;
}
function isNull(value) {
    return value === null;
}
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
function isPlainObject(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === null || proto === Object.prototype;
}
cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;
function each(arr, callback, _reverse) {
    if (_reverse) {
        var i = arr.length;
        while (i--) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    else if (isPlainObject(arr)) {
        var keys = Object.keys(arr);
        for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            if (callback.call(arr[key], key, arr[key]) === false)
                return arr;
        }
    }
    else {
        for (var i = 0, l = arr.length; i < l; i++) {
            if (callback.call(arr[i], i, arr[i]) === false)
                return arr;
        }
    }
    return arr;
}
cash.each = each;
fn.each = function (callback) {
    return each(this, callback);
};
fn.empty = function () {
    return this.each(function (i, ele) {
        while (ele.firstChild) {
            ele.removeChild(ele.firstChild);
        }
    });
};
function text(text) {
    if (isUndefined(text))
        return this[0] ? this[0].textContent : '';
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        ele.textContent = text;
    });
}
;
fn.text = text;
function extend() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
    }
    var deep = isBoolean(sources[0]) ? sources.shift() : false;
    var target = sources.shift();
    var length = sources.length;
    if (!target)
        return {};
    if (!length)
        return extend(deep, cash, target);
    for (var i = 0; i < length; i++) {
        var source = sources[i];
        for (var key in source) {
            if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
                if (!target[key] || target[key].constructor !== source[key].constructor)
                    target[key] = new source[key].constructor();
                extend(deep, target[key], source[key]);
            }
            else {
                target[key] = source[key];
            }
        }
    }
    return target;
}
cash.extend = extend;
fn.extend = function (plugins) {
    return extend(fn, plugins);
};
// @require ./type_checking.ts
var splitValuesRe = /\S+/g;
function getSplitValues(str) {
    return isString(str) ? str.match(splitValuesRe) || [] : [];
}
fn.toggleClass = function (cls, force) {
    var classes = getSplitValues(cls);
    var isForce = !isUndefined(force);
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        each(classes, function (i, c) {
            if (isForce) {
                force ? ele.classList.add(c) : ele.classList.remove(c);
            }
            else {
                ele.classList.toggle(c);
            }
        });
    });
};
fn.addClass = function (cls) {
    return this.toggleClass(cls, true);
};
fn.removeAttr = function (attr) {
    var attrs = getSplitValues(attr);
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        each(attrs, function (i, a) {
            ele.removeAttribute(a);
        });
    });
};
function attr(attr, value) {
    if (!attr)
        return;
    if (isString(attr)) {
        if (arguments.length < 2) {
            if (!this[0] || !isElement(this[0]))
                return;
            var value_1 = this[0].getAttribute(attr);
            return isNull(value_1) ? undefined : value_1;
        }
        if (isUndefined(value))
            return this;
        if (isNull(value))
            return this.removeAttr(attr);
        return this.each(function (i, ele) {
            if (!isElement(ele))
                return;
            ele.setAttribute(attr, value);
        });
    }
    for (var key in attr) {
        this.attr(key, attr[key]);
    }
    return this;
}
fn.attr = attr;
fn.removeClass = function (cls) {
    if (arguments.length)
        return this.toggleClass(cls, false);
    return this.attr('class', '');
};
fn.hasClass = function (cls) {
    return !!cls && some.call(this, function (ele) { return isElement(ele) && ele.classList.contains(cls); });
};
fn.get = function (index) {
    if (isUndefined(index))
        return slice.call(this);
    index = Number(index);
    return this[index < 0 ? index + this.length : index];
};
fn.eq = function (index) {
    return cash(this.get(index));
};
fn.first = function () {
    return this.eq(0);
};
fn.last = function () {
    return this.eq(-1);
};
// @require core/type_checking.ts
// @require core/variables.ts
function computeStyle(ele, prop, isVariable) {
    if (!isElement(ele))
        return;
    var style = win.getComputedStyle(ele, null);
    return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
}
// @require ./compute_style.ts
function computeStyleInt(ele, prop) {
    return parseInt(computeStyle(ele, prop), 10) || 0;
}
// @require css/helpers/compute_style_int.ts
function getExtraSpace(ele, xAxis) {
    return computeStyleInt(ele, "border".concat(xAxis ? 'Left' : 'Top', "Width")) + computeStyleInt(ele, "padding".concat(xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding".concat(xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border".concat(xAxis ? 'Right' : 'Bottom', "Width"));
}
// @require css/helpers/compute_style.ts
var defaultDisplay = {};
function getDefaultDisplay(tagName) {
    if (defaultDisplay[tagName])
        return defaultDisplay[tagName];
    var ele = createElement(tagName);
    doc.body.insertBefore(ele, null);
    var display = computeStyle(ele, 'display');
    doc.body.removeChild(ele);
    return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
}
// @require css/helpers/compute_style.ts
function isHidden(ele) {
    return computeStyle(ele, 'display') === 'none';
}
// @require ./cash.ts
function matches(ele, selector) {
    var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
    return !!matches && !!selector && matches.call(ele, selector);
}
// @require ./matches.ts
// @require ./type_checking.ts
function getCompareFunction(comparator) {
    return isString(comparator)
        ? function (i, ele) { return matches(ele, comparator); }
        : isFunction(comparator)
            ? comparator
            : isCash(comparator)
                ? function (i, ele) { return comparator.is(ele); }
                : !comparator
                    ? function () { return false; }
                    : function (i, ele) { return ele === comparator; };
}
fn.filter = function (comparator) {
    var compare = getCompareFunction(comparator);
    return cash(filter.call(this, function (ele, i) { return compare.call(ele, i, ele); }));
};
// @require collection/filter.ts
function filtered(collection, comparator) {
    return !comparator ? collection : collection.filter(comparator);
}
fn.detach = function (comparator) {
    filtered(this, comparator).each(function (i, ele) {
        if (ele.parentNode) {
            ele.parentNode.removeChild(ele);
        }
    });
    return this;
};
var fragmentRe = /^\s*<(\w+)[^>]*>/;
var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
var containers = {
    '*': div,
    tr: tbody,
    td: tr,
    th: tr,
    thead: table,
    tbody: table,
    tfoot: table
};
//TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably
function parseHTML(html) {
    if (!isString(html))
        return [];
    if (singleTagRe.test(html))
        return [createElement(RegExp.$1)];
    var fragment = fragmentRe.test(html) && RegExp.$1;
    var container = containers[fragment] || containers['*'];
    container.innerHTML = html;
    return cash(container.childNodes).detach().get();
}
cash.parseHTML = parseHTML;
fn.has = function (selector) {
    var comparator = isString(selector)
        ? function (i, ele) { return find(selector, ele).length; }
        : function (i, ele) { return ele.contains(selector); };
    return this.filter(comparator);
};
fn.not = function (comparator) {
    var compare = getCompareFunction(comparator);
    return this.filter(function (i, ele) { return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele); });
};
function pluck(arr, prop, deep, until) {
    var plucked = [];
    var isCallback = isFunction(prop);
    var compare = until && getCompareFunction(until);
    for (var i = 0, l = arr.length; i < l; i++) {
        if (isCallback) {
            var val_1 = prop(arr[i]);
            if (val_1.length)
                push.apply(plucked, val_1);
        }
        else {
            var val_2 = arr[i][prop];
            while (val_2 != null) {
                if (until && compare(-1, val_2))
                    break;
                plucked.push(val_2);
                val_2 = deep ? val_2[prop] : null;
            }
        }
    }
    return plucked;
}
// @require core/pluck.ts
// @require core/variables.ts
function getValue(ele) {
    if (ele.multiple && ele.options)
        return pluck(filter.call(ele.options, function (option) { return option.selected && !option.disabled && !option.parentNode.disabled; }), 'value');
    return ele.value || '';
}
function val(value) {
    if (!arguments.length)
        return this[0] && getValue(this[0]);
    return this.each(function (i, ele) {
        var isSelect = ele.multiple && ele.options;
        if (isSelect || checkableRe.test(ele.type)) {
            var eleValue_1 = isArray(value) ? map.call(value, String) : (isNull(value) ? [] : [String(value)]);
            if (isSelect) {
                each(ele.options, function (i, option) {
                    option.selected = eleValue_1.indexOf(option.value) >= 0;
                }, true);
            }
            else {
                ele.checked = eleValue_1.indexOf(ele.value) >= 0;
            }
        }
        else {
            ele.value = isUndefined(value) || isNull(value) ? '' : value;
        }
    });
}
fn.val = val;
fn.is = function (comparator) {
    var compare = getCompareFunction(comparator);
    return some.call(this, function (ele, i) { return compare.call(ele, i, ele); });
};
cash.guid = 1;
function unique(arr) {
    return arr.length > 1 ? filter.call(arr, function (item, index, self) { return indexOf.call(self, item) === index; }) : arr;
}
cash.unique = unique;
fn.add = function (selector, context) {
    return cash(unique(this.get().concat(cash(selector, context).get())));
};
fn.children = function (comparator) {
    return filtered(cash(unique(pluck(this, function (ele) { return ele.children; }))), comparator);
};
fn.parent = function (comparator) {
    return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};
fn.index = function (selector) {
    var child = selector ? cash(selector)[0] : this[0];
    var collection = selector ? this : cash(child).parent().children();
    return indexOf.call(collection, child);
};
fn.closest = function (comparator) {
    var filtered = this.filter(comparator);
    if (filtered.length)
        return filtered;
    var $parent = this.parent();
    if (!$parent.length)
        return filtered;
    return $parent.closest(comparator);
};
fn.siblings = function (comparator) {
    return filtered(cash(unique(pluck(this, function (ele) { return cash(ele).parent().children().not(ele); }))), comparator);
};
fn.find = function (selector) {
    return cash(unique(pluck(this, function (ele) { return find(selector, ele); })));
};
// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts
var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
var scriptTypeRe = /^$|^module$|\/(java|ecma)script/i;
var scriptAttributes = ['type', 'src', 'nonce', 'noModule'];
function evalScripts(node, doc) {
    var collection = cash(node);
    collection.filter('script').add(collection.find('script')).each(function (i, ele) {
        if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
            var script_1 = createElement('script');
            script_1.text = ele.textContent.replace(HTMLCDATARe, '');
            each(scriptAttributes, function (i, attr) {
                if (ele[attr])
                    script_1[attr] = ele[attr];
            });
            doc.head.insertBefore(script_1, null);
            doc.head.removeChild(script_1);
        }
    });
}
// @require ./eval_scripts.ts
function insertElement(anchor, target, left, inside, evaluate) {
    if (inside) { // prepend/append
        anchor.insertBefore(target, left ? anchor.firstChild : null);
    }
    else { // before/after
        if (anchor.nodeName === 'HTML') {
            anchor.parentNode.replaceChild(target, anchor);
        }
        else {
            anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
        }
    }
    if (evaluate) {
        evalScripts(target, anchor.ownerDocument);
    }
}
// @require ./insert_element.ts
function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
    each(selectors, function (si, selector) {
        each(cash(selector), function (ti, target) {
            each(cash(anchors), function (ai, anchor) {
                var anchorFinal = inverse ? target : anchor;
                var targetFinal = inverse ? anchor : target;
                var indexFinal = inverse ? ti : ai;
                insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
            }, reverseLoop3);
        }, reverseLoop2);
    }, reverseLoop1);
    return anchors;
}
fn.after = function () {
    return insertSelectors(arguments, this, false, false, false, true, true);
};
fn.append = function () {
    return insertSelectors(arguments, this, false, false, true);
};
function html(html) {
    if (!arguments.length)
        return this[0] && this[0].innerHTML;
    if (isUndefined(html))
        return this;
    var hasScript = /<script[\s>]/.test(html);
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        if (hasScript) {
            cash(ele).empty().append(html);
        }
        else {
            ele.innerHTML = html;
        }
    });
}
fn.html = html;
fn.appendTo = function (selector) {
    return insertSelectors(arguments, this, true, false, true);
};
fn.wrapInner = function (selector) {
    return this.each(function (i, ele) {
        var $ele = cash(ele);
        var contents = $ele.contents();
        contents.length ? contents.wrapAll(selector) : $ele.append(selector);
    });
};
fn.before = function () {
    return insertSelectors(arguments, this, false, true);
};
fn.wrapAll = function (selector) {
    var structure = cash(selector);
    var wrapper = structure[0];
    while (wrapper.children.length)
        wrapper = wrapper.firstElementChild;
    this.first().before(structure);
    return this.appendTo(wrapper);
};
fn.wrap = function (selector) {
    return this.each(function (i, ele) {
        var wrapper = cash(selector)[0];
        cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
    });
};
fn.insertAfter = function (selector) {
    return insertSelectors(arguments, this, true, false, false, false, false, true);
};
fn.insertBefore = function (selector) {
    return insertSelectors(arguments, this, true, true);
};
fn.prepend = function () {
    return insertSelectors(arguments, this, false, true, true, true, true);
};
fn.prependTo = function (selector) {
    return insertSelectors(arguments, this, true, true, true, false, false, true);
};
fn.contents = function () {
    return cash(unique(pluck(this, function (ele) { return ele.tagName === 'IFRAME' ? [ele.contentDocument] : (ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes); })));
};
fn.next = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};
fn.nextAll = function (comparator) {
    return this.next(comparator, true);
};
fn.nextUntil = function (until, comparator) {
    return this.next(comparator, true, until);
};
fn.parents = function (comparator, _until) {
    return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};
fn.parentsUntil = function (until, comparator) {
    return this.parents(comparator, until);
};
fn.prev = function (comparator, _all, _until) {
    return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};
fn.prevAll = function (comparator) {
    return this.prev(comparator, true);
};
fn.prevUntil = function (until, comparator) {
    return this.prev(comparator, true, until);
};
fn.map = function (callback) {
    return cash(concat.apply([], map.call(this, function (ele, i) { return callback.call(ele, i, ele); })));
};
fn.clone = function () {
    return this.map(function (i, ele) { return ele.cloneNode(true); });
};
fn.offsetParent = function () {
    return this.map(function (i, ele) {
        var offsetParent = ele.offsetParent;
        while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docEle;
    });
};
fn.slice = function (start, end) {
    return cash(slice.call(this, start, end));
};
// @require ./cash.ts
var dashAlphaRe = /-([a-z])/g;
function camelCase(str) {
    return str.replace(dashAlphaRe, function (match, letter) { return letter.toUpperCase(); });
}
fn.ready = function (callback) {
    var cb = function () { return setTimeout(callback, 0, cash); };
    if (doc.readyState !== 'loading') {
        cb();
    }
    else {
        doc.addEventListener('DOMContentLoaded', cb);
    }
    return this;
};
fn.unwrap = function () {
    this.parent().each(function (i, ele) {
        if (ele.tagName === 'BODY')
            return;
        var $ele = cash(ele);
        $ele.replaceWith($ele.children());
    });
    return this;
};
fn.offset = function () {
    var ele = this[0];
    if (!ele)
        return;
    var rect = ele.getBoundingClientRect();
    return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
    };
};
fn.position = function () {
    var ele = this[0];
    if (!ele)
        return;
    var isFixed = (computeStyle(ele, 'position') === 'fixed');
    var offset = isFixed ? ele.getBoundingClientRect() : this.offset();
    if (!isFixed) {
        var doc_1 = ele.ownerDocument;
        var offsetParent = ele.offsetParent || doc_1.documentElement;
        while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
            offsetParent = offsetParent.parentNode;
        }
        if (offsetParent !== ele && isElement(offsetParent)) {
            var parentOffset = cash(offsetParent).offset();
            offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
            offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
        }
    }
    return {
        top: offset.top - computeStyleInt(ele, 'marginTop'),
        left: offset.left - computeStyleInt(ele, 'marginLeft')
    };
};
var propMap = {
    /* GENERAL */
    class: 'className',
    contenteditable: 'contentEditable',
    /* LABEL */
    for: 'htmlFor',
    /* INPUT */
    readonly: 'readOnly',
    maxlength: 'maxLength',
    tabindex: 'tabIndex',
    /* TABLE */
    colspan: 'colSpan',
    rowspan: 'rowSpan',
    /* IMAGE */
    usemap: 'useMap'
};
fn.prop = function (prop, value) {
    if (!prop)
        return;
    if (isString(prop)) {
        prop = propMap[prop] || prop;
        if (arguments.length < 2)
            return this[0] && this[0][prop];
        return this.each(function (i, ele) { ele[prop] = value; });
    }
    for (var key in prop) {
        this.prop(key, prop[key]);
    }
    return this;
};
fn.removeProp = function (prop) {
    return this.each(function (i, ele) { delete ele[propMap[prop] || prop]; });
};
var cssVariableRe = /^--/;
// @require ./variables.ts
function isCSSVariable(prop) {
    return cssVariableRe.test(prop);
}
// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts
var prefixedProps = {};
var style = div.style;
var vendorsPrefixes = ['webkit', 'moz', 'ms'];
function getPrefixedProp(prop, isVariable) {
    if (isVariable === void 0) { isVariable = isCSSVariable(prop); }
    if (isVariable)
        return prop;
    if (!prefixedProps[prop]) {
        var propCC = camelCase(prop);
        var propUC = "".concat(propCC[0].toUpperCase()).concat(propCC.slice(1));
        var props = ("".concat(propCC, " ").concat(vendorsPrefixes.join("".concat(propUC, " "))).concat(propUC)).split(' ');
        each(props, function (i, p) {
            if (p in style) {
                prefixedProps[prop] = p;
                return false;
            }
        });
    }
    return prefixedProps[prop];
}
// @require core/type_checking.ts
// @require ./is_css_variable.ts
var numericProps = {
    animationIterationCount: true,
    columnCount: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true
};
function getSuffixedValue(prop, value, isVariable) {
    if (isVariable === void 0) { isVariable = isCSSVariable(prop); }
    return !isVariable && !numericProps[prop] && isNumeric(value) ? "".concat(value, "px") : value;
}
function css(prop, value) {
    if (isString(prop)) {
        var isVariable_1 = isCSSVariable(prop);
        prop = getPrefixedProp(prop, isVariable_1);
        if (arguments.length < 2)
            return this[0] && computeStyle(this[0], prop, isVariable_1);
        if (!prop)
            return this;
        value = getSuffixedValue(prop, value, isVariable_1);
        return this.each(function (i, ele) {
            if (!isElement(ele))
                return;
            if (isVariable_1) {
                ele.style.setProperty(prop, value);
            }
            else {
                ele.style[prop] = value;
            }
        });
    }
    for (var key in prop) {
        this.css(key, prop[key]);
    }
    return this;
}
;
fn.css = css;
function attempt(fn, arg) {
    try {
        return fn(arg);
    }
    catch (_a) {
        return arg;
    }
}
// @require core/attempt.ts
// @require core/camel_case.ts
var JSONStringRe = /^\s+|\s+$/;
function getData(ele, key) {
    var value = ele.dataset[key] || ele.dataset[camelCase(key)];
    if (JSONStringRe.test(value))
        return value;
    return attempt(JSON.parse, value);
}
// @require core/attempt.ts
// @require core/camel_case.ts
function setData(ele, key, value) {
    value = attempt(JSON.stringify, value);
    ele.dataset[camelCase(key)] = value;
}
function data(name, value) {
    if (!name) {
        if (!this[0])
            return;
        var datas = {};
        for (var key in this[0].dataset) {
            datas[key] = getData(this[0], key);
        }
        return datas;
    }
    if (isString(name)) {
        if (arguments.length < 2)
            return this[0] && getData(this[0], name);
        if (isUndefined(value))
            return this;
        return this.each(function (i, ele) { setData(ele, name, value); });
    }
    for (var key in name) {
        this.data(key, name[key]);
    }
    return this;
}
fn.data = data;
function getDocumentDimension(doc, dimension) {
    var docEle = doc.documentElement;
    return Math.max(doc.body["scroll".concat(dimension)], docEle["scroll".concat(dimension)], doc.body["offset".concat(dimension)], docEle["offset".concat(dimension)], docEle["client".concat(dimension)]);
}
each([true, false], function (i, outer) {
    each(['Width', 'Height'], function (i, prop) {
        var name = "".concat(outer ? 'outer' : 'inner').concat(prop);
        fn[name] = function (includeMargins) {
            if (!this[0])
                return;
            if (isWindow(this[0]))
                return outer ? this[0]["inner".concat(prop)] : this[0].document.documentElement["client".concat(prop)];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0]["".concat(outer ? 'offset' : 'client').concat(prop)] + (includeMargins && outer ? computeStyleInt(this[0], "margin".concat(i ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin".concat(i ? 'Bottom' : 'Right')) : 0);
        };
    });
});
each(['Width', 'Height'], function (index, prop) {
    var propLC = prop.toLowerCase();
    fn[propLC] = function (value) {
        if (!this[0])
            return isUndefined(value) ? undefined : this;
        if (!arguments.length) {
            if (isWindow(this[0]))
                return this[0].document.documentElement["client".concat(prop)];
            if (isDocument(this[0]))
                return getDocumentDimension(this[0], prop);
            return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
        }
        var valueNumber = parseInt(value, 10);
        return this.each(function (i, ele) {
            if (!isElement(ele))
                return;
            var boxSizing = computeStyle(ele, 'boxSizing');
            ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
        });
    };
});
var displayProperty = '___cd';
fn.toggle = function (force) {
    return this.each(function (i, ele) {
        if (!isElement(ele))
            return;
        var show = isUndefined(force) ? isHidden(ele) : force;
        if (show) {
            ele.style.display = ele[displayProperty] || '';
            if (isHidden(ele)) {
                ele.style.display = getDefaultDisplay(ele.tagName);
            }
        }
        else {
            ele[displayProperty] = computeStyle(ele, 'display');
            ele.style.display = 'none';
        }
    });
};
fn.hide = function () {
    return this.toggle(false);
};
fn.show = function () {
    return this.toggle(true);
};
var eventsNamespace = '___ce';
var eventsNamespacesSeparator = '.';
var eventsFocus = { focus: 'focusin', blur: 'focusout' };
var eventsHover = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
var eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
// @require ./variables.ts
function getEventNameBubbling(name) {
    return eventsHover[name] || eventsFocus[name] || name;
}
// @require ./variables.ts
function parseEventName(eventName) {
    var parts = eventName.split(eventsNamespacesSeparator);
    return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
}
fn.trigger = function (event, data) {
    if (isString(event)) {
        var _a = parseEventName(event), nameOriginal = _a[0], namespaces = _a[1];
        var name_1 = getEventNameBubbling(nameOriginal);
        if (!name_1)
            return this;
        var type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';
        event = doc.createEvent(type);
        event.initEvent(name_1, true, true);
        event.namespace = namespaces.join(eventsNamespacesSeparator);
        event.___ot = nameOriginal;
    }
    event.___td = data;
    var isEventFocus = (event.___ot in eventsFocus);
    return this.each(function (i, ele) {
        if (isEventFocus && isFunction(ele[event.___ot])) {
            ele["___i".concat(event.type)] = true; // Ensuring the native event is ignored
            ele[event.___ot]();
            ele["___i".concat(event.type)] = false; // Ensuring the custom event is not ignored
        }
        ele.dispatchEvent(event);
    });
};
// @require ./variables.ts
function getEventsCache(ele) {
    return ele[eventsNamespace] = (ele[eventsNamespace] || {});
}
// @require core/guid.ts
// @require events/helpers/get_events_cache.ts
function addEvent(ele, name, namespaces, selector, callback) {
    var eventCache = getEventsCache(ele);
    eventCache[name] = (eventCache[name] || []);
    eventCache[name].push([namespaces, selector, callback]);
    ele.addEventListener(name, callback);
}
function hasNamespaces(ns1, ns2) {
    return !ns2 || !some.call(ns2, function (ns) { return ns1.indexOf(ns) < 0; });
}
// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts
function removeEvent(ele, name, namespaces, selector, callback) {
    var cache = getEventsCache(ele);
    if (!name) {
        for (name in cache) {
            removeEvent(ele, name, namespaces, selector, callback);
        }
    }
    else if (cache[name]) {
        cache[name] = cache[name].filter(function (_a) {
            var ns = _a[0], sel = _a[1], cb = _a[2];
            if ((callback && cb.guid !== callback.guid) || !hasNamespaces(ns, namespaces) || (selector && selector !== sel))
                return true;
            ele.removeEventListener(name, cb);
        });
    }
}
fn.off = function (eventFullName, selector, callback) {
    var _this = this;
    if (isUndefined(eventFullName)) {
        this.each(function (i, ele) {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            removeEvent(ele);
        });
    }
    else if (!isString(eventFullName)) {
        for (var key in eventFullName) {
            this.off(key, eventFullName[key]);
        }
    }
    else {
        if (isFunction(selector)) {
            callback = selector;
            selector = '';
        }
        each(getSplitValues(eventFullName), function (i, eventFullName) {
            var _a = parseEventName(eventFullName), nameOriginal = _a[0], namespaces = _a[1];
            var name = getEventNameBubbling(nameOriginal);
            _this.each(function (i, ele) {
                if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                    return;
                removeEvent(ele, name, namespaces, selector, callback);
            });
        });
    }
    return this;
};
fn.remove = function (comparator) {
    filtered(this, comparator).detach().off();
    return this;
};
fn.replaceWith = function (selector) {
    return this.before(selector).remove();
};
fn.replaceAll = function (selector) {
    cash(selector).replaceWith(this);
    return this;
};
function on(eventFullName, selector, data, callback, _one) {
    var _this = this;
    if (!isString(eventFullName)) {
        for (var key in eventFullName) {
            this.on(key, selector, data, eventFullName[key], _one);
        }
        return this;
    }
    if (!isString(selector)) {
        if (isUndefined(selector) || isNull(selector)) {
            selector = '';
        }
        else if (isUndefined(data)) {
            data = selector;
            selector = '';
        }
        else {
            callback = data;
            data = selector;
            selector = '';
        }
    }
    if (!isFunction(callback)) {
        callback = data;
        data = undefined;
    }
    if (!callback)
        return this;
    each(getSplitValues(eventFullName), function (i, eventFullName) {
        var _a = parseEventName(eventFullName), nameOriginal = _a[0], namespaces = _a[1];
        var name = getEventNameBubbling(nameOriginal);
        var isEventHover = (nameOriginal in eventsHover);
        var isEventFocus = (nameOriginal in eventsFocus);
        if (!name)
            return;
        _this.each(function (i, ele) {
            if (!isElement(ele) && !isDocument(ele) && !isWindow(ele))
                return;
            var finalCallback = function (event) {
                if (event.target["___i".concat(event.type)])
                    return event.stopImmediatePropagation(); // Ignoring native event in favor of the upcoming custom one
                if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator)))
                    return;
                if (!selector && ((isEventFocus && (event.target !== ele || event.___ot === name)) || (isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))))
                    return;
                var thisArg = ele;
                if (selector) {
                    var target = event.target;
                    while (!matches(target, selector)) {
                        if (target === ele)
                            return;
                        target = target.parentNode;
                        if (!target)
                            return;
                    }
                    thisArg = target;
                }
                Object.defineProperty(event, 'currentTarget', {
                    configurable: true,
                    get: function () {
                        return thisArg;
                    }
                });
                Object.defineProperty(event, 'delegateTarget', {
                    configurable: true,
                    get: function () {
                        return ele;
                    }
                });
                Object.defineProperty(event, 'data', {
                    configurable: true,
                    get: function () {
                        return data;
                    }
                });
                var returnValue = callback.call(thisArg, event, event.___td);
                if (_one) {
                    removeEvent(ele, name, namespaces, selector, finalCallback);
                }
                if (returnValue === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            };
            finalCallback.guid = callback.guid = (callback.guid || cash.guid++);
            addEvent(ele, name, namespaces, selector, finalCallback);
        });
    });
    return this;
}
fn.on = on;
function one(eventFullName, selector, data, callback) {
    return this.on(eventFullName, selector, data, callback, true);
}
;
fn.one = one;
var queryEncodeSpaceRe = /%20/g;
var queryEncodeCRLFRe = /\r?\n/g;
function queryEncode(prop, value) {
    return "&".concat(encodeURIComponent(prop), "=").concat(encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+'));
}
var skippableRe = /file|reset|submit|button|image/i;
var checkableRe = /radio|checkbox/i;
fn.serialize = function () {
    var query = '';
    this.each(function (i, ele) {
        each(ele.elements || [ele], function (i, ele) {
            if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || (checkableRe.test(ele.type) && !ele.checked))
                return;
            var value = getValue(ele);
            if (!isUndefined(value)) {
                var values = isArray(value) ? value : [value];
                each(values, function (i, value) {
                    query += queryEncode(ele.name, value);
                });
            }
        });
    });
    return query.slice(1);
};
// @require core/types.ts
// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require core/each.ts
// @require core/extend.ts
// @require core/find.ts
// @require core/get_compare_function.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/parse_html.ts
// @require core/unique.ts
// @require attributes/add_class.ts
// @require attributes/attr.ts
// @require attributes/has_class.ts
// @require attributes/prop.ts
// @require attributes/remove_attr.ts
// @require attributes/remove_class.ts
// @require attributes/remove_prop.ts
// @require attributes/toggle_class.ts
// @require collection/add.ts
// @require collection/each.ts
// @require collection/eq.ts
// @require collection/filter.ts
// @require collection/first.ts
// @require collection/get.ts
// @require collection/index.ts
// @require collection/last.ts
// @require collection/map.ts
// @require collection/slice.ts
// @require css/css.ts
// @require data/data.ts
// @require dimensions/inner_outer.ts
// @require dimensions/normal.ts
// @require effects/hide.ts
// @require effects/show.ts
// @require effects/toggle.ts
// @require events/off.ts
// @require events/on.ts
// @require events/one.ts
// @require events/ready.ts
// @require events/trigger.ts
// @require forms/serialize.ts
// @require forms/val.ts
// @require manipulation/after.ts
// @require manipulation/append.ts
// @require manipulation/append_to.ts
// @require manipulation/before.ts
// @require manipulation/clone.ts
// @require manipulation/detach.ts
// @require manipulation/empty.ts
// @require manipulation/html.ts
// @require manipulation/insert_after.ts
// @require manipulation/insert_before.ts
// @require manipulation/prepend.ts
// @require manipulation/prepend_to.ts
// @require manipulation/remove.ts
// @require manipulation/replace_all.ts
// @require manipulation/replace_with.ts
// @require manipulation/text.ts
// @require manipulation/unwrap.ts
// @require manipulation/wrap.ts
// @require manipulation/wrap_all.ts
// @require manipulation/wrap_inner.ts
// @require offset/offset.ts
// @require offset/offset_parent.ts
// @require offset/position.ts
// @require traversal/children.ts
// @require traversal/closest.ts
// @require traversal/contents.ts
// @require traversal/find.ts
// @require traversal/has.ts
// @require traversal/is.ts
// @require traversal/next.ts
// @require traversal/next_all.ts
// @require traversal/next_until.ts
// @require traversal/not.ts
// @require traversal/parent.ts
// @require traversal/parents.ts
// @require traversal/parents_until.ts
// @require traversal/prev.ts
// @require traversal/prev_all.ts
// @require traversal/prev_until.ts
// @require traversal/siblings.ts
// @no-require extras/get_script.ts
// @no-require extras/shorthands.ts
// @require methods.ts
if (true) { // Node.js
    module.exports = cash;
}
else {}
})();

/***/ }),

/***/ 423:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Area = void 0;
const pt_json_1 = __importDefault(__webpack_require__(82));
const question_1 = __webpack_require__(967);
const relations_1 = __importDefault(__webpack_require__(432));
class Area {
    constructor(id, lang) {
        this._lang = pt_json_1.default;
        this._id = id;
        this._lang = lang;
    }
    get porcent() {
        return this._porcent;
    }
    set porcent(porcent) {
        this._porcent = porcent;
    }
    get id() {
        return this._id.toString();
    }
    get description() {
        return this._lang.areas.filter(area => area.id === this._id)[0].description;
    }
    get carreras() {
        return this._lang.carreras[this._id - 1].description;
    }
    get questions() {
        let questions = [];
        let questionsIds = relations_1.default.questionsInAreas().filter(relation => relation.areaId === this._id)[0].questionsId;
        questionsIds.forEach((questionId) => {
            questions.push(new question_1.Question(questionId, this._lang));
        });
        return questions;
    }
}
exports.Area = Area;


/***/ }),

/***/ 967:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Question = void 0;
const area_1 = __webpack_require__(423);
const relations_1 = __importDefault(__webpack_require__(432));
class Question {
    constructor(id, lang) {
        this._id = id;
        this._lang = lang;
    }
    get id() {
        return this._id.toString();
    }
    get description() {
        return this._lang.questions.filter((question) => question.id === this._id)[0].description;
    }
    get area() {
        return new area_1.Area(relations_1.default.questionsInAreas().filter(relation => relation.questionsId.includes(this._id))[0].areaId, this._lang);
    }
}
exports.Question = Question;


/***/ }),

/***/ 9:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const cash_dom_1 = __importDefault(__webpack_require__(553));
const table_1 = __importDefault(__webpack_require__(900));
const relations_1 = __importDefault(__webpack_require__(432));
const question_1 = __webpack_require__(967);
const area_1 = __webpack_require__(423);
const en_json_1 = __importDefault(__webpack_require__(7));
const es_json_1 = __importDefault(__webpack_require__(905));
const pt_json_1 = __importDefault(__webpack_require__(82));
const PAGE_SIZE = 15;
let lang;
let currentPage = 1;
let totalPages = 1;
function areasCount() {
    let areasCount = new Array(lang.areas.length).fill(0);
    const relations = relations_1.default.questionsInAreas();
    lang.questions.forEach((_q, index) => {
        const questionId = index + 1;
        const radioGroup = document.getElementsByName(`question${index}`);
        const yesOption = radioGroup[0];
        if (yesOption && yesOption.checked) {
            relations.forEach((area, j) => {
                if (area.questionsId.includes(questionId)) {
                    areasCount[j]++;
                }
            });
        }
    });
    return areasCount;
}
function porcent(x, area) {
    const sum = area.reduce((a, b) => a + b, 0);
    if (sum === 0)
        return 0;
    return Math.floor((x * 100) / sum);
}
function process() {
    if (radiosValidation(lang.questions.length)) {
        hideNotice();
        const counts = areasCount();
        const porcents = counts.map((areaCount) => porcent(areaCount, counts));
        writeAreas(porcents, counts);
    }
}
function radiosValidation(questions_size) {
    hideNotice();
    for (let i = 0; i <= questions_size - 1; i++) {
        let radiogroup = document.getElementsByName(`question${i}`);
        const check_yes = radiogroup[0];
        const check_not = radiogroup[1];
        const row = check_yes === null || check_yes === void 0 ? void 0 : check_yes.closest(".question-row");
        if (row)
            row.classList.remove("row-error");
        if (!(check_yes.checked || check_not.checked)) {
            check_yes.focus();
            if (row)
                row.classList.add("row-error");
            showNotice(`${lang.labels.AllQuestionsNeedToBeAnswered} ${i + 1}`);
            return false;
        }
    }
    return true;
}
function setHeaderText(activity) {
    document.getElementById('Activity').innerHTML = activity;
}
function setStaticText(lang) {
    setHeaderText(lang.labels.Activity);
    document.getElementById('hero-eyebrow').textContent = lang.labels.HeroEyebrow;
    document.getElementById('hero-title').textContent = lang.labels.HeroTitle;
    document.getElementById('hero-subtitle').textContent = lang.labels.HeroSubtitle;
    const yesLabel = document.getElementById('yes-label');
    if (yesLabel)
        yesLabel.textContent = lang.labels.Yes;
    const processBtn = document.getElementById('btn_procesar');
    if (processBtn)
        processBtn.value = lang.labels.ProcessButton;
    document.getElementById('results-title').textContent = lang.labels.ResultsTitle;
    document.getElementById('btn_prev').textContent = lang.labels.Prev;
    document.getElementById('btn_next').textContent = lang.labels.Next;
    const langSelect = document.getElementById('lang');
    if (langSelect)
        langSelect.setAttribute('aria-label', lang.labels.Language);
}
function setQuestions(lang) {
    let questionsRow = document.querySelectorAll('.question-row .question-text');
    questionsRow.forEach(function (q, i) {
        let description = lang.questions.filter((question) => question.id === (i + 1))[0].description;
        q.innerHTML = description;
    });
}
function updatePaginationMeta() {
    const rows = document.querySelectorAll('.question-row');
    totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
}
function showPage(page) {
    updatePaginationMeta();
    currentPage = Math.min(Math.max(page, 1), totalPages);
    const rows = document.querySelectorAll('.question-row');
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    rows.forEach((row, idx) => {
        row.classList.toggle("hidden", idx < start || idx >= end);
    });
    updatePagerUI();
}
function changePage(delta) {
    showPage(currentPage + delta);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function updatePagerUI() {
    const pageText = document.getElementById('page-text');
    if (pageText)
        pageText.textContent = `${lang.labels.Page} ${currentPage}/${totalPages}`;
    const prev = document.getElementById('btn_prev');
    const next = document.getElementById('btn_next');
    if (prev)
        prev.disabled = currentPage <= 1;
    if (next)
        next.disabled = currentPage >= totalPages;
    const processBtn = document.getElementById('btn_procesar');
    if (processBtn) {
        const allAnswered = areAllAnswered();
        processBtn.style.display = currentPage >= totalPages && allAnswered ? "inline-block" : "none";
    }
}
async function writeQuestions() {
    (0, cash_dom_1.default)("#btn_procesar").on('click', () => process());
    (0, cash_dom_1.default)("#btn_prev").on('click', () => changePage(-1));
    (0, cash_dom_1.default)("#btn_next").on('click', () => changePage(1));
    (0, cash_dom_1.default)('#lang').on('change', async function () {
        lang = await getLanguage(this.value);
        setStaticText(lang);
        setQuestions(lang);
        resetResults();
        hideNotice();
        updateProgressBar();
        showPage(1);
    });
    lang = await getLanguage("pt");
    setStaticText(lang);
    lang.questions.forEach((_q, i) => {
        let question = new question_1.Question(i + 1, lang);
        table_1.default.addRow(i, question, { yes: lang.labels.Yes, no: lang.labels.No });
    });
    setQuestions(lang);
    resetResults();
    hideNotice();
    attachRadioListeners();
    updatePaginationMeta();
    showPage(1);
    updateProgressBar();
    updatePagerUI();
}
async function getLanguage(lang) {
    var _a;
    const langs = {
        en: en_json_1.default,
        es: es_json_1.default,
        pt: pt_json_1.default
    };
    return (_a = langs[lang]) !== null && _a !== void 0 ? _a : langs.pt;
}
function writeAreas(areasPorcent, counts) {
    var _a;
    const results = document.getElementsByClassName('areas')[0];
    const resultsSection = document.querySelector('.results');
    results.innerHTML = "";
    let areas = [];
    for (let i = 0; i < lang.areas.length; i++) {
        let area = new area_1.Area(lang.areas[i].id, lang);
        area.porcent = (_a = areasPorcent[i]) !== null && _a !== void 0 ? _a : 0;
        areas.push(area);
    }
    areas.sort((a, b) => (b.porcent > a.porcent) ? 1 : -1);
    areas.forEach((area, idx) => {
        var _a;
        const card = document.createElement("div");
        card.className = "area-card";
        if (idx < 3)
            card.classList.add("top");
        const badge = document.createElement("div");
        badge.className = "badge-rank";
        badge.textContent = `#${idx + 1}`;
        const titleRow = document.createElement("div");
        titleRow.className = "area-title-row";
        const h1 = document.createElement('h1');
        h1.className = "area-name";
        h1.innerText = area.description;
        const percent = document.createElement("div");
        percent.className = "area-percent";
        const questionsPerArea = lang.questions.length / lang.areas.length;
        const countValue = (_a = counts[lang.areas.findIndex((a) => a.id === area._id)]) !== null && _a !== void 0 ? _a : 0;
        percent.innerText = `${area.porcent}% (${countValue}/${questionsPerArea})`;
        titleRow.appendChild(h1);
        titleRow.appendChild(percent);
        const bar = document.createElement("div");
        bar.className = "bar";
        const barFill = document.createElement("div");
        barFill.className = "bar-fill";
        barFill.style.width = `${area.porcent}%`;
        bar.appendChild(barFill);
        const desc = document.createElement("p");
        desc.className = "area-description";
        desc.innerText = area.carreras;
        const toggle = document.createElement("button");
        toggle.className = "toggle-desc";
        toggle.textContent = lang.labels.ShowCareers;
        toggle.addEventListener("click", () => {
            const expanded = card.classList.toggle("expanded");
            toggle.textContent = expanded ? lang.labels.HideCareers : lang.labels.ShowCareers;
        });
        card.appendChild(badge);
        card.appendChild(titleRow);
        card.appendChild(bar);
        card.appendChild(toggle);
        card.appendChild(desc);
        if (idx >= 3)
            card.classList.add("hidden");
        results.appendChild(card);
    });
    setupToggleAll();
    const methodNote = document.createElement("div");
    methodNote.className = "method-note";
    methodNote.textContent = buildMethodSummary(areas, counts);
    results.appendChild(methodNote);
    if (resultsSection) {
        resultsSection.classList.remove('hidden');
        resultsSection.classList.add('visible');
    }
    var button = document.getElementById("btn_procesar");
    button.style.display = "inline-block";
}
function resetResults() {
    const results = document.getElementsByClassName('areas')[0];
    const resultsSection = document.querySelector('.results');
    results.innerHTML = "";
    if (resultsSection) {
        resultsSection.classList.add('hidden');
        resultsSection.classList.remove('visible');
    }
    const button = document.getElementById("btn_procesar");
    if (button)
        button.style.display = "inline-block";
}
function randomFill() {
    for (let i = 0; i < lang.questions.length; i++) {
        const radios = document.getElementsByName(`question${i}`);
        const yes = radios[0];
        const no = radios[1];
        const chooseYes = Math.random() >= 0.5;
        if (yes)
            yes.checked = chooseYes;
        if (no)
            no.checked = !chooseYes;
        const row = yes === null || yes === void 0 ? void 0 : yes.closest(".question-row");
        if (row)
            row.classList.remove("row-error");
    }
    updateProgressBar();
}
function showNotice(message) {
    const notice = document.getElementById("notice");
    if (!notice)
        return;
    notice.textContent = message;
    notice.classList.remove("hidden");
}
function hideNotice() {
    const notice = document.getElementById("notice");
    if (!notice)
        return;
    notice.textContent = "";
    notice.classList.add("hidden");
}
function attachRadioListeners() {
    const radios = document.querySelectorAll('input[type=radio]');
    radios.forEach((radio) => {
        radio.addEventListener('change', () => {
            const row = radio.closest(".question-row");
            if (row)
                row.classList.remove("row-error");
            hideNotice();
            updateProgressBar();
        });
    });
}
function updateProgressBar() {
    var _a, _b;
    const total = lang.questions.length;
    let answered = 0;
    for (let i = 0; i < total; i++) {
        const group = document.getElementsByName(`question${i}`);
        if (((_a = group[0]) === null || _a === void 0 ? void 0 : _a.checked) || ((_b = group[1]) === null || _b === void 0 ? void 0 : _b.checked))
            answered++;
    }
    const progressText = document.getElementById('progress-text');
    if (progressText)
        progressText.textContent = `${lang.labels.Answered} ${answered}/${total}`;
    const bar = document.getElementById('progress-bar-inner');
    if (bar)
        bar.style.width = `${Math.round((answered / total) * 100)}%`;
    updatePagerUI();
}
function setupToggleAll() {
    // no-op: toggle-all removido
}
function areAllAnswered() {
    var _a, _b;
    for (let i = 0; i < lang.questions.length; i++) {
        const group = document.getElementsByName(`question${i}`);
        if (!(((_a = group[0]) === null || _a === void 0 ? void 0 : _a.checked) || ((_b = group[1]) === null || _b === void 0 ? void 0 : _b.checked)))
            return false;
    }
    return true;
}
function buildMethodSummary(areas, counts) {
    const total = lang.questions.length;
    const answered = counts.reduce((a, b) => a + b, 0);
    const topCode = areas.slice(0, 3).map(a => a.description.charAt(0)).join('');
    const base = lang.labels.MethodNote;
    const prefix = `${lang.labels.MethodSummaryPrefix} ${answered}/${total}.`;
    const code = `${lang.labels.MethodSummaryCode}: ${topCode}.`;
    const scoring = lang.labels.MethodSummaryScoring;
    return `${base} ${prefix} ${code} ${scoring}`;
}
window.onload = writeQuestions;


/***/ }),

/***/ 432:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Relations {
    static questionsInAreas() {
        return [
            { "areaId": 1, "questionsId": [1, 2, 3, 4, 5, 6, 7, 8] },
            { "areaId": 2, "questionsId": [9, 10, 11, 12, 13, 14, 15, 16] },
            { "areaId": 3, "questionsId": [17, 18, 19, 20, 21, 22, 23, 24] },
            { "areaId": 4, "questionsId": [25, 26, 27, 28, 29, 30, 31, 32] },
            { "areaId": 5, "questionsId": [33, 34, 35, 36, 37, 38, 39, 40] },
            { "areaId": 6, "questionsId": [41, 42, 43, 44, 45, 46, 47, 48] }
        ];
    }
}
exports["default"] = Relations;


/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Table {
    static addRow(i, question, labels) {
        const list = document.getElementById("question-list");
        if (!list)
            return;
        const row = document.createElement("div");
        row.className = "question-row";
        const text = document.createElement("div");
        text.className = "question-text";
        text.textContent = question.description;
        const toggle = Table.createToggle(i, labels);
        row.appendChild(text);
        row.appendChild(toggle);
        list.appendChild(row);
    }
    static createToggle(i, labels) {
        const container = document.createElement("div");
        container.className = "toggle";
        const yesLabel = document.createElement("label");
        const yesInput = document.createElement("input");
        yesInput.type = "radio";
        yesInput.name = `question${i}`;
        yesInput.value = "yes";
        const yesSpan = document.createElement("span");
        yesSpan.textContent = labels.yes;
        yesLabel.appendChild(yesInput);
        yesLabel.appendChild(yesSpan);
        const noLabel = document.createElement("label");
        const noInput = document.createElement("input");
        noInput.type = "radio";
        noInput.name = `question${i}`;
        noInput.value = "no";
        const noSpan = document.createElement("span");
        noSpan.textContent = labels.no;
        noLabel.appendChild(noInput);
        noLabel.appendChild(noSpan);
        container.appendChild(yesLabel);
        container.appendChild(noLabel);
        return container;
    }
}
exports["default"] = Table;


/***/ }),

/***/ 7:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"questions":[{"id":1,"description":"Repair mechanical or electrical items with tools."},{"id":2,"description":"Use hand or power tools to build something."},{"id":3,"description":"Operate machinery or equipment safely."},{"id":4,"description":"Work outdoors doing physical tasks."},{"id":5,"description":"Install or maintain systems (plumbing, electrical, etc.)."},{"id":6,"description":"Drive or operate vehicles as part of the job."},{"id":7,"description":"Assemble furniture or structures."},{"id":8,"description":"Inspect and fix mechanical issues."},{"id":9,"description":"Analyze data to find patterns."},{"id":10,"description":"Design experiments to test ideas."},{"id":11,"description":"Solve complex math or logic problems."},{"id":12,"description":"Research why something failed and propose fixes."},{"id":13,"description":"Read scientific articles and apply findings."},{"id":14,"description":"Develop software or scripts to solve problems."},{"id":15,"description":"Model scenarios using statistics."},{"id":16,"description":"Formulate hypotheses and verify them."},{"id":17,"description":"Create art, illustrations, or visuals."},{"id":18,"description":"Write stories, articles, or creative content."},{"id":19,"description":"Compose music or work in audio production."},{"id":20,"description":"Design logos, posters, or visual identities."},{"id":21,"description":"Perform acting, dance, or other stage arts."},{"id":22,"description":"Take and edit photos or video."},{"id":23,"description":"Conceptualize and prototype creative ideas."},{"id":24,"description":"Craft objects by hand (ceramics, jewelry, etc.)."},{"id":25,"description":"Teach or tutor and explain concepts."},{"id":26,"description":"Care for people who need support."},{"id":27,"description":"Lead group discussions or workshops."},{"id":28,"description":"Provide counseling or guidance to others."},{"id":29,"description":"Mediate conflicts and help people reach agreement."},{"id":30,"description":"Coordinate volunteers or community events."},{"id":31,"description":"Mentor individuals in their development."},{"id":32,"description":"Facilitate training sessions."},{"id":33,"description":"Sell products or ideas and persuade others."},{"id":34,"description":"Lead teams to achieve business goals."},{"id":35,"description":"Negotiate deals or contracts."},{"id":36,"description":"Start or grow a business or venture."},{"id":37,"description":"Pitch solutions to decision makers."},{"id":38,"description":"Plan marketing or go-to-market strategies."},{"id":39,"description":"Manage budgets and profitability."},{"id":40,"description":"Network to open opportunities."},{"id":41,"description":"Organize records, documents, or data accurately."},{"id":42,"description":"Work with numbers, finances, or budgets."},{"id":43,"description":"Follow clear procedures and standards."},{"id":44,"description":"Schedule tasks and plan workflows."},{"id":45,"description":"Keep databases or spreadsheets tidy."},{"id":46,"description":"Prepare formal reports and documentation."},{"id":47,"description":"Ensure compliance with rules and policies."},{"id":48,"description":"Improve and standardize processes."}],"areas":[{"id":1,"description":"Realistic"},{"id":2,"description":"Investigative"},{"id":3,"description":"Artistic"},{"id":4,"description":"Social"},{"id":5,"description":"Enterprising"},{"id":6,"description":"Conventional"}],"carreras":[{"id":1,"description":"Technical trades, maintenance, engineering tech, logistics, field operations."},{"id":2,"description":"Science, research, data analysis, laboratory roles, R&D, analytics."},{"id":3,"description":"Design, visual arts, multimedia, writing, advertising, creative direction."},{"id":4,"description":"Education, health support, counseling, HR development, community services."},{"id":5,"description":"Business development, sales, marketing, management, entrepreneurship."},{"id":6,"description":"Accounting, administration, finance ops, compliance, process management."}],"labels":{"AllQuestionsNeedToBeAnswered":"You must answer all questions, missing:","Activity":"Activity","HeroEyebrow":"Vocational orientation","HeroTitle":"Identify your vocational interest profile","HeroSubtitle":"Complete the questionnaire and review your RIASEC areas based on your responses.","Yes":"Yes","No":"No","ProcessButton":"Process results","RandomFill":"Fill randomly","ResultsTitle":"Your top areas","Prev":"Previous","Next":"Next","Page":"Page","Answered":"Answered:","SeeAll":"See all","SeeLess":"See less","ShowCareers":"Show careers","HideCareers":"Hide careers","Language":"Language","MethodNote":"Method: Holland\'s RIASEC model with items inspired by the public-domain O*NET Interest Profiler (60 items). Scoring: sum of affirmative responses per dimension, ordered.","ExportPDF":"Export PDF","MethodSummaryPrefix":"Answered","MethodSummaryCode":"Top code","MethodSummaryScoring":"Percentages are based on your “yes” answers; more affirmatives in a dimension raise its rank."}}');

/***/ }),

/***/ 905:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"questions":[{"id":1,"description":"Reparar artículos mecánicos o eléctricos con herramientas."},{"id":2,"description":"Usar herramientas manuales o eléctricas para construir algo."},{"id":3,"description":"Operar maquinaria o equipos de forma segura."},{"id":4,"description":"Trabajar al aire libre realizando tareas físicas."},{"id":5,"description":"Instalar o mantener sistemas (plomería, electricidad, etc.)."},{"id":6,"description":"Conducir u operar vehículos como parte del trabajo."},{"id":7,"description":"Ensamblar muebles o estructuras."},{"id":8,"description":"Inspeccionar y reparar fallas mecánicas."},{"id":9,"description":"Analizar datos para encontrar patrones."},{"id":10,"description":"Diseñar experimentos para probar ideas."},{"id":11,"description":"Resolver problemas complejos de matemática o lógica."},{"id":12,"description":"Investigar por qué algo falló y proponer correcciones."},{"id":13,"description":"Leer artículos científicos y aplicar hallazgos."},{"id":14,"description":"Desarrollar software o scripts para resolver problemas."},{"id":15,"description":"Modelar escenarios usando estadística."},{"id":16,"description":"Formular hipótesis y verificarlas."},{"id":17,"description":"Crear arte, ilustraciones o material visual."},{"id":18,"description":"Escribir historias, artículos o contenido creativo."},{"id":19,"description":"Componer música o trabajar en producción de audio."},{"id":20,"description":"Diseñar logos, afiches o identidades visuales."},{"id":21,"description":"Actuar, bailar u otras artes escénicas."},{"id":22,"description":"Tomar y editar fotos o video."},{"id":23,"description":"Conceptualizar y prototipar ideas creativas."},{"id":24,"description":"Hacer objetos a mano (cerámica, joyería, etc.)."},{"id":25,"description":"Enseñar o tutorizar y explicar conceptos."},{"id":26,"description":"Cuidar a personas que necesitan apoyo."},{"id":27,"description":"Guiar discusiones grupales o talleres."},{"id":28,"description":"Brindar orientación o consejería a otros."},{"id":29,"description":"Mediar conflictos y ayudar a lograr acuerdos."},{"id":30,"description":"Coordinar voluntariado o eventos comunitarios."},{"id":31,"description":"Mentorizar a personas en su desarrollo."},{"id":32,"description":"Facilitar sesiones de capacitación."},{"id":33,"description":"Vender productos o ideas y persuadir a otros."},{"id":34,"description":"Liderar equipos para cumplir metas de negocio."},{"id":35,"description":"Negociar acuerdos o contratos."},{"id":36,"description":"Iniciar o hacer crecer un negocio o emprendimiento."},{"id":37,"description":"Presentar soluciones a tomadores de decisión."},{"id":38,"description":"Planear estrategias de marketing o go-to-market."},{"id":39,"description":"Gestionar presupuestos y rentabilidad."},{"id":40,"description":"Generar networking para abrir oportunidades."},{"id":41,"description":"Organizar registros, documentos o datos con precisión."},{"id":42,"description":"Trabajar con números, finanzas o presupuestos."},{"id":43,"description":"Seguir procedimientos y normas claras."},{"id":44,"description":"Programar tareas y planificar flujos de trabajo."},{"id":45,"description":"Mantener bases de datos o planillas ordenadas."},{"id":46,"description":"Preparar reportes y documentación formal."},{"id":47,"description":"Asegurar el cumplimiento de reglas y políticas."},{"id":48,"description":"Mejorar y estandarizar procesos."}],"areas":[{"id":1,"description":"Realista"},{"id":2,"description":"Investigador"},{"id":3,"description":"Artístico"},{"id":4,"description":"Social"},{"id":5,"description":"Emprendedor"},{"id":6,"description":"Convencional"}],"carreras":[{"id":1,"description":"Oficios técnicos, mantenimiento, tecnología de ingeniería, logística, operaciones de campo."},{"id":2,"description":"Ciencia, investigación, análisis de datos, roles de laboratorio, I+D, analítica."},{"id":3,"description":"Diseño, artes visuales, multimedia, escritura, publicidad, dirección creativa."},{"id":4,"description":"Educación, apoyo en salud, consejería, desarrollo de personas, servicios comunitarios."},{"id":5,"description":"Desarrollo de negocios, ventas, marketing, gestión, emprendimiento."},{"id":6,"description":"Contabilidad, administración, operaciones financieras, cumplimiento, gestión de procesos."}],"labels":{"AllQuestionsNeedToBeAnswered":"Debe responder todas las preguntas, falta:","Activity":"Actividad","HeroEyebrow":"Orientación vocacional","HeroTitle":"Identifica tu perfil de intereses RIASEC","HeroSubtitle":"Completa el cuestionario y revisa tus áreas según tus respuestas.","Yes":"Sí","No":"No","ProcessButton":"Procesar resultados","RandomFill":"Rellenar aleatorio","ResultsTitle":"Tus áreas destacadas","Prev":"Anterior","Next":"Siguiente","Page":"Página","Answered":"Respondidas:","SeeAll":"Ver todas","SeeLess":"Ver menos","ShowCareers":"Ver carreras","HideCareers":"Ocultar carreras","Language":"Idioma","MethodNote":"Método: modelo RIASEC de Holland con ítems inspirados en la versión pública del Interest Profiler de O*NET (60 ítems). Puntuación: suma de respuestas afirmativas por dimensión, ordenadas.","ExportPDF":"Exportar PDF","MethodSummaryPrefix":"Respondidas","MethodSummaryCode":"Código RIASEC","MethodSummaryScoring":"Los porcentajes se basan en tus respuestas “sí”; más afirmativos en una dimensión la hacen subir en el ranking."}}');

/***/ }),

/***/ 82:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"questions":[{"id":1,"description":"Consertar itens mecânicos ou elétricos com ferramentas."},{"id":2,"description":"Usar ferramentas manuais ou elétricas para construir algo."},{"id":3,"description":"Operar máquinas ou equipamentos com segurança."},{"id":4,"description":"Trabalhar ao ar livre realizando tarefas físicas."},{"id":5,"description":"Instalar ou manter sistemas (hidráulica, elétrica etc.)."},{"id":6,"description":"Dirigir ou operar veículos como parte do trabalho."},{"id":7,"description":"Montar móveis ou estruturas."},{"id":8,"description":"Inspecionar e reparar falhas mecânicas."},{"id":9,"description":"Analisar dados para encontrar padrões."},{"id":10,"description":"Planejar experimentos para testar ideias."},{"id":11,"description":"Resolver problemas complexos de matemática ou lógica."},{"id":12,"description":"Investigar por que algo falhou e propor correções."},{"id":13,"description":"Ler artigos científicos e aplicar descobertas."},{"id":14,"description":"Desenvolver software ou scripts para resolver problemas."},{"id":15,"description":"Modelar cenários usando estatística."},{"id":16,"description":"Formular hipóteses e verificá-las."},{"id":17,"description":"Criar arte, ilustrações ou materiais visuais."},{"id":18,"description":"Escrever histórias, artigos ou conteúdo criativo."},{"id":19,"description":"Compor música ou trabalhar com produção de áudio."},{"id":20,"description":"Criar logos, cartazes ou identidades visuais."},{"id":21,"description":"Atuar, dançar ou outras artes cênicas."},{"id":22,"description":"Fotografar e editar fotos ou vídeo."},{"id":23,"description":"Conceituar e prototipar ideias criativas."},{"id":24,"description":"Fazer objetos à mão (cerâmica, joalheria etc.)."},{"id":25,"description":"Ensinar ou dar tutoria e explicar conceitos."},{"id":26,"description":"Cuidar de pessoas que precisam de apoio."},{"id":27,"description":"Conduzir discussões em grupo ou oficinas."},{"id":28,"description":"Oferecer aconselhamento ou orientação a outros."},{"id":29,"description":"Medir conflitos e ajudar em acordos."},{"id":30,"description":"Coordenar voluntariado ou eventos comunitários."},{"id":31,"description":"Mentorar pessoas em seu desenvolvimento."},{"id":32,"description":"Facilitar sessões de treinamento."},{"id":33,"description":"Vender produtos ou ideias e persuadir pessoas."},{"id":34,"description":"Liderar equipes para atingir metas de negócio."},{"id":35,"description":"Negociar acordos ou contratos."},{"id":36,"description":"Iniciar ou expandir um negócio ou empreendimento."},{"id":37,"description":"Apresentar soluções a tomadores de decisão."},{"id":38,"description":"Planejar estratégias de marketing ou go-to-market."},{"id":39,"description":"Gerir orçamentos e rentabilidade."},{"id":40,"description":"Fazer networking para gerar oportunidades."},{"id":41,"description":"Organizar registros, documentos ou dados com precisão."},{"id":42,"description":"Trabalhar com números, finanças ou orçamentos."},{"id":43,"description":"Seguir procedimentos e normas claras."},{"id":44,"description":"Agendar tarefas e planejar fluxos de trabalho."},{"id":45,"description":"Manter bancos de dados ou planilhas organizados."},{"id":46,"description":"Preparar relatórios e documentação formal."},{"id":47,"description":"Garantir conformidade com regras e políticas."},{"id":48,"description":"Melhorar e padronizar processos."}],"areas":[{"id":1,"description":"Realista"},{"id":2,"description":"Investigativo"},{"id":3,"description":"Artístico"},{"id":4,"description":"Social"},{"id":5,"description":"Empreendedor"},{"id":6,"description":"Convencional"}],"carreras":[{"id":1,"description":"Ofícios técnicos, manutenção, tecnologia em engenharia, logística, operações de campo."},{"id":2,"description":"Ciência, pesquisa, análise de dados, laboratório, P&D, analytics."},{"id":3,"description":"Design, artes visuais, multimídia, escrita, publicidade, direção de criação."},{"id":4,"description":"Educação, apoio em saúde, aconselhamento, desenvolvimento humano, serviços comunitários."},{"id":5,"description":"Desenvolvimento de negócios, vendas, marketing, gestão, empreendedorismo."},{"id":6,"description":"Contabilidade, administração, operações financeiras, compliance, gestão de processos."}],"labels":{"AllQuestionsNeedToBeAnswered":"Você deve responder a todas as perguntas, faltando:","Activity":"Atividade","HeroEyebrow":"Orientação vocacional","HeroTitle":"Identifique seu perfil de interesses RIASEC","HeroSubtitle":"Complete o questionário e veja suas áreas conforme suas respostas.","Yes":"Sim","No":"Não","ProcessButton":"Processar resultados","RandomFill":"Preencher aleatoriamente","ResultsTitle":"Suas áreas em destaque","Prev":"Anterior","Next":"Seguinte","Page":"Página","Answered":"Respondidas:","SeeAll":"Ver todas","SeeLess":"Ver menos","ShowCareers":"Ver carreiras","HideCareers":"Ocultar carreiras","Language":"Idioma","MethodNote":"Método: modelo RIASEC de Holland com itens inspirados na versão pública do Interest Profiler do O*NET (60 itens). Pontuação: soma de respostas afirmativas por dimensão, em ordem.","ExportPDF":"Exportar PDF","MethodSummaryPrefix":"Respondidas","MethodSummaryCode":"Código RIASEC","MethodSummaryScoring":"Os percentuais se baseiam nas respostas “sim”; mais afirmativas em uma dimensão elevam seu ranking."}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(9);
/******/ 	
/******/ })()
;
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

/***/ 9:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var cash_dom_1 = __importDefault(__webpack_require__(553));
var pt_json_1 = __importDefault(__webpack_require__(82));
var es_json_1 = __importDefault(__webpack_require__(905));
var lang = pt_json_1.default;
var area1 = [4, 9, 12, 20, 28, 31, 35, 39, 43, 46, 50, 65, 67, 68, 75, 77];
var area2 = [6, 13, 23, 25, 34, 37, 38, 42, 49, 52, 55, 63, 66, 70, 72, 78];
var area3 = [5, 10, 15, 19, 21, 26, 29, 33, 36, 44, 53, 56, 59, 62, 71, 80];
var area4 = [1, 7, 11, 17, 18, 24, 30, 41, 48, 51, 58, 60, 61, 64, 73, 79];
var area5 = [2, 3, 8, 14, 16, 22, 27, 32, 40, 45, 47, 54, 57, 69, 74, 76];
var a1 = 0;
var a2 = 0;
var a3 = 0;
var a4 = 0;
var a5 = 0;
function areas(questions_size) {
    for (var i = 0; i <= questions_size - 1; i++) {
        var questionCheckbox = (0, cash_dom_1.default)("input[name=\"preguntas".concat(i, "\"]"));
        if (questionCheckbox.is(':checked')) {
            if (area1.includes(i + 1))
                a1++;
            else if (area2.includes(i + 1))
                a2++;
            else if (area3.includes(i + 1))
                a3++;
            else if (area4.includes(i + 1))
                a4++;
            else if (area5.includes(i + 1))
                a5++;
        }
    }
}
function porcent(x) {
    return Math.floor((x * 100) / (a1 + a2 + a3 + a4 + a5));
}
function process() {
    if (radios_ok(lang.questions.length)) {
        areas(lang.questions.length);
        writeAreas([porcent(a1), porcent(a2), porcent(a3), porcent(a4), porcent(a5)]);
    }
}
function radios_ok(questions_size) {
    for (var i = 0; i <= questions_size - 1; i++) {
        var radiogroup = document.getElementsByName('preguntas' + i);
        var check_yes = radiogroup[0];
        var check_not = radiogroup[1];
        if (!((check_yes.checked) || (check_not.checked))) {
            check_yes.focus();
            alert('Debe responder todas las preguntas, falta: ' + Number(i + 1));
            return false;
        }
    }
    return true;
}
function randownchecked() {
    return (Math.floor(Math.random() * 2));
}
function createRadio(i) {
    var radio = document.createElement("input");
    radio.type = 'radio';
    radio.name = "preguntas".concat((i));
    radio.checked = (Math.random() < 0.7);
    return radio;
}
function setQuestions(langQuestions) {
    var questions = document.querySelectorAll('tr:not(:first-child) td:nth-child(2)');
    questions.forEach(function (q, i) {
        q.innerHTML = langQuestions[i];
    });
}
function addRow(i) {
    var newRow = document.createElement("tr");
    var newCol1 = document.createElement("td");
    var newCol2 = document.createElement("td");
    var newCol3 = document.createElement("td");
    var newCol4 = document.createElement("td");
    var numero = document.createTextNode(String(i + 1));
    newCol1.appendChild(numero);
    newCol2.appendChild(document.createTextNode(("")));
    newCol3.appendChild(createRadio(i));
    newCol4.appendChild(createRadio(i));
    newRow.appendChild(newCol1);
    newRow.appendChild(newCol2);
    newRow.appendChild(newCol3);
    newRow.appendChild(newCol4);
    (0, cash_dom_1.default)("#table > tbody")[0].appendChild(newRow);
}
function writeQuestions() {
    (0, cash_dom_1.default)("#btn_procesar").on('click', function () { return process(); });
    (0, cash_dom_1.default)('#lang').on('change', function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if ((0, cash_dom_1.default)('#lang').val() === "es")
                    lang = es_json_1.default;
                else if ((0, cash_dom_1.default)('#lang').val() === "pt")
                    lang = pt_json_1.default;
                setQuestions(lang.questions);
                return [2 /*return*/];
            });
        });
    });
    lang.questions.forEach(function (q, i) { return addRow(i); });
    setQuestions(lang.questions);
}
function writeAreas(areasPorcent) {
    var results = document.getElementsByClassName('areas')[0];
    for (var i = 0; i <= 4; i++) {
        var h1 = document.createElement('h1');
        var p = document.createElement('p');
        h1.innerText = "".concat(lang.areasEstudio[i], " ").concat(areasPorcent[i], " %");
        p.innerText = lang.carreras[i];
        results.appendChild(h1);
        results.appendChild(p);
    }
    var table = document.getElementsByTagName("table")[0];
    table.innerHTML = "";
    var button = document.getElementById("btn_procesar");
    button.style.display = "none";
}
window.onload = writeQuestions;


/***/ }),

/***/ 905:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"questions":["Diseñar programas de computación y explorar nuevas aplicaciones tecnológicas para uso del internet.","Criar, cuidar y tratar animales domésticos y de campo","Investigar sobre áreas verdes, medio ambiente y cambios climáticos","Ilustrar, dibujar y animar digitalmente.","Seleccionar, capacitar y motivar al personal de una organización/empresa","Realizar excavaciones para descubrir restos del pasado","Resolver problemas de cálculo para construir edificaciones.","Diseñar cursos para enseñar a la gente sobre temas de salud e higiene","Tocar un instrumento, componer música y formar parte de un conjunto musical u orquesta.","Planificar cuales son las metas de una organización pública o privada a mediano y largo plazo.","Diseñar y planificar la producción masiva de artículos como muebles, autos, equipos de oficina, empaques y envases para alimentos y otros.","Diseñar logotipos y portadas de una revista","Organizar eventos y atender a sus asistentes.","Atender la salud de personas enfermas.","Controlar ingresos y egresos de fondos y presentar el balance final de una institución","Hacer experimentos con plantas (frutas, árboles, flores)","Concebir planos para viviendas, edificios y ciudadelas.","Investigar y probar nuevos productos farmacéuticos.","Hacer propuestas y formular estrategias para aprovechar las relaciones económicas entre dos países.","Pintar, hacer esculturas, ilustrar libros de arte, etc.","Elaborar campañas para introducir un nuevo producto al mercado.","Examinar y tratar los problemas visuales","Defender a clientes individuales o empresas en juicios de diferente naturaleza.","Diseñar máquinas que puedan simular actividades humanas.","Investigar las causas y efectos de los trastornos emocionales","Supervisar las ventas de un centro comercial","Atender y realizar ejercicios a personas que tienen limitaciones físicas, problemas de lenguaje, etc.","Prepararse para ser modelo profesional.","Aconsejar a las personas sobre planes de ahorro e inversiones.","Elaborar mapas, planos e imágenes para el estudio y análisis de datos geográficos.","Diseñar juegos interactivos electrónicos para computadora.","Realizar el control de calidad de los alimentos","Tener un negocio propio de tipo comercial.","Analizar los fenómenos políticos y participar activamente en ellos.","Escribir guiones de televisión, cuentos, novelas y artículos periodísticos.","Organizar un plan de distribución y venta de un gran almacén.","Estudiar las costumbres y la forma de vida de las comunidades rurales y urbanas.","Gestionar y evaluar convenios internacionales de cooperación para el desarrollo social.","Hacer campañas publicitarias para productos y servicios","Trabajar investigando la reproducción de peces, camarones y otros animales marinos.","Fabricar productos alimenticios de consumo masivo","Gestionar y evaluar proyectos de desarrollo en una institución educativa y/o fundación.","Rediseñar y decorar espacios físicos en viviendas, oficinas y locales comerciales.","Administrar una empresa de turismo y/o agencias de viaje.","Aplicar métodos alternativos a la medicina tradicional para atender personas con dolencias de diversa índole.","Diseñar ropa para niños, jóvenes y adultos.","Investigar organismos vivos para elaborar vacunas.","Manejar y/o dar mantenimiento a dispositivos/aparatos tecnológicos en aviones, barcos, radares, etc.","Estudiar idiomas extranjeros actuales y antiguos- para hacer traducciones.","Restaurar piezas y obras de arte","Revisar y dar mantenimiento a artefactos eléctricos, electrónicos y computadoras.","Enseñar a niños de 0 a 5 años","Investigar y/o sondear nuevos mercados.","Atender la salud dental de las personas","Tratar a niños, jóvenes y adultos con problemas psicológicos.","Crear estrategias de promoción y venta de nuevos productos ecuatorianos en el mercado internacional.","Planificar y recomendar dietas para personas diabéticas y/o con sobrepeso.","Trabajar en una empresa petrolera en cargos técnicos.","Administrar una empresa (familiar, privada o pública)","Tener un taller de reparación y mantenimiento de carros, tractores, etc.","Ejecutar proyectos de extracción minera y metalúrgica.","Asistir a directivos de multinacionales con manejo de varios idiomas.","Diseñar programas educativos para niños con discapacidad.","Aplicar conocimientos de estadística en investigaciones en diversas áreas (social, administrativa, salud, etc.)","Fotografiar hechos históricos, lugares significativos, rostros, paisajes y productos varios.","Trabajar en museos y bibliotecas nacionales e internacionales.","Ser parte de un grupo de teatro.","Producir cortometrajes, spots publicitarios, programas educativos, de ficción, etc.","Estudiar la influencia entre las corrientes marinas y el clima y sus consecuencias ecológicas.","Estudiar profundamente una religión para orientar espiritualmente a las personas que lo necesiten.","Asesorar a inversionistas en la compra de bienes/acciones en mercados nacionales e internacionales.","Participar en la creación de nuevas leyes para mejorar el país.","Explorar el espacio sideral, los planetas , características y componentes.","Mejorar la imagen facial y corporal de las personas aplicando diferentes técnicas.","Decorar jardines de casas y parques públicos.","Administrar y renovar menúes de comidas en un hotel o restaurante.","Trabajar como presentador de televisión, locutor de radio y televisión, animador de programas culturales y concursos.","Diseñar y ejecutar programas de turismo.","Administrar y ordenar adecuadamente la ocupación del espacio físico de ciudades, países etc., utilizando imágenes de satélite, mapas.","Organizar, planificar y administrar centros educativos"],"areasEstudio":["ARTE Y CREATIVIDAD","CIENCIAS SOCIALES","ECONOMICA, ADMINISTRATIVA Y FINANCIERA","CIENCIA Y TECNOLOGÍA","CIENCIAS ECOLÓGICAS, BIOLÓGICAS Y DE LA SALUD"],"carreras":["Diseño Gráfico, Diseño y Decoración de Interiores, Diseño de Jardines, Diseño de Modas, Diseño de Joyas, Artes Plásticas (pintura, escultura, danza, teatro, artesanía, cerámica),  Dibujo Publicitario, Restauración y museología, modelaje, fotografía, Fotografía Digital,  gestión gráfica y publicitaria, locución y publicidad, actuación, Camarografía, Arte Industrial, Producción Audiovisual y Multimedia, Comunicación y Producción en Radio y Televisión, Diseño del Paisaje,  Cine y Video, Comunicación escénica para televisión.","Psicología en general, Trabajo Social, Idiomas, Educación  Internacional,  Historia y Geografía, Periodismo, Periodismo Digital, Derecho, Ciencias Políticas, Sociología, Antropología, Arqueología,  Gestión Social y Desarrollo, Consejería Familiar, Comunicación y publicidad, Administración educativa, Educación Especial, Psicopedagogía, Estimulación Temprana,  Traducción Simultánea, Lingüística, Educación de Párvulos, Bibliotecología, Museología, Relaciones Internacionales y Diplomacia, Comunicación Social con mención en Marketing y Gestión de Empresas, Redacción Creativa y Publicitaria,  Relaciones Públicas y Comunicación Organizacional; Hotelería y Turismo; Teología, Institución Sacerdotal.","Administración de Empresas, Contabilidad, Auditoría, Ventas,  Marketing Estratégico, Gestión y  Negocios Internacionales, Gestión Empresarial, Gestión Financiera,  Ingeniería Comercial, Comercio Exterior, Banca y Finanzas, Gestión de Recursos Humanos, Comunicaciones Integradas en  Marketing, Administración de Empresas Ecoturísticas y de Hospitalidad, Ciencias Económicas y Financieras, Administración y Ciencias Políticas, Ciencias Empresariales, Comercio Electrónico, Emprendedores, Gestión de Organismos Públicos (Municipios, Ministerios, etc.), Gestión de Centros Educativos.","Ingeniería en Sistemas Computacionales,  Geología, Ingeniería Civil, Arquitectura, Electrónica, Telemática, Telecomunicaciones, Ingeniería Mecatrónica  (Robótica), Imagen y Sonido,  Minas, Petróleo y Metalurgia,  Ingeniería Mecánica, Ingeniería Industrial, Física, Matemáticas Aplicadas, Ingeniería en Estadística, Ingeniería Automotriz, Biotecnología Ambiental, Ingeniería Geográfica, Carreras militares (marina, aviación, ejército), Ingeniería en Costas y Obras Portuarias, Estadística Informática, Programación y Desarrollo de Sistemas, Tecnología en Informática Educativa, Astronomía, Ingeniería en ciencias geográficas y desarrollo sustentable ","Biología, Bioquímica, Farmacia, Biología Marina, Bioanálisis, Biotecnología, Ciencias Ambientales,  Zootecnia, Veterinaria, Nutrición y Estética, Cosmetología,  Dietética y Estética, Medicina, Obstetricia, Urgencias Médicas, Odontología, Enfermería, Tecnología, Oceanografía y Ciencias Ambientales, Médica, Agronomía, Horticultura y Fruticultura, Ingeniería de Alimentos, Gastronomía, Chef, Cultura Física, Deportes y Rehabilitación, Gestión Ambiental, Ingeniería Ambiental, Optometría, Homeopatía, Reflexología."]}');

/***/ }),

/***/ 82:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"questions":["Desenhar programas de computação e explorar novas aplicações tecnológicas para uso da internet.","Criar, cuidar e tratar animais domésticos e de campo","Investigar sobre áreas verdes, meio ambiente e mudanças climáticas","Ilustrar, desenhar e animar digitalmente.","Selecionar, capacitar e motivar o pessoal de uma organização/empresa","Realizar escavações para descobrir restos do passado","Resolver problemas de cálculo para construir edificações.","Desenhar cursos para ensinar as pessoas sobre temas de saúde e higiene","Tocar um instrumento, compor música e fazer parte de um conjunto musical ou orquestra.","Planejar quais são as metas de uma organização pública ou privada a médio e longo prazo.","Desenhar e planejar a produção em massa de artigos como móveis, carros, equipamentos de escritório, embalagens e envases para alimentos e outros.","Desenhar logotipos e capas de uma revista","Organizar eventos e atender aos seus assistentes.","Atender a saúde de pessoas doentes.","Controlar rendimentos e despesas de fundos e apresentar o balanço final de uma instituição","Fazer experimentos com plantas (frutas, árvores, flores)","Conceber planos para residências, edifícios e cidadelas.","Investigar e testar novos produtos farmacêuticos.","Fazer propostas e formular estratégias para aproveitar as relações econômicas entre dois países.","Pintar, fazer esculturas, ilustrar livros de arte, etc.","Elaborar campanhas para introduzir um novo produto no mercado.","Examinar e tratar problemas visuais","Defender clientes individuais ou empresas em julgamentos de diferentes naturezas.","Desenhar máquinas que possam simular atividades humanas.","Investigar as causas e efeitos dos transtornos emocionais","Supervisionar as vendas de um centro comercial","Atender e realizar exercícios para pessoas com limitações físicas, problemas de linguagem, etc.","Preparar-se para ser modelo profissional.","Aconselhar as pessoas sobre planos de poupança e investimentos.","Elaborar mapas, planos e imagens para o estudo e análise de dados geográficos.","Desenhar jogos interativos eletrônicos para computador.","Realizar o controle de qualidade dos alimentos","Ter um negócio próprio de tipo comercial.","Analisar os fenômenos políticos e participar ativamente deles.","Escrever roteiros para televisão, contos, romances e artigos jornalísticos.","Organizar um plano de distribuição e venda de um grande armazém.","Estudar as costumes e a forma de vida das comunidades rurais e urbanas.","Gerenciar e avaliar acordos internacionais de cooperação para o desenvolvimento social.","Fazer campanhas publicitárias para produtos e serviços","Trabalhar investigando a reprodução de peixes, camarões e outros animais marinhos.","Fabricar produtos alimentícios de consumo em massa","Gerenciar e avaliar projetos de desenvolvimento em uma instituição educacional e/ou fundação.","Redesenhar e decorar espaços físicos em residências, escritórios e lojas comerciais.","Administrar uma empresa de turismo e/ou agências de viagem.","Aplicar métodos alternativos à medicina tradicional para atender pessoas com doenças de diversas naturezas.","Desenhar roupas para crianças, jovens e adultos.","Investigar organismos vivos para elaborar vacinas.","Manusear e/ou dar manutenção a dispositivos/aparelhos tecnológicos em aviões, navios, radares, etc.","Estudar idiomas estrangeiros - atuais e antigos- para fazer traduções.","Restaurar peças e obras de arte","Revisar e dar manutenção a artefatos elétricos, eletrônicos e computadores.","Ensinar crianças de 0 a 5 anos","Investigar e/ou sondar novos mercados.","Atender a saúde dental das pessoas","Tratar crianças, jovens e adultos com problemas psicológicos.","Criar estratégias de promoção e venda de novos produtos equatorianos no mercado internacional.","Planejar e recomendar dietas para pessoas diabéticas e/ou com sobrepeso.","Trabalhar em uma empresa petrolífera em cargos técnicos.","Administrar uma empresa (familiar, privada ou pública)","Ter um ateliê de reparação e manutenção de carros, tratores, etc.","Executar projetos de extração minera e metalúrgica.","Assistir executivos de multinacionais com manuseio de vários idiomas.","Desenhar programas educativos para crianças com deficiência.","Aplicar conhecimentos de estatística em investigações em diversas áreas (social, administrativa, saúde, etc.)","Fotografar fatos históricos, lugares significativos, rostos, paisagens e produtos variados.","Trabalhar em museus e bibliotecas nacionais e internacionais.","Fazer parte de um grupo de teatro.","Produzir curtas-metragens, spots publicitários, programas educativos, de ficção, etc.","Estudar a influência entre as correntes marinhas e o clima e suas consequências ecológicas.","Estudar profundamente uma religião para orientar espiritualmente as pessoas que precisam.","Assessorar investidores na compra de bens/ações em mercados nacionais e internacionais.","Participar na criação de novas leis para melhorar o país.","Explorar o espaço sideral, os planetas, características e componentes.","Melhorar a imagem facial e corporal das pessoas aplicando diferentes técnicas.","Decorar jardins de casas e parques públicos.","Administrar e renovar cardápios de refeições em um hotel ou restaurante.","Trabalhar como apresentador de televisão, locutor de rádio e televisão, animador de programas culturais e concursos.","Projetar e executar programas de turismo.","Administrar e organizar adequadamente a ocupação do espaço físico de cidades, países etc., usando imagens de satélite, mapas.","Organizar, planejar e administrar centros educacionais"],"areasEstudio":["ARTE E CRIATIVIDADE","CIÊNCIAS SOCIAIS","ECONÔMICA, ADMINISTRATIVA E FINANCEIRA","CIÊNCIA E TECNOLOGIA","CIÊNCIAS ECOLÓGICAS, BIOLÓGICAS E DA SAÚDE"],"carreras":["Design Gráfico, Design e Decoração de Interiores, Design de Jardins, Design de Moda, Design de Jóias, Artes Plásticas (pintura, escultura, dança, teatro, artesanato, cerâmica), Desenho Publicitário, Restauração e museologia, modelagem, fotografia, Fotografia Digital, gestão gráfica e publicitária, locução e publicidade, atuação, Camarografia, Arte Industrial, Produção Audiovisual e Multimídia, Comunicação e Produção em Rádio e Televisão, Design de Paisagem, Cinema e Vídeo, Comunicação cênica para televisão.","Psicologia em geral, Trabalho Social, Idiomas, Educação Internacional, História e Geografia, Jornalismo, Jornalismo Digital, Direito, Ciências Políticas, Sociologia, Antropologia, Arqueologia, Gestão Social e Desenvolvimento, Conselhos Familiares, Comunicação e publicidade, administração educacional, Educação Especial, Psicopedagogia, Estímulo Precoce, Tradução Simultânea, Linguística, Educação de Crianças, Biblioteconomia, Museologia, Relações Internacionais e Diplomacia, Comunicação Social com ênfase em Marketing e Gestão de Empresas, Redação Criativa e Publicitária, Relações Públicas e Comunicação Organizacional; Hotelaria e Turismo; Teologia, Instituição Sacerdotal.","Administração de Empresas, Contabilidade, Auditoria, Vendas, Marketing Estratégico, Gestão e Negócios Internacionais, Gestão Empresarial, Gestão Financeira, Engenharia Comercial, Comércio Exterior, Banca e Finanças, Gestão de Recursos Humanos, Comunicações Integradas em Marketing, Administração de Empresas Ecoturísticas e de Hospitalidade, Ciências Econômicas e Financeiras, Administração e Ciências Políticas, Ciências Empresariais, Comércio Eletrônico, Empreendedorismo, Gestão de Organismos Públicos (Municípios, Ministérios, etc.), Gestão de Centros Educacionais.","Ingeniería en Sistemas Computacionales,  Geología, Ingeniería Civil, Arquitectura, Electrónica, Telemática, Telecomunicaciones, Ingeniería Mecatrónica  (Robótica), Imagen y Sonido,  Minas, Petróleo y Metalurgia,  Ingeniería Mecánica, Ingeniería Industrial, Física, Matemáticas Aplicadas, Ingeniería en Estadística, Ingeniería Automotriz, Biotecnología Ambiental, Ingeniería Geográfica, Carreras militares (marina, aviación, ejército), Ingeniería en Costas y Obras Portuarias, Estadística Informática, Programación y Desarrollo de Sistemas, Tecnología en Informática Educativa, Astronomía, Ingeniería en ciencias geográficas y desarrollo sustentable ","Biología, Bioquímica, Farmacia, Biología Marina, Bioanálisis, Biotecnología, Ciencias Ambientales,  Zootecnia, Veterinaria, Nutrición y Estética, Cosmetología,  Dietética y Estética, Medicina, Obstetricia, Urgencias Médicas, Odontología, Enfermería, Tecnología, Oceanografía y Ciencias Ambientales, Médica, Agronomía, Horticultura y Fruticultura, Ingeniería de Alimentos, Gastronomía, Chef, Cultura Física, Deportes y Rehabilitación, Gestión Ambiental, Ingeniería Ambiental, Optometría, Homeopatía, Reflexología."]}');

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
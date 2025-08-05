/**
 * _.assign(object, [sources])
 * 分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。
 *
 * 注意: 这方法会改变 object，参考自Object.assign.
 *
 *     添加版本
 * 0.10.0
 *
 * 参数
 * object (Object): 目标对象。
 * [sources] (...Object): 来源对象。
 * 返回
 * (Object): 返回 object.
 *
 *     例子
 * function Foo() {
 *     this.a = 1;
 * }
 *
 * function Bar() {
 *     this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */

function assign(targetObj, ...sources) {
    if (targetObj == null) {
        throw new Error('cannot convert undefined or null to object')
    }

    const target = Object(targetObj)

    for (const source of sources) {
        if (source != null) {
            for (const sourceKey in source) {
                if (Object.prototype.hasOwnProperty.call(source, sourceKey)) {
                    target[sourceKey] = source[sourceKey]
                }
            }
        }
    }
    return target
}

function Foo() {
    this.a = 1;
}

function Bar() {
    this.c = 3;
}

Foo.prototype.b = 2;
Bar.prototype.d = 4;

console.log(assign({'a': 0}, new Foo, new Bar));
// => { 'a': 1, 'c': 3 }
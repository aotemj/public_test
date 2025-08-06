/**
 * _.assignIn(object, [sources])
 * 这个方法类似_.assign， 除了它会遍历并继承来源对象的属性。
 *
 * Note: 这方法会改变 object。
 *
 * 添加版本
 * 4.0.0
 *
 * Aliases
 * _.extend
 *
 * 参数
 * object (Object): 目标对象。
 * [sources] (...Object): 来源对象。
 * 返回
 * (Object): 返回 object。
 *
 * 例子
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 *
 *
 * 上一页
 * _.assign
 */

function assignIn(targetObj, ...sources) {
    if (targetObj == null) {
        throw new Error('cannot convert undefined or null to object')
    }

    const target = Object(targetObj)
    for (const source of sources) {
        if (source != null) {
            // 所有可枚举属性
            for (const sourceKey in source) {
                target[sourceKey] = source[sourceKey]
            }

            const symbols = Object.getOwnPropertySymbols(source)
            for (const symbol of symbols) {
                if (Object.prototype.propertyIsEnumerable.call(source, symbol)) {
                    target[symbol] = source[symbol]
                }
            }

        }
    }
    return targetObj
}

// function Foo() {
//     this.a = 1;
// }
//
// function Bar() {
//     this.c = 3;
// }
//
// Foo.prototype.b = 2;
// Bar.prototype.d = 4;
//
// // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
//
// // 测试 assignIn 对 Symbol 属性的处理
// function testSymbolCopy() {
//     // 创建一个 Symbol 作为属性键
//     const symKey = Symbol('testSymbol');
//
//     // 源对象包含 Symbol 属性
//     const source = {
//         [symKey]: 'symbolValue', normalKey: 'normalValue'
//     };
//
//     const globalSymbol = Symbol.for('test global symbol')
//     const testSymbol = Symbol('test hidden symbol')
//     Object.defineProperty(source, testSymbol, {
//         get(value) {
//             console.log('get symbol', value)
//             return value
//         },
//         enumerable: true,
//         set(value) {
//             console.log('setter');
//             this.value = value
//         }
//         // value: '不可枚举的symbol'
//     })
//
//     // 确保 Symbol 属性是可枚举的（默认创建的 Symbol 属性是可枚举的）
//     console.log('源对象的 Symbol 属性是否可枚举:', Object.prototype.propertyIsEnumerable.call(source, symKey)); // 应输出 true
//
//     // 目标对象
//     const target = {};
//
//     // 执行 assignIn
//     const result = assignIn(target, source);
//     result[testSymbol] = '123'
//     console.log(result[testSymbol], 'result[testSymbol]');
//     console.log(result, 'result');
//     console.log(source, 'source');
//     // 验证结果
//     console.log('目标对象是否包含 Symbol 属性:', symKey in result); // 应输出 true
//     console.log('Symbol 属性值是否正确:', result[symKey] === 'symbolValue'); // 应输出 true
//     console.log('普通属性是否正确复制:', result.normalKey === 'normalValue'); // 应输出 true
// }
//
// // 运行测试
// testSymbolCopy();
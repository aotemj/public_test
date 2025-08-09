/**_.assignWith(object, sources, [customizer])
 这个方法类似_.assign ， 除了它接受一个 customizer 决定如何分配值。 如果customizer返回 undefined 将会由分配处理方法代替。customizer 会传入5个参数： (objValue, srcValue, key, object, source)。

 Note: 这方法会改变 object.

 添加版本
 4.0.0

 参数
 object (Object): 目标对象。
 sources (...Object): 来源对象。
 [customizer] (Function): 这个函数用来自定义分配的值。
 返回
 (Object): 返回 object.

 例子
 function customizer(objValue, srcValue) {
 return _.isUndefined(objValue) ? srcValue : objValue;
 }

 var defaults = _.partialRight(_.assignWith, customizer);

 defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 // => { 'a': 1, 'b': 2 }
 */

function assignWith(target, ...rest) {
	if (target == null) {
		throw new Error('cannot convert undefined or null to object')
	}

	let customizer = null

	const lastParam = rest.at(-1)

	if (typeof lastParam === 'function') {
		customizer = rest.pop()
	}

	const sources = rest

	let targetObj = Object(target)

	if (!sources.length) {
		return targetObj
	}

	for (const source of sources) {
		if (source != null) {
			for (const sourceKey in source) {
				if (Object.prototype.hasOwnProperty.call(source, sourceKey)) {
					if (customizer) {
						const objectValue = targetObj[sourceKey]
						const sourceValue = source[sourceKey]
						targetObj[sourceKey] = customizer(objectValue, sourceValue, sourceKey, targetObj, source)
					} else {
						targetObj[sourceKey] = source[sourceKey]
					}
				}

			}

			const symbols = Object.getOwnPropertySymbols(source)

			for (const symbol of symbols) {
				if (Object.prototype.propertyIsEnumerable.call(source, symbol)) {
					targetObj[symbol] = source[symbol]
				}
			}
		}
	}

	return targetObj
}


function customizer(objValue, srcValue) {
	return _.isUndefined(objValue) ? srcValue : objValue
}

var defaults = _.partialRight(_.assignWith, customizer)

defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 })
// => { 'a': 1, 'b': 2 }
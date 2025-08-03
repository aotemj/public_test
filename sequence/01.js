/**
 * 实现一个sequence函数
 * 实现一个支持链式调用的工具，要求：
 * sequence()
 *   .add(() => console.log('第一步'))
 *   .wait(1)
 *   .add(() => console.log('第二步'))
 *   .wait(2)
 *   .add(() => console.log('第三步'))
 *   .run();
 *
 * // 输出顺序：
 * // 第一步
 * // 等待1秒
 * // 第二步
 * // 等待2秒
 * // 第三步
 */

function sequence() {

    const tasks = []

    function add(task) {
        tasks.push(task)
        return this
    }

    function wait(second) {
        tasks.push(() => {
            return new Promise((resolve) => {
                setTimeout(resolve, second * 1000)
                console.log(`等待${second}秒`);
            })
        })
        return this

    }

    function run() {
        (async () => {
            for (const task of tasks) {
                await task()
            }
        })()
        return this
    }

    return {
        add,
        wait,
        run
    }
}

sequence()
    .add(() => console.log('第一步'))
    .wait(1)
    .add(() => console.log('第二步'))
    .wait(2)
    .add(() => console.log('第三步'))
    .run();
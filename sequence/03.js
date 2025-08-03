/**
 * 实现支持并行任务的调度器
 * scheduler()
 *   .parallel([
 *     () => new Promise(resolve => setTimeout(() => {
 *       console.log('并行任务1');
 *       resolve();
 *     }, 1000)),
 *     () => new Promise(resolve => setTimeout(() => {
 *       console.log('并行任务2');
 *       resolve();
 *     }, 2000))
 *   ])
 *   .then(() => console.log('并行任务结束'))
 *   .run();
 *
 * // 输出：
 * // 1秒后打印"并行任务1"
 * // 2秒后打印"并行任务2"（总耗时2秒，非3秒）
 * // 然后打印"并行任务结束"
 */
function scheduler() {
    let tasks = []
    let thenCallbacks = []

    function parallel(task) {
        tasks = task
        return this
    }

    async function run() {
        const promises = tasks.map(fn => fn())

        Promise.all(promises).then(() => {
            for (const thenCallback of thenCallbacks) {
                thenCallback?.()
            }
        })

    }

    function then(callback) {

        thenCallbacks.push(callback)

        return this
    }

    return {
        parallel,
        run,
        then
    }
}

scheduler()
    .parallel([
        () => new Promise(resolve => setTimeout(() => {
            console.log('并行任务1');
            resolve();
        }, 1000)),
        () => new Promise(resolve => setTimeout(() => {
            console.log('并行任务2');
            resolve();
        }, 2000))
    ])
    .then(() => console.log('并行任务结束'))
    .then(() => console.log('并行任务结束2'))
    .run();

// 输出：
// 1秒后打印"并行任务1"
// 2秒后打印"并行任务2"（总耗时2秒，非3秒）
// 然后打印"并行任务结束"
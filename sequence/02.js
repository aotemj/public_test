/**
 * 实现带「取消功能」的任务链
 * const task = pipeline()
 *   .delay(3, () => console.log('任务1'))
 *   .delay(2, () => console.log('任务2'));
 *
 * task.run();
 * setTimeout(() => task.cancel(), 4000);
 *
 * // 输出：
 * // 等待3秒后执行"任务1"
 * // 执行到第4秒时取消，不执行"任务2"
 */

function pipeline() {
    const tasks = []
    let isCanceled = false
    let currentTimer = null


    function delay(second, singleTask, taskName) {
        tasks.push(() => {
            return new Promise((resolve) => {
                console.log(`等待${second}秒后执行"${taskName}"`);
                currentTimer = setTimeout(() => {
                    currentTimer = null
                    if (!isCanceled) {
                        singleTask()
                    }
                    resolve()
                }, second * 1000)
            })
        })
        return this
    }

    function run() {
        (async () => {
            for (const task of tasks) {
                if (isCanceled) {
                    console.log('任务已取消');
                    break
                }
                await task()
            }
        })()
        return this
    }


    function cancel() {
        if (isCanceled) {
            return
        }
        isCanceled = true
        console.log('收到取消指令，正在终止任务...');
        if (currentTimer) {
            clearTimeout(currentTimer)
            currentTimer = null
        }
    }

    return {
        run,
        delay,
        cancel
    }
}

const task = pipeline()
    .delay(3, () => console.log('任务1执行完成'), '任务1')
    .delay(2, () => console.log('任务2执行完成'), '任务2');

task.run();
setTimeout(() => task.cancel(), 4000);
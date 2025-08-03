/**
 * 实现带「重试机制」的异步调用
 * retryable()
 *   .task(() => new Promise((resolve, reject) => {
 *     const random = Math.random();
 *     if (random > 0.5) resolve('成功');
 *     else reject('失败');
 *   }))
 *   .maxRetries(3)
 *   .interval(1)
 *   .execute()
 *   .then(console.log)
 *   .catch(console.error);
 *
 * // 功能：任务失败后每隔1秒重试，最多3次
 * // 若3次都失败则触发catch，否则触发then
 */
function retryable() {

    let maxRetryCount = 0
    let currentRetryCount = 0
    let _interval = 0
    let currentTask

    function task(task) {
        currentTask = task
        return this
    }


    function maxRetries(maxRetries) {
        maxRetryCount = maxRetries
        return this
    }

    function interval(interval) {
        _interval = interval
        return this
    }


    function execute() {

        return new Promise((resolve, reject) => {

            async function attempt() {
                try {
                    const result = await currentTask?.()
                    resolve(result)
                } catch (e) {
                    currentRetryCount++

                    if (currentRetryCount <= maxRetryCount) {
                        console.log(`第${currentRetryCount}次重试`);
                        await new Promise((res) => setTimeout(res, _interval * 1000))
                        await attempt()
                    } else {
                        console.log('超过最大重试次数');
                        reject(e)
                    }
                }
            }

            attempt()
        })

    }


    return {
        task,
        maxRetries,
        interval,
        execute,
    }
}


retryable()
    .task(() => new Promise((resolve, reject) => {
        const random = Math.random();
        if (random > 0.5) resolve('成功');
        else reject('失败');
    }))
    .maxRetries(3)
    .interval(1)
    .execute()
    .then(console.log)
    .catch(console.error);

// 功能：任务失败后每隔1秒重试，最多3次
// 若3次都失败则触发catch，否则触发then
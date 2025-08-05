/**
 * 实现按「优先级」执行的任务队列
 * priorityQueue()
 *   .add(1, () => console.log('低优先级任务'))
 *   .add(3, () => console.log('高优先级任务'))
 *   .add(2, () => console.log('中优先级任务'))
 *   .process();
 *
 * // 输出顺序（按优先级从高到低）：
 * // 高优先级任务
 * // 中优先级任务
 * // 低优先级任务
 */

function priorityQueue() {
    let tasks = []

    function add(priority, task) {
        tasks = [...tasks, {priority, task}]
        return this
    }

    function process() {
        const tempTasks = tasks.toSorted((taskItemA, taskIteB) => {
            return taskIteB.priority - taskItemA.priority
        })
        for (const task of tempTasks) {
            task.task?.()
        }
    }

    return {
        add, process
    }
}

priorityQueue()
    .add(1, () => console.log('低优先级任务'))
    .add(3, () => console.log('高优先级任务'))
    .add(2, () => console.log('中优先级任务'))
    .process();

// 输出顺序（按优先级从高到低）：
// 高优先级任务
// 中优先级任务
// 低优先级任务
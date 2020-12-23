import { add } from './math'
import { message, name } from './myModule'

const sayHello = () => `Hello, ${name}!`
console.log(sayHello())
console.log(add(3, 10))
console.log(message)


import useCounter from '../Utilities/use-counter'

const Decrement = () => {
    let counter =  useCounter(false)
  return (
    <div>{counter}</div>
  )
}

export default Decrement

import useCounter from '../Utilities/use-counter'

const Increment = () => {
  let counter =  useCounter()
  return (
    <div>{counter}</div>
  )
}

export default Increment
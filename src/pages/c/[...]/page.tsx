import { useParams } from 'react-router'

export default () => {
  const pararms = useParams()
  console.log(pararms)
  return 'ccc'
}

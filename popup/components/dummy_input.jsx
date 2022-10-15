import { useState } from "react"

function InputBox() {
  const [data, setData] = useState("")

  return <input onChange={(e) => setData(e.target.value)} value={data} />
}

export default InputBox

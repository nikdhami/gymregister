import { useState, useEffect, useRef } from "react";

export const SwipeScreen = () => {
  const onChangeListner = () => {};
  const inputRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState({ status: 'loading', message: 'Please Swipe' })
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (isSubmitting) return
//     if (inputRef.current.value === '') return
//     setIsSubmitting(true)
//     inputRef.current.disabled = true
//     const inputData = inputRef.current.value

//     let employeeID = inputData.slice(0, 9)
//     if (employeeID.length < 9) {
//       const zeroesNeeded = 8 - employeeID.length
//       employeeID = `6${'0'.repeat(zeroesNeeded)}${employeeID}`
//     }
//     console.log(employeeID)
// }
const handleSubmit = (e) => {
    e.preventDefault()
    if (isSubmitting) return
    if (inputRef.current.value === '') return
    setIsSubmitting(true)
    inputRef.current.disabled = true
    const inputData = inputRef.current.value

    let employeeID = inputData.slice(0, 9)
    if (employeeID.length < 9) {
      const zeroesNeeded = 8 - employeeID.length
      employeeID = `6${'0'.repeat(zeroesNeeded)}${employeeID}`
    }

    const regex = /^\d{9}$/
    if (!regex.test(employeeID)) {
      inputRef.current.disabled = false
      inputRef.current.value = ''
      inputRef.current.focus()
      setIsSubmitting(false)
      return
    }
    const body = {
      employeeID: employeeID,
      in_timestamp: Date.now()
    }

    const checkIn = async () => {
      console.log(body)
      try {
        // const data = await fetch('http://10.194.20.139:56000/api/checkin/', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(body)
        // });
        // const res = await data.json()
        // console.log(res)
        // setData(res)
        // if (res.status === 'success') {
        //   let newCount = event.EVENT_COUNT + 1

        //     let updateEventCount = {
        //   ...event,
        //   EVENT_COUNT: newCount
        // }
        // setEvent(updateEventCount)
        // }

      } catch (error) {
        console.log(error)
      } finally {
        setIsSubmitting(false) // Reset isSubmitting to false after request completes
        inputRef.current.disabled = false
        inputRef.current.value = ''
        inputRef.current.focus()
      }
    }
    checkIn()
  }
  return (
    <div>
      {/* <h1>Gym Register</h1>
        <input type='number'
        placeholder='Swipe Card'
        onChange={onChangeListner}></input> */}

      <form>
        <input
          ref={inputRef}
          type="number"
          className="input"
          onBlur={() => inputRef.current.focus()}
          placeholder="Swipe Employee Badge..."
        />
        <button type="submit" className="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

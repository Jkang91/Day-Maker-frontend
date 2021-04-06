import { useState } from 'react'
import {useHistory} from 'react-router-dom'

function NewDay({ currentUser, days, setDays }) {

    const history = useHistory()
    
    const [formData, setFormData] = useState({
        user_id: currentUser.id,
        date: ""
    })

    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData({...formData, date: e.target.value})
    }

    const makeMyDay = () => {

        const dateArray = formData.date.split("-")

        const [year, month, day] = dateArray

        const newDayObj = {
            ...formData,
            date: `${year}` + `-` + `${month}` + `-` + `${parseInt(day)}`
        }
        
        fetch(`${process.env.REACT_APP_RAILS_URL}/days`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDayObj)
        })
            .then(resp => resp.json())
            .then(dayObj => {
                console.log(dayObj)
                setDays([...days, dayObj])
                history.push('/days')
            })
    }
    
    return (
        <div style={{margin: "auto", width: "25%", padding: "10px", marginTop: "25px"}}>
            <input type="date" value={formData.date} onChange={handleChange}></input>
            <button onClick={makeMyDay} className="w3-button w3-indigo">Make My Day!</button>
        </div>
    )
}

export default NewDay;
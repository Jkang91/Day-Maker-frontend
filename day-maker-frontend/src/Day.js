import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Popup from "reactjs-popup"
import './style.css'


function Day({ currentUser, setDays, day, breakfastRests, lunchRests, dinnerRests, deleteDay, morningAttractions, afternoonAttractions, eveningAttractions }) {

    console.log(currentUser)
    const history = useHistory()

    const [newBreakfast, setNewBreakfast] = useState("")
    const [newLunch, setNewLunch] = useState("")
    const [newDinner, setNewDinner] = useState("")
    const [newAttr1, setNewAttr1] = useState("")
    const [newAttr2, setNewAttr2] = useState("")
    const [newAttr3, setNewAttr3] = useState("")
    const [isEditingBreak, setIsEditingBreak] = useState(false)
    const [isEditingLunch, setIsEditingLunch] = useState(false)
    const [isEditingDinner, setIsEditingDinner] = useState(false)
    const [isEditingEvent1, setIsEditingEvent1] = useState(false)
    const [isEditingEvent2, setIsEditingEvent2] = useState(false)
    const [isEditingEvent3, setIsEditingEvent3] = useState(false)


    const { user_id, restaurants, attractions, day_restaurants, day_attractions } = day


    const getFreshDays = () => {
        fetch(`${process.env.REACT_APP_RAILS_URL}/${currentUser.id}/days`)
            .then(resp => resp.json())
            .then(daysArray => {
                setDays(daysArray)
            })
    }

    let breakfast = ""
    let lunch = ""
    let dinner = ""
    let morning = ""
    let afternoon = ""
    let evening = ""


    day_restaurants.forEach((rest) => {
        if (rest.restaurant.category === "breakfast") {
            breakfast = rest
        } else if (rest.restaurant.category === "lunch") {
            lunch = rest
        } else if (rest.restaurant.category === "dinner") {
            dinner = rest
        }
    })

    day_attractions.forEach((attr) => {
        if (attr.attraction.hour === "morning") {
            morning = attr
        } else if (attr.attraction.hour === "afternoon") {
            afternoon = attr
        } else if (attr.attraction.hour === "evening") {
            evening = attr
        }
    })



    const toggleEditBreak = () => {
        setIsEditingBreak((isEditingBreak) => !isEditingBreak)
    }
    const toggleEditLunch = () => {
        setIsEditingLunch((isEditingLunch) => !isEditingLunch)
    }
    const toggleEditDinner = () => {
        setIsEditingDinner((isEditingDinner) => !isEditingDinner)
    }
    const toggleEditEvent1 = () => {
        setIsEditingEvent1((isEditingEvent1) => !isEditingEvent1)
    }
    const toggleEditEvent2 = () => {
        setIsEditingEvent2((isEditingEvent2) => !isEditingEvent2)
    }
    const toggleEditEvent3 = () => {
        setIsEditingEvent3((isEditingEvent3) => !isEditingEvent3)
    }


    const handleEditBreakfast = (id) => {
        const updatedBreakfast = {
            day_id: day.id,
            restaurant_id: parseInt(newBreakfast)
        }
        fetch(`${process.env.REACT_APP_RAILS_URL}/day_restaurants/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBreakfast)
        })
            .then(resp => resp.json())
            .then(updatedBreakfastObj => {
                // handleUpdate(updatedBreakfastObj)
                getFreshDays()
                setIsEditingBreak(false)
                history.push("/days")
            })
    }

    const handleEditLunch = (id) => {
        const updatedLunch = {
            day_id: day.id,
            restaurant_id: parseInt(newLunch)
        }
        fetch(`${process.env.REACT_APP_RAILS_URL}/day_restaurants/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedLunch)
        })
            .then(resp => resp.json())
            .then(updatedLunchObj => {
                getFreshDays()
                // handleUpdate(updatedLunchObj)
                setIsEditingLunch(false)
                history.push("/days")
            })
    }

    const handleEditDinner = (id) => {
        const updatedDinner = {
            day_id: day.id,
            restaurant_id: parseInt(newDinner)
        }
        fetch(`${process.env.REACT_APP_RAILS_URL}/day_restaurants/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDinner)
        })
            .then(resp => resp.json())
            .then(updatedDinnerObj => {
                // handleUpdate(updatedDinnerObj)
                getFreshDays()
                setIsEditingDinner(false)
                history.push("/days")
            })
    }

    const handleEditEvent1 = (id) => {
        const updatedAttraction = {
            day_id: day.id,
            attraction_id: parseInt(newAttr1)
        }
        fetch(`${process.env.REACT_APP_RAILS_URL}/day_attractions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAttraction)
        })
            .then(resp => resp.json())
            .then(updatedAttrObj => {
                getFreshDays()
                setIsEditingEvent1(false)
                history.push("/days")

            })
    }

    const handleEditEvent2 = (id) => {
        const updatedAttraction = {
            day_id: day.id,
            attraction_id: parseInt(newAttr2)
        }
        fetch(`${process.env.REACT_APP_RAILS_URL}/day_attractions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAttraction)
        })
            .then(resp => resp.json())
            .then(updatedAttrObj => {
                getFreshDays()
                setIsEditingEvent2(false)
                history.push("/days")
            })
    }

    const handleEditEvent3 = (id) => {
        const updatedAttraction = {
            day_id: day.id,
            attraction_id: parseInt(newAttr3)
        }
        fetch(`${process.env.REACT_APP_RAILS_URL}/day_attractions/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAttraction)
        })
            .then(resp => resp.json())
            .then(updatedAttrObj => {
                getFreshDays()
                setIsEditingEvent3(false)
                history.push("/days")
            })
    }

    const bRestChoices = breakfastRests.map((rest) => {
        return (
            <option key={rest.id} value={rest.id}>{rest.name}</option>
        )
    })

    const lRestChoices = lunchRests.map((rest) => {
        return (
            <option key={rest.id} value={rest.id}>{rest.name}</option>
        )
    })

    const dRestChoices = dinnerRests.map((rest) => {
        return (
            <option key={rest.id} value={rest.id}>{rest.name}</option>
        )
    })

    const morningAttrChoices = morningAttractions.map((attr) => {
        return (
            <option key={attr.id} value={attr.id}>{attr.name}</option>
        )
    })

    const afternoonAttrChoices = afternoonAttractions.map((attr) => {
        return (
            <option key={attr.id} value={attr.id}>{attr.name}</option>
        )
    })

    const eveningAttrChoices = eveningAttractions.map((attr) => {
        return (
            <option key={attr.id} value={attr.id}>{attr.name}</option>
        )
    })

    const editBreakfastChange = (e) => {
        setNewBreakfast(e.target.value)
    }

    const editLunchChange = (e) => {
        setNewLunch(e.target.value)
    }

    const editDinnerChange = (e) => {
        setNewDinner(e.target.value)
    }

    const editEvent1Change = (e) => {
        setNewAttr1(e.target.value)
    }

    const editEvent2Change = (e) => {
        setNewAttr2(e.target.value)
    }

    const editEvent3Change = (e) => {
        setNewAttr3(e.target.value)
    }

    const handleDelete = (id) => {
        fetch(`${process.env.REACT_APP_RAILS_URL}/days/${id}`, {
            method: 'DELETE'
        })
            .then(deleteDay(id))
    }

    const changeColor = (e) => {
        e.target.style.color = 'blue'
    }

    const changeColor2 = (e) => {
        e.target.style.color = ''
    }



    return (
        <>
            <div className="w3-third w3-container w3-margin-bottom w3-round" style={{ background: "white", "border-style": "solid" }}>
                <button className="w3-display-topright" style={{ position: "relative", marginLeft: "400px", marginTop: "10px" }} onClick={() => handleDelete(day.id)}>X</button>
                <h1 style={{ "font-family": "Bradley Hand, cursive" }}>{new Date(day.date).toDateString()}</h1>
                <Popup
                    trigger={
                        <div>
                            <div style={{ position: "relative" }}>
                                <h4 style={{ cursor: "pointer" }} onMouseEnter={changeColor} onMouseLeave={changeColor2} >
                                    <b>Breakfast</b> 🍳 - {breakfast.restaurant.name}
                                </h4>

                            </div>
                        </div>}
                    modal>
                    <div className="w3-container modal-test">
                        <div className="content">
                            <img style={{ width: "300px", border: "solid", borderColor: "black" }} className="w3-image w3-round" src={breakfast.restaurant.image} alt={breakfast.restaurant.name} />
                            <h3><b>Cuisine: </b>{breakfast.restaurant.cuisine}</h3>
                            <h4><b>Category: </b>{breakfast.restaurant.category}</h4>
                            <h5><b>Description: </b>{breakfast.restaurant.description}</h5>
                            <h5><b>Location: </b>{breakfast.restaurant.location}</h5>
                        </div>
                    </div>
                </Popup>
                {isEditingBreak ? (
                    <>
                        <select onChange={editBreakfastChange}>
                            {bRestChoices}
                        </select>
                        <button onClick={() => handleEditBreakfast(breakfast.id)}>Save</button>
                    </>
                ) : (
                        <button className="w3-button w3-indigo  w3-margin-right" onClick={toggleEditBreak}>✎</button>
                    )}
                <Popup
                    trigger={
                        <div style={{ position: "relative" }}>
                            <h4 style={{ cursor: "pointer" }} onMouseEnter={changeColor} onMouseLeave={changeColor2} >
                                <b>Morning Activity</b> 🏃‍♀️ - {morning.attraction.name}
                            </h4>

                        </div>}
                    modal>
                    <div className="w3-container modal-test">
                        <div className="content">
                            <img style={{ width: "300px", border: "solid", borderColor: "black" }} className="w3-image w3-round" src={morning.attraction.image} alt={morning.attraction.name} />
                            <h3><b>Category: </b>{morning.attraction.category}</h3>
                            <h4><b>Description: </b>{morning.attraction.description}</h4>
                            <h5><b>Location: </b>{morning.attraction.location}</h5>
                        </div>
                    </div>
                </Popup>
                {isEditingEvent1 ? (
                    <>
                        <select onChange={editEvent1Change}>
                            {morningAttrChoices}
                        </select>
                        <button onClick={() => handleEditEvent1(morning.id)}>Save</button>
                    </>
                ) : (
                        <button className="w3-button w3-indigo w3-margin-right" onClick={toggleEditEvent1}>✎</button>
                    )}
                <Popup
                    trigger={<div style={{ position: "relative" }}>
                        <h4 style={{ cursor: "pointer" }} onMouseEnter={changeColor} onMouseLeave={changeColor2} >
                            <b>Lunch</b> 🥪 - {lunch.restaurant.name}
                        </h4>

                    </div>}
                    modal>
                    <div className="w3-container modal-test">
                        <div className="content">
                            <img style={{ width: "300px", border: "solid", borderColor: "black" }} className="w3-image w3-round" src={lunch.restaurant.image} alt={lunch.restaurant.name} />
                            <h3><b>Cuisine: </b>{lunch.restaurant.cuisine}</h3>
                            <h4><b>Category: </b>{lunch.restaurant.category}</h4>
                            <h5><b>Description: </b>{lunch.restaurant.description}</h5>
                            <h5><b>Location: </b>{lunch.restaurant.location}</h5>
                        </div>
                    </div>
                </Popup>
                {isEditingLunch ? (
                    <>
                        <select onChange={editLunchChange}>
                            {lRestChoices}
                        </select>
                        <button onClick={() => handleEditLunch(lunch.id)}>Save</button>
                    </>
                ) : (
                        <button className="w3-button w3-indigo w3-margin-right" onClick={toggleEditLunch}>✎</button>
                    )}
                <Popup
                    trigger={<div style={{ position: "relative" }}>
                        <h4 style={{ cursor: "pointer" }} onMouseEnter={changeColor} onMouseLeave={changeColor2} >
                            <b>Afternoon Activity</b> 🏃‍♀️ - {afternoon.attraction.name}
                        </h4>
                    </div>}
                    modal>
                    <div className="w3-container modal-test">
                        <div className="content">
                            <img style={{ width: "300px", border: "solid", borderColor: "black" }} className="w3-image w3-round" src={afternoon.attraction.image} alt={afternoon.attraction.name} />
                            <h3><b>Category: </b>{afternoon.attraction.category}</h3>
                            <h4><b>Description: </b>{afternoon.attraction.description}</h4>
                            <h5><b>Location: </b>{afternoon.attraction.location}</h5>
                        </div>
                    </div>
                </Popup>
                {isEditingEvent2 ? (
                    <>
                        <select onChange={editEvent2Change}>
                            {afternoonAttrChoices}
                        </select>
                        <button onClick={() => handleEditEvent2(afternoon.id)}>Save</button>
                    </>
                ) : (
                        <button className="w3-button w3-indigo w3-margin-right" onClick={toggleEditEvent2}>✎</button>
                    )}
                <Popup
                    trigger={<div style={{ position: "relative" }}>
                        <h4 style={{ cursor: "pointer" }} onMouseEnter={changeColor} onMouseLeave={changeColor2} >
                            <b>Dinner</b> 🍝 - {dinner.restaurant.name}
                        </h4>

                    </div>}
                    modal>
                    <div className="w3-container modal-test">
                        <div className="content">
                            <img style={{ width: "300px", border: "solid", borderColor: "black" }} className="w3-image w3-round" src={dinner.restaurant.image} alt={dinner.restaurant.name} />
                            <h3><b>Cuisine: </b>{dinner.restaurant.cuisine}</h3>
                            <h4><b>Category: </b>{dinner.restaurant.category}</h4>
                            <h5><b>Description: </b>{dinner.restaurant.description}</h5>
                            <h5><b>Location: </b>{dinner.restaurant.location}</h5>
                        </div>
                    </div>
                </Popup>
                {isEditingDinner ? (
                    <>
                        <select onChange={editDinnerChange}>
                            {dRestChoices}
                        </select>
                        <button onClick={() => handleEditDinner(dinner.id)}>Save</button>
                    </>
                ) : (
                        <button className="w3-button w3-indigo w3-margin-right" onClick={toggleEditDinner}>✎</button>
                    )}
                <Popup
                    trigger={<div style={{ position: "relative" }}>
                        <h4 className="w3-margin-bottom" style={{ cursor: "pointer" }} onMouseEnter={changeColor} onMouseLeave={changeColor2} >
                            <b>Evening Activity</b> 🏃‍♀️ - {evening.attraction.name}
                        </h4>

                    </div>}
                    modal>
                    <div className="w3-container modal-test">
                        <div className="content">
                            <img style={{ width: "300px", border: "solid", borderColor: "black" }} className="w3-image w3-round" src={evening.attraction.image} alt={evening.attraction.name} />
                            <h3><b>Category: </b>{evening.attraction.category}</h3>
                            <h4><b>Description: </b>{evening.attraction.description}</h4>
                            <h5><b>Location: </b>{evening.attraction.location}</h5>
                        </div>
                    </div>
                </Popup>
                {isEditingEvent3 ? (
                    <>
                        <select onChange={editEvent3Change}>
                            {eveningAttrChoices}
                        </select>
                        <button onClick={() => handleEditEvent3(evening.id)}>Save</button>
                    </>
                ) : (
                        <button className="w3-button w3-indigo w3-margin-right" onClick={toggleEditEvent3}>✎</button>
                    )}

            </div>

        </>
    )
}

export default Day;
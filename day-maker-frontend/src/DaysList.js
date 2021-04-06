import SearchFilter3 from "./SearchFilter3";
import Day from './Day'
import {useState} from 'react';

function DaysList({ currentUser, days, setDays, breakfastRests, lunchRests, dinnerRests, setDayRests, dayRests, setDayAttrs, dayAttrs, handleUpdate, morningAttractions, eveningAttractions, afternoonAttractions }) {

    const [searchTerm, setSearchTerm] = useState("")
    console.log(days)
    // if(days.length === 0){
    //     return <div>Loading...</div>
    // }
    
    const filteredDays = days.filter((day) => {
        return new Date(day.date).toString().toLowerCase().includes(searchTerm.toLowerCase())
    })

    // setTimeout(() => {
    //     days.filter((day) => {
    //         return new Date(day.date).toString().toLowerCase().includes(searchTerm.toLowerCase())
    //     })
    // }, 3000)

    const deleteDay = (id) => {
        const updatedDays = days.filter((day) => {
          return day.id !== id
        })
    
        setDays(updatedDays)
      }

    const dayItems = filteredDays.map((day) => {
        return <Day
            key={day.id}
            day={day}
            days={days}
            setDays={setDays}
            
            morningAttractions={morningAttractions}
            afternoonAttractions={afternoonAttractions}
            eveningAttractions={eveningAttractions}
            breakfastRests={breakfastRests}
            lunchRests={lunchRests}
            dinnerRests={dinnerRests}
            
            dayRests={dayRests}
            setDayRests={setDayRests}
            dayAttrs={dayAttrs}
            setDayAttrs={setDayAttrs}
            handleUpdate={handleUpdate}
            deleteDay={deleteDay}
            currentUser={currentUser}

            
        />
    })
    return (
        <div className="w3-row-padding">
            <SearchFilter3 searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            {dayItems}
        </div>
    )
}

export default DaysList;
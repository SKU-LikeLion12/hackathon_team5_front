import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";

export default function Attendance() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const holidays = [
        { month: 0, day: 1 },   
        { month: 2, day: 1 },   
        { month: 4, day: 5 },   
        { month: 5, day: 6 },   
        { month: 7, day: 15 },  
        { month: 9, day: 3 },  
        { month: 9, day: 9 },   
        { month: 11, day: 25 } 
    ];

    const isHoliday = (month, day) => {
        return holidays.some(holiday => holiday.month === month && holiday.day === day);
    };

    const renderDays = () => {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
        const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => null);

        const allDays = [...emptySlots, ...dates];

        return allDays.map((date, index) => {
            const currentDay = date ? new Date(year, month, date).getDay() : null;
            const isToday = date === selectedDate.getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();
            const isWeekend = currentDay === 0 || currentDay === 6;
            const holidayClass = isHoliday(month, date) ? 'text-red-500' : '';

            return (
                <div key={index} className="py-2 text-center">
                    {date ? (
                        <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isToday
                                    ? "text-[#34599D] font-extrabold"
                                    : isWeekend || isHoliday(month, date)
                                    ? "text-red-500"
                                    : "text-black"
                            }`}
                        >
                            {date}
                        </span>
                    ) : (
                        <span className="inline-block w-8 h-8"></span>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex items-center justify-center my-5 text-3xl font-MaplestoryOTFBold">Attendance</div>
            <div className="flex flex-row items-center justify-center">
                <div id="calendar" className="w-[100%] mt-11">
                    <div className="flex items-center justify-center">
                        <div className="flex justify-center bg-[#CAD6E2] w-[50%] h-[90px] rounded-t-2xl">
                            <div id="topCal" className="flex items-center mb-4">
                                <div className="text-2xl font-bold text-white mx-11">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={setSelectedDate}
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        className="text-center text-white bg-[#CAD6E2]"
                                        dateFormat="yyyy/MM/dd"
                                        calendarClassName="calendar-custom"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="p-9 bg-white rounded-b-lg shadow-2xl w-[50%]">
                            <div className="grid grid-cols-7 gap-5 text-xl justify-items-center">
                                {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                                    <div key={day} className={`text-center text-md font-bold ${index % 7 === 0 || index % 7 === 6 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {day}
                                    </div>
                                ))}
                                {renderDays()}
                            </div>
                        </div>
                    </div>
                    <NavLink to='/Main' className='fixed flex bottom-11 right-11'>
                        <div className='flex justify-center bg-[#C4D4E9] rounded-full w-[60px] h-[60px]'>
                            <div className='flex items-center'>
                                <img src="img/pen.png" alt="pen" className='flex size-7' />
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

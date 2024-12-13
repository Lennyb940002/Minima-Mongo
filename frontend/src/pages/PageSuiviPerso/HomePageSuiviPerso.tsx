import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TaskCalendarLayout: React.FC = () => {
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Faire les courses' },
        { id: 2, name: 'Appeler le plombier' },
        { id: 3, name: 'Envoyer le rapport' },
    ]);

    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { id: Date.now(), name: newTask }]);
            setNewTask('');
        }
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const generateCalendarDays = () => {
        const days: (number | null)[] = [];
        const totalDays = daysInMonth(currentDate);
        const startingDay = firstDayOfMonth(currentDate);

        // Ajouter des espaces pour les jours avant le premier jour du mois
        for (let i = 0; i < startingDay; i++) {
            days.push(null);
        }

        // Ajouter les jours du mois
        for (let i = 1; i <= totalDays; i++) {
            days.push(i);
        }

        return days;
    };

    const changeMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        setCurrentDate(newDate);
    };

    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    return (
        <div className="grid grid-cols-3 gap-6 p-8 bg-gray-900 min-h-screen">
            {/* Liste de Tâches */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/10">
                <h2 className="text-3xl font-semibold text-white mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    Liste de Tâches
                </h2>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="bg-white/20 p-4 rounded-xl flex justify-between items-center">
                            <span className="text-white">{task.name}</span>
                            <button
                                className="text-red-500 hover:text-red-700 transition-colors"
                                onClick={() => removeTask(task.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    <div className="flex items-center space-x-3 mt-4">
                        <input
                            type="text"
                            placeholder="Ajouter une tâche"
                            className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:ring-2 focus:ring-blue-500"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-colors"
                            onClick={addTask}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendrier */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/10">
                <div className="max-w-md mx-auto bg-white/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={() => changeMonth('prev')}
                            className="hover:bg-white/20 rounded-full p-2"
                        >
                            <ChevronLeft size={20} className="text-white" />
                        </button>
                        <h2 className="text-xl font-semibold text-white">
                            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                        </h2>
                        <button
                            onClick={() => changeMonth('next')}
                            className="hover:bg-white/20 rounded-full p-2"
                        >
                            <ChevronRight size={20} className="text-white" />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                        {dayNames.map(day => (
                            <div key={day} className="font-bold text-gray-400 text-sm">{day}</div>
                        ))}

                        {generateCalendarDays().map((day, index) => (
                            <div
                                key={index}
                                className={`
                                    h-10 flex items-center justify-center 
                                    ${day ? 'hover:bg-white/20 cursor-pointer' : ''}
                                    ${day === new Date().getDate() &&
                                        currentDate.getMonth() === new Date().getMonth() &&
                                        currentDate.getFullYear() === new Date().getFullYear()
                                        ? 'bg-blue-500 text-white rounded-full'
                                        : ''}
                                    ${day ? 'text-white' : 'text-gray-600'}
                                `}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCalendarLayout;
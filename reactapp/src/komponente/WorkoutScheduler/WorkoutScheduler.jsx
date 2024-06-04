import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import './WorkoutScheduler.css';

const WorkoutScheduler = () => {
    const [exercises, setExercises] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [workout, setWorkout] = useState({
        user_id: 1,
        date: '2024-06-05',
        type: 'Cardio',
        duration: '30',
        intensity: 'Medium',
        calories_burned: '300',
        notes: 'Default notes',
        selectedExercises: [
            { exercise_id: '', repetitions: '10', sets: '3', weight: '50', rest: '60' }
        ]
    });

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        fetch('http://127.0.0.1:8000/api/exercises', { headers })
            .then(response => response.json())
            .then(data => setExercises(data.data))
            .catch(error => console.error('Error fetching exercises:', error));

        fetch('http://127.0.0.1:8000/api/workouts', { headers })
            .then(response => response.json())
            .then(data => setWorkouts(data.data))
            .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    const handleChange = (e) => {
        setWorkout({ ...workout, [e.target.name]: e.target.value });
    };

    const handleExerciseChange = (index, e) => {
        const newExercises = workout.selectedExercises.map((exercise, i) => {
            if (i === index) {
                return { ...exercise, [e.target.name]: e.target.value };
            }
            return exercise;
        });
        setWorkout({ ...workout, selectedExercises: newExercises });
    };

    const handleAddExercise = () => {
        setWorkout({ ...workout, selectedExercises: [...workout.selectedExercises, { exercise_id: '', repetitions: '', sets: '', weight: '', rest: '' }] });
    };

    const handleRemoveExercise = (index) => {
        const newExercises = workout.selectedExercises.filter((_, i) => i !== index);
        setWorkout({ ...workout, selectedExercises: newExercises });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('authToken');

        fetch('http://127.0.0.1:8000/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(workout)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Workout created:', data);
                setWorkouts([...workouts, data.data]);
                setWorkout({
                    user_id: 1,
                    date: '',
                    type: '',
                    duration: '',
                    intensity: '',
                    calories_burned: '',
                    notes: '',
                    selectedExercises: []
                });
            })
            .catch(error => console.error('Error creating workout:', error));
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date'
            },
            {
                Header: 'Type',
                accessor: 'type'
            },
            {
                Header: 'Duration (minutes)',
                accessor: 'duration'
            },
            {
                Header: 'Intensity',
                accessor: 'intensity'
            },
            {
                Header: 'Calories Burned',
                accessor: 'calories_burned'
            },
            {
                Header: 'Notes',
                accessor: 'notes'
            },
            {
                Header: 'Exercises',
                accessor: 'exercises',
                Cell: ({ cell: { value } }) => (
                    <ul>
                        {value.map((exercise, exIndex) => (
                            <li key={exIndex}>
                                {exercise.name} - {exercise.pivot.repetitions} reps, {exercise.pivot.sets} sets, {exercise.pivot.weight} kg, {exercise.pivot.rest} sec rest
                            </li>
                        ))}
                    </ul>
                )
            }
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data: workouts,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="workout-scheduler">
            <h2>Create Your Workout Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={workout.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Type:</label>
                    <input type="text" name="type" value={workout.type} onChange={handleChange} required />
                </div>
                <div>
                    <label>Duration (minutes):</label>
                    <input type="number" name="duration" value={workout.duration} onChange={handleChange} required />
                </div>
                <div>
                    <label>Intensity:</label>
                    <input type="text" name="intensity" value={workout.intensity} onChange={handleChange} required />
                </div>
                <div>
                    <label>Calories Burned:</label>
                    <input type="number" name="calories_burned" value={workout.calories_burned} onChange={handleChange} required />
                </div>
                <div>
                    <label>Notes:</label>
                    <textarea name="notes" value={workout.notes} onChange={handleChange} />
                </div>
                <div>
                    <h3>Exercises</h3>
                    {workout.selectedExercises.map((exercise, index) => (
                        <div key={index} className="exercise-input">
                            <select name="exercise_id" value={exercise.exercise_id} onChange={(e) => handleExerciseChange(index, e)} required>
                                <option value="">Select Exercise</option>
                                {exercises.map((ex) => (
                                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                                ))}
                            </select>
                            <input type="number" name="repetitions" placeholder="Repetitions" value={exercise.repetitions} onChange={(e) => handleExerciseChange(index, e)} required />
                            <input type="number" name="sets" placeholder="Sets" value={exercise.sets} onChange={(e) => handleExerciseChange(index, e)} required />
                            <input type="number" name="weight" placeholder="Weight" value={exercise.weight} onChange={(e) => handleExerciseChange(index, e)} required />
                            <input type="number" name="rest" placeholder="Rest (seconds)" value={exercise.rest} onChange={(e) => handleExerciseChange(index, e)} required />
                            <button type="button" onClick={() => handleRemoveExercise(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddExercise}>Add Exercise</button>
                </div>
                <button type="submit">Create Workout</button>
            </form>

            <h2>Your Workouts</h2>
            <table {...getTableProps()} className="workout-table">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default WorkoutScheduler;

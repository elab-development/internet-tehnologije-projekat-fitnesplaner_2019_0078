import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAppleAlt, faBurn, faDrumstickBite, faBreadSlice, faSeedling, faWeight, faTags } from '@fortawesome/free-solid-svg-icons';

const FoodTracker = () => {
    const [foods, setFoods] = useState([]);
    const [formData, setFormData] = useState({
        name: 'Apple',
        calories: '95',
        proteins: '0.5',
        carbohydrates: '25',
        fats: '0.3',
        serving_size: '1 medium (182g)',
        category: 'Fruit'
    });
    const recommendedCalories = 2000;

    useEffect(() => {
        const storedFoods = JSON.parse(localStorage.getItem('foods'));
        if (storedFoods) {
            setFoods(storedFoods);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('foods', JSON.stringify(foods));
    }, [foods]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFoods([...foods, formData]);
        setFormData({
            name: '',
            calories: '',
            proteins: '',
            carbohydrates: '',
            fats: '',
            serving_size: '',
            category: ''
        });
    };

    const handleDelete = (index) => {
        const newFoods = foods.filter((_, i) => i !== index);
        setFoods(newFoods);
    };

    const handleEdit = (index) => {
        const food = foods[index];
        setFormData(food);
        handleDelete(index);
    };

    const totalCalories = foods.reduce((total, food) => total + parseInt(food.calories), 0);

    const styles = {
        profileContainer: {
            textAlign: 'center',
            padding: '20px',
            borderBottom: '2px solid black'
        },
        profileDetails: {
            marginTop: '20px',
            backgroundColor: '#FFFAA0',
            padding: '20px',
            borderRadius: '10px',
            display: 'inline-block',
            textAlign: 'left',
            width: '100%',
            maxWidth: '600px'
        },
        profileDetailsP: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: '10px 0'
        },
        profileDetailsStrong: {
            marginRight: '10px',
            width: '150px'
        },
        profileDetailsInput: {
            flex: '1',
            padding: '8px',
            fontSize: '14px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginLeft: '10px'
        },
        foodTable: {
            width: '100%',
            marginTop: '20px',
            borderCollapse: 'collapse'
        },
        foodTableThTd: {
            border: '1px solid #ddd',
            padding: '8px',
            textAlign: 'center'
        },
        foodTableTh: {
            backgroundColor: '#f2f2f2'
        },
        foodTableTrEven: {
            backgroundColor: '#f9f9f9'
        },
        foodTableTrHover: {
            backgroundColor: '#f1f1f1'
        },
        editButton: {
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#e4c1f9',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s',
            marginRight: '5px'
        },
        deleteButton: {
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#e4c1f9',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s'
        },
        buttonHover: {
            backgroundColor: '#d3f8e2',
            color: '#333'
        },
        progressBar: {
            width: '100%',
            backgroundColor: '#e0e0df',
            borderRadius: '13px',
            overflow: 'hidden',
            margin: '20px 0'
        },
        progress: {
            height: '20px',
            backgroundColor: '#76c7c0',
            width: '0',
            transition: 'width 0.3s ease-in-out'
        },
        submitButton: {
            display: 'inline-block',
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#76c7c0',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s, color 0.3s'
        },
        profileDetailsSvg: {
            marginRight: '10px',
            color: '#333'
        }
    };

    return (
        <div style={styles.profileContainer}>
            <h2>Food Tracker</h2>
            <h3>Total Calories Today: {totalCalories}</h3>
            <div style={styles.progressBar}>
                <div
                    style={{ ...styles.progress, width: `${(totalCalories / recommendedCalories) * 100}%` }}
                ></div>
            </div>

            <table style={styles.foodTable}>
                <thead>
                    <tr>
                        <th style={styles.foodTableThTd}>Name</th>
                        <th style={styles.foodTableThTd}>Calories</th>
                        <th style={styles.foodTableThTd}>Proteins</th>
                        <th style={styles.foodTableThTd}>Carbohydrates</th>
                        <th style={styles.foodTableThTd}>Fats</th>
                        <th style={styles.foodTableThTd}>Serving Size</th>
                        <th style={styles.foodTableThTd}>Category</th>
                        <th style={styles.foodTableThTd}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {foods.map((food, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.foodTableTrEven : null}>
                            <td style={styles.foodTableThTd}>{food.name}</td>
                            <td style={styles.foodTableThTd}>{food.calories}</td>
                            <td style={styles.foodTableThTd}>{food.proteins}</td>
                            <td style={styles.foodTableThTd}>{food.carbohydrates}</td>
                            <td style={styles.foodTableThTd}>{food.fats}</td>
                            <td style={styles.foodTableThTd}>{food.serving_size}</td>
                            <td style={styles.foodTableThTd}>{food.category}</td>
                            <td style={styles.foodTableThTd}>
                                <button
                                    onClick={() => handleEdit(index)}
                                    style={styles.editButton}
                                    onMouseOver={(e) => (e.currentTarget.style = styles.buttonHover)}
                                    onMouseOut={(e) => (e.currentTarget.style = styles.editButton)}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    style={styles.deleteButton}
                                    onMouseOver={(e) => (e.currentTarget.style = styles.buttonHover)}
                                    onMouseOut={(e) => (e.currentTarget.style = styles.deleteButton)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <form onSubmit={handleSubmit} className="food-form">
                <div style={styles.profileDetails}>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faAppleAlt} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Name:</strong>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faBurn} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Calories:</strong>
                        <input type="number" name="calories" value={formData.calories} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faDrumstickBite} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Proteins:</strong>
                        <input type="number" name="proteins" value={formData.proteins} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faBreadSlice} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Carbohydrates:</strong>
                        <input type="number" name="carbohydrates" value={formData.carbohydrates} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faSeedling} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Fats:</strong>
                        <input type="number" name="fats" value={formData.fats} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faWeight} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Serving Size:</strong>
                        <input type="text" name="serving_size" value={formData.serving_size} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <p style={styles.profileDetailsP}>
                        <FontAwesomeIcon icon={faTags} style={styles.profileDetailsSvg} />
                        <strong style={styles.profileDetailsStrong}>Category:</strong>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} required style={styles.profileDetailsInput} />
                    </p>
                    <button type="submit" style={styles.submitButton}>Add Food</button>
                </div>
            </form>
        </div>
    );
};

export default FoodTracker;

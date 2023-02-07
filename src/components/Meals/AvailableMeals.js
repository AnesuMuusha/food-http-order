import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect , useState} from 'react';

const AvailableMeals = () => {

  const[meals, setMeals] = useState([]);
  useEffect(()=>{
    const fetchMeals = async ()=>{

 
  const response = await fetch("https://meals-d9a2f-default-rtdb.firebaseio.com/meals.json");
    const responseData = await response.json();

    const LoadedMeals = [];

    for(const key in responseData){
      LoadedMeals.push({
        id:key,
        name: responseData[key].Name,
        description: responseData[key].Description,
        price: responseData[key].Price,
      });
     }
     setMeals(LoadedMeals);
    
     console.log(responseData);
    };
    
     fetchMeals()

  }, []);


  const mealsList = meals.map((meal) => (
    
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
    
  ));
  console.log(meals);
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

import React, { useState, useEffect } from 'react';
import { Mic, ArrowLeft, Info, Heart, Crown, ChevronDown, X } from 'lucide-react';

const proteinTypes = ['Paneer', 'Soy', 'Egg', 'Chicken', 'Mutton', 'Pulses'];

const dishes = [
  { id: 1, name: 'Grilled Chicken Salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', description: 'High protein, low carb', calories: 350, protein: 30, carbs: 10, fat: 15, fiber: 5, isGlutenFree: true, tags: ['High Protein', 'Low Carb'], type: 'Chicken' },
  { id: 2, name: 'Paneer Tikka', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8', description: 'Vegetarian protein', calories: 400, protein: 22, carbs: 12, fat: 28, fiber: 3, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Paneer' },
  { id: 3, name: 'Egg White Omelette', image: 'https://images.unsplash.com/photo-1594614271360-0ed9a558aaca', description: 'Low calorie breakfast', calories: 200, protein: 25, carbs: 5, fat: 10, fiber: 1, isGlutenFree: true, tags: ['High Protein', 'Low Calorie', 'Low Carb'], type: 'Egg' },
  { id: 4, name: 'Quinoa Bowl', image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71', description: 'High fiber, gluten-free', calories: 380, protein: 12, carbs: 60, fat: 12, fiber: 8, isGlutenFree: true, tags: ['High Fiber', 'Gluten-Free', 'Vegetarian'], type: 'Pulses' },
  { id: 5, name: 'Lentil Soup', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd', description: 'High fiber, low fat', calories: 250, protein: 15, carbs: 40, fat: 5, fiber: 10, isGlutenFree: true, tags: ['High Fiber', 'Low Fat', 'Vegetarian'], type: 'Pulses' },
  { id: 6, name: 'Grilled Salmon', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2', description: 'Omega-3 rich, low carb', calories: 300, protein: 25, carbs: 0, fat: 21, fiber: 0, isGlutenFree: true, tags: ['High Protein', 'Low Carb'], type: 'Fish' },
  { id: 7, name: 'Tofu Stir-Fry', image: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f', description: 'Low calorie, high protein', calories: 280, protein: 20, carbs: 25, fat: 12, fiber: 6, isGlutenFree: true, tags: ['High Protein', 'Low Calorie', 'Vegetarian'], type: 'Soy' },
  { id: 8, name: 'Greek Yogurt Parfait', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777', description: 'High protein, low fat', calories: 220, protein: 18, carbs: 30, fat: 5, fiber: 4, isGlutenFree: true, tags: ['High Protein', 'Low Fat'], type: 'Dairy' },
  { id: 9, name: 'Chickpea Curry', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe', description: 'High fiber, vegetarian', calories: 350, protein: 12, carbs: 50, fat: 12, fiber: 12, isGlutenFree: true, tags: ['High Fiber', 'Vegetarian'], type: 'Pulses' },
  { id: 10, name: 'Turkey Lettuce Wraps', image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24', description: 'Low carb, high protein', calories: 280, protein: 28, carbs: 8, fat: 16, fiber: 3, isGlutenFree: true, tags: ['High Protein', 'Low Carb', 'Low Calorie'], type: 'Poultry' },
  { id: 11, name: 'Paneer Bhurji', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7', description: 'High protein vegetarian dish', calories: 320, protein: 24, carbs: 8, fat: 22, fiber: 2, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Paneer' },
  { id: 12, name: 'Soy Chili', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7', description: 'Plant-based protein rich', calories: 280, protein: 22, carbs: 30, fat: 10, fiber: 8, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Soy' },
  { id: 13, name: 'Egg Bhurji', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8', description: 'Indian style scrambled eggs', calories: 250, protein: 20, carbs: 6, fat: 18, fiber: 2, isGlutenFree: true, tags: ['High Protein', 'Low Carb'], type: 'Egg' },
  { id: 14, name: 'Chicken Tikka', image: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f', description: 'Grilled spiced chicken', calories: 300, protein: 35, carbs: 5, fat: 15, fiber: 1, isGlutenFree: true, tags: ['High Protein', 'Low Carb'], type: 'Chicken' },
  { id: 15, name: 'Mutton Keema', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15', description: 'Minced mutton curry', calories: 380, protein: 28, carbs: 10, fat: 28, fiber: 3, isGlutenFree: true, tags: ['High Protein'], type: 'Mutton' },
  { id: 16, name: 'Dal Makhani', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d', description: 'Creamy lentil curry', calories: 320, protein: 18, carbs: 45, fat: 10, fiber: 15, isGlutenFree: true, tags: ['High Fiber', 'Vegetarian'], type: 'Pulses' },
  { id: 17, name: 'Palak Paneer', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950', description: 'Spinach and cottage cheese curry', calories: 280, protein: 20, carbs: 12, fat: 18, fiber: 6, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Paneer' },
  { id: 18, name: 'Soy Nuggets', image: 'https://images.unsplash.com/photo-1606851094291-6efae152bb87', description: 'Plant-based protein snack', calories: 200, protein: 18, carbs: 15, fat: 8, fiber: 5, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Soy' },
  { id: 19, name: 'Egg Curry', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d', description: 'Protein-rich egg dish', calories: 300, protein: 22, carbs: 15, fat: 20, fiber: 3, isGlutenFree: true, tags: ['High Protein'], type: 'Egg' },
  { id: 20, name: 'Chicken Shawarma', image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4', description: 'Middle Eastern chicken wrap', calories: 450, protein: 30, carbs: 35, fat: 22, fiber: 4, isGlutenFree: false, tags: ['High Protein'], type: 'Chicken' },
  { id: 21, name: 'Mutton Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', description: 'Fragrant rice and mutton dish', calories: 550, protein: 25, carbs: 65, fat: 25, fiber: 3, isGlutenFree: false, tags: ['High Protein'], type: 'Mutton' },
  { id: 22, name: 'Chana Masala', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe', description: 'Spiced chickpea curry', calories: 280, protein: 15, carbs: 45, fat: 8, fiber: 12, isGlutenFree: true, tags: ['High Fiber', 'Vegetarian'], type: 'Pulses' },
  { id: 23, name: 'Paneer Butter Masala', image: 'https://images.unsplash.com/photo-1631452180775-8b85d8ded17e', description: 'Rich and creamy paneer curry', calories: 400, protein: 20, carbs: 15, fat: 30, fiber: 3, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Paneer' },
  { id: 24, name: 'Soy Keema', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe', description: 'Plant-based minced curry', calories: 250, protein: 22, carbs: 20, fat: 10, fiber: 8, isGlutenFree: true, tags: ['High Protein', 'Vegetarian'], type: 'Soy' },
  { id: 25, name: 'Egg Fried Rice', image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b', description: 'Protein-packed rice dish', calories: 380, protein: 15, carbs: 55, fat: 12, fiber: 3, isGlutenFree: false, tags: ['High Protein'], type: 'Egg' },
];

const HealthyFood = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isProteinDropdownOpen, setIsProteinDropdownOpen] = useState(false);
  const [selectedProteinType, setSelectedProteinType] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [filteredDishes, setFilteredDishes] = useState(dishes);

  const filters = ['High Protein', 'Low Calorie', 'Low Carb', 'Protein Type', 'Low Fat', 'High Fiber', 'Gluten-Free'];

  const handleFilterClick = (filter) => {
    if (filter === 'Protein Type') {
      setIsProteinDropdownOpen(!isProteinDropdownOpen);
    } else {
      setSelectedFilter(filter === selectedFilter ? null : filter);
      setIsProteinDropdownOpen(false);
    }
  };

  const handleProteinTypeSelect = (proteinType) => {
    setSelectedProteinType(proteinType === selectedProteinType ? null : proteinType);
    setIsProteinDropdownOpen(false);
  };

  useEffect(() => {
    let filtered = dishes;

    if (selectedFilter) {
      filtered = filtered.filter(dish => dish.tags.includes(selectedFilter));
    }

    if (selectedProteinType) {
      filtered = filtered.filter(dish => dish.type.toLowerCase() === selectedProteinType.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter(dish => 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDishes(filtered);
  }, [selectedFilter, selectedProteinType, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-400">
      {/* Header Section */}
      <header className="p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <button className="btn btn-link text-white">
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button className="btn btn-link text-white">
              <Info className="h-6 w-6" />
            </button>
          </div>
          <h1 className="text-white text-5xl font-cursive mb-6">Healthy</h1>
          <div className="flex justify-between text-white mb-8">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6" />
              <div>
                <p className="font-semibold">Curated by</p>
                <p>nutritionists</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6" />
              <div>
                <p className="font-semibold">Prepared by</p>
                <p>top restaurants</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-4">
        <div className="bg-white rounded-full p-3 flex items-center shadow-lg">
          <input
            type="text"
            className="flex-grow border-none outline-none px-4"
            placeholder="Search for a healthy dish or restaurant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-link">
            <Mic className="h-5 w-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-2 pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`btn ${
                selectedFilter === filter 
                  ? 'bg-white text-green-600 hover:bg-gray-100' 
                  : 'text-white border-white hover:bg-green-500'
              } rounded-pill whitespace-nowrap transition-all duration-300 border-2 px-4 py-2 font-medium`}
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
              {filter === 'Protein Type' && <ChevronDown className="ml-1 h-4 w-4" />}
            </button>
          ))}
        </div>
        {isProteinDropdownOpen && (
          <div className="mt-2 bg-white rounded-lg shadow-lg p-2 animate-fade-in">
            {proteinTypes.map((type) => (
              <button
                key={type}
                className={`block w-full text-left px-4 py-2 transition-colors duration-200 ${
                  selectedProteinType === type 
                    ? 'bg-green-100 text-green-700' 
                    : 'hover:bg-green-50 text-gray-700'
                } rounded`}
                onClick={() => handleProteinTypeSelect(type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dish Gallery */}
      <div className="container mx-auto px-4 bg-gray-50 rounded-t-3xl pt-8 min-h-screen">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {selectedFilter || selectedProteinType ? `${selectedFilter || selectedProteinType} Dishes` : 'All Healthy Dishes'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105" onClick={() => setSelectedDish(dish)}>
              <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{dish.name}</h3>
                <p className="text-sm text-gray-600">{dish.description}</p>
                <p className="text-sm text-gray-500 mt-2">{dish.calories} calories</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {dish.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dish Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedDish.name}</h2>
                <button className="text-gray-500 hover:text-gray-700" onClick={() => setSelectedDish(null)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <p className="text-gray-600 mb-4">{selectedDish.description}</p>
              <h3 className="font-semibold mb-2">Ingredients:</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
                {/* Add more ingredients */}
              </ul>
              <h3 className="font-semibold mb-2">Instructions:</h3>
              <ol className="list-decimal pl-5 mb-4">
                <li>Step 1: Lorem ipsum dolor sit amet</li>
                <li>Step 2: Consectetur adipiscing elit</li>
                <li>Step 3: Sed do eiusmod tempor incididunt</li>
                {/* Add more steps */}
              </ol>
              <h3 className="font-semibold mb-2">Nutritional Information:</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-100 p-2 rounded">
                  <p className="font-semibold">{selectedDish.protein}g</p>
                  <p className="text-sm">Protein</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <p className="font-semibold">{selectedDish.carbs}g</p>
                  <p className="text-sm">Carbs</p>
                </div>
                <div className="bg-red-100 p-2 rounded">
                  <p className="font-semibold">{selectedDish.fat}g</p>
                  <p className="text-sm">Fat</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="bg-purple-100 p-2 rounded">
                  <p className="font-semibold">{selectedDish.fiber}g</p>
                  <p className="text-sm">Fiber</p>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <p className="font-semibold">{selectedDish.calories}</p>
                  <p className="text-sm">Calories</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  {selectedDish.isGlutenFree ? "This dish is gluten-free." : "This dish contains gluten."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default HealthyFood;
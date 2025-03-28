// Define Package 
package com.beesbreakfast.bees_breakfast_backend.repository;

// Import Dish Model 
import com.beesbreakfast.bees_breakfast_backend.model.Dish;
// Import JPA Tools
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/* How to make a Dish Repository 
 * Step 1. Define the Package 
 * Step 2. Import the Dish Model so that the repository knows what 
 *         data is in use
 * Step 3. Import Spring Data JPA to easily work with the database 
 *         without writing any SQL  
 * Step 4. Create the Repository Interface
 *         - extends JpaRepository: Gives built in database functions like
 *           findAll(), save(), deleteById()
 *         - <Dish, String>: Model name, Data type of ID
 * 
 * 
 */


// Create the Repository Interface
@Repository
public interface DishRepository extends JpaRepository<Dish, String> {
    // Add Custom Methods here
    /* Examples:
     * Find dish by name: Optional<Dish> findByDishName(String dishName);
     * Find dishes under $10: List<Dish> findByPriceLessThan(BigDecimal price);
     * Find all breakfast dishes: List<Dish> findByCategory(String category);
     * 
     */

}

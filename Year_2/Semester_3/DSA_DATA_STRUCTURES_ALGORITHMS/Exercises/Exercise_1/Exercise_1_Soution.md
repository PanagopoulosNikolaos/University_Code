## 1. Καλύτερη, Μέση, Χειρότερη Περίπτωση

**Καλύτερη περίπτωση:** Ελάχιστες λειτουργίες που απαιτούνται

**Μέση περίπτωση:** Αναμενόμενες λειτουργίες για τυπική είσοδο

**Χειρότερη περίπτωση:** Μέγιστες λειτουργίες που απαιτούνται

### Python
```python
# Linear Search example
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1


# Best case: O(1) - element at index 0
arr_best = [5, 2, 8, 1, 9]
print(linear_search(arr_best, 5))  # Found immediately


# Average case: O(n/2) ≈ O(n) - element in middle
arr_avg = [1, 2, 8, 5, 9]
print(linear_search(arr_avg, 5))  # Found at middle


# Worst case: O(n) - element at end or not found
arr_worst = [1, 2, 8, 9, 5]
print(linear_search(arr_worst, 5))  # Found at last position
```

### C++
```cpp
#include <iostream>
#include <vector>
using namespace std;


int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}


int main() {
    // Best case: O(1)
    vector<int> arr_best = {5, 2, 8, 1, 9};
    cout << linearSearch(arr_best, 5) << endl;
    
    // Average case: O(n/2)
    vector<int> arr_avg = {1, 2, 8, 5, 9};
    cout << linearSearch(arr_avg, 5) << endl;
    
    // Worst case: O(n)
    vector<int> arr_worst = {1, 2, 8, 9, 5};
    cout << linearSearch(arr_worst, 5) << endl;
    
    return 0;
}
```

## 2. Σειρά Ρυθμού Ανάπτυξης

$$\log n < n \log n < n^2 < 2^n < n!$$

### Python
```python
import math


n = 10
functions = {
    'log n': math.log2(n),
    'n log n': n * math.log2(n),
    'n^2': n**2,
    '2^n': 2**n,
    'n!': math.factorial(n)
}


for name, value in sorted(functions.items(), key=lambda item: item[1]):
    print(f"{name}: {value}")
```

### C++
```cpp
#include <iostream>
#include <cmath>
using namespace std;


unsigned long long factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}


int main() {
    int n = 10;
    
    cout << "log n: " << log2(n) << endl;
    cout << "n log n: " << n * log2(n) << endl;
    cout << "n^2: " << n*n << endl;
    cout << "2^n: " << pow(2, n) << endl;
    cout << "n!: " << factorial(n) << endl;
    
    return 0;
}
```

## 3. Εκτίμηση Χρόνου

Για $$O(n^2)$$: $$\frac{T_2}{T_1} = \frac{n_2^2}{n_1^2}$$

$$\frac{T_2}{1} = \frac{5000^2}{1000^2} = \frac{25000000}{1000000} = 25$$

**Χρόνος = 25 δευτερόλεπτα**

### Python
```python
# O(n^2) scaling calculation
n1 = 1000
t1 = 1  # seconds
n2 = 5000


t2 = t1 * (n2 / n1) ** 2
print(f"Time for {n2} elements: {t2} seconds")
```

### C++
```cpp
#include <iostream>
#include <cmath>
using namespace std;


int main() {
    double n1 = 1000;
    double t1 = 1;  // seconds
    double n2 = 5000;
    
    double t2 = t1 * pow(n2 / n1, 2);
    cout << "Time for " << n2 << " elements: " << t2 << " seconds" << endl;
    
    return 0;
}
```

## 4. Πολυπλοκότητα Χρόνου έναντι Χώρου

**Πολυπλοκότητα χρόνου:** Μέτρηση λειτουργιών
**Πολυπλοκότητα χώρου:** Χρήση μνήμης

Παράδειγμα ανταλλαγής: Η απομνημόνευση αυξάνει τον χώρο αλλά μειώνει τον χρόνο

### Python
```python
# Without memoization - O(2^n) time, O(n) space
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n-1) + fib_slow(n-2)


# With memoization - O(n) time, O(n) space
def fib_fast(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_fast(n-1, memo) + fib_fast(n-2, memo)
    return memo[n]


print(fib_fast(30))  # Much faster, more memory
```

### C++
```cpp
#include <iostream>
#include <unordered_map>
using namespace std;


// Without memoization - O(2^n) time, O(n) space
int fibSlow(int n) {
    if (n <= 1) return n;
    return fibSlow(n-1) + fibSlow(n-2);
}


// With memoization - O(n) time, O(n) space
int fibFast(int n, unordered_map<int, int>& memo) {
    if (memo.find(n) != memo.end())
        return memo[n];
    if (n <= 1) return n;
    memo[n] = fibFast(n-1, memo) + fibFast(n-2, memo);
    return memo[n];
}


int main() {
    unordered_map<int, int> memo;
    cout << fibFast(30, memo) << endl;  // Much faster, more memory
    return 0;
}
```

## 5. Προσεγγίσεις Βελτιστοποίησης

**Απομνημόνευση:** Αποθήκευση υπολογισμένων αποτελεσμάτων για την αποφυγή περιττών υπολογισμών

**Καλύτερες δομές δεδομένων:** Χρήση πινάκων κατακερματισμού αντί για πίνακες για αναζητήσεις

### Python
```python
# Approach 1: Memoization (Dynamic Programming)
function_count = 0
def expensive_computation(n, cache={}):
    global function_count  
    function_count = function_count + 1
    if n in cache:
        return cache[n]
    result = n * n + expensive_computation(n-1, cache) if n > 0 else 0
    cache[n] = result
    return result


# Slow: O(n) lookup
slow_list = [1, 2, 3, 4, 5]
print(3 in slow_list)  # O(n)


# Fast: O(1) lookup
fast_set = {1, 2, 3, 4, 5}
print(3 in fast_set)  # O(1)



cache_for_run = {}
function_count = 0
print(expensive_computation(100, cache_for_run))
print(f"Function called: {function_count} times")


```

### C++
```cpp
#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <algorithm>


int function_count = 0;


int expensive_computation(int n, std::unordered_map<int, int>& cache) {
    function_count++;
    
    if (cache.find(n) != cache.end()) {
        return cache[n];
    }
    
    int result = (n > 0) ? n * n + expensive_computation(n - 1, cache) : 0;
    cache[n] = result;
    return result;
}


int main() {
    // Slow: O(n) lookup
    std::vector<int> slow_list = {1, 2, 3, 4, 5};
    bool found_in_list = std::find(slow_list.begin(), slow_list.end(), 3) != slow_list.end();
    std::cout << std::boolalpha << found_in_list << std::endl;  // O(n)
    
    // Fast: O(1) lookup
    std::unordered_set<int> fast_set = {1, 2, 3, 4, 5};
    bool found_in_set = fast_set.find(3) != fast_set.end();
    std::cout << std::boolalpha << found_in_set << std::endl;  // O(1)
    
    // Cache and computation
    std::unordered_map<int, int> cache_for_run;
    function_count = 0;
    std::cout << expensive_computation(100, cache_for_run) << std::endl;
    std::cout << "Function called: " << function_count << " times" << std::endl;
    
    return 0;
}


```
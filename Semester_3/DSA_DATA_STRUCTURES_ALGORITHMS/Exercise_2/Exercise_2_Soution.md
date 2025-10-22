## 1. Δυαδική Αναζήτηση

Η δυαδική αναζήτηση εργάζεται διαιρώντας επαναληπτικά το χώρο αναζήτησης στη μέση. Συγκρίνει το στοιχείο στη μέση θέση με την τιμή-στόχο και αποφασίζει αν θα συνεχίσει την αναζήτηση στο αριστερό ή δεξί μισό του πίνακα. Σε κάθε βήμα, το μέγεθος του χώρου αναζήτησης μειώνεται κατά το ήμισυ, καταλήγοντας είτε στην εύρεση του στοιχείου είτε σε άδειο υποπίνακα.

**Προϋπόθεση:** Ο πίνακας πρέπει να είναι **ταξινομημένος**. Χωρίς ταξινόμηση, η λογική της διαίρεσης του χώρου αναζήτησης βάσει σύγκρισης με το μεσαίο στοιχείο δεν λειτουργεί.

## 2. Αναδρομή vs Επανάληψη

Η αναδρομή θεωρείται εναλλακτική της επανάληψης επειδή και οι δύο τεχνικές μπορούν να εκφράσουν τις ίδιες υπολογιστικές διαδικασίες. Η αναδρομή μπορεί να αντικατασταθεί από επανάληψη με ρητή στοίβα κλήσεων, ενώ η επανάληψη μπορεί να αντικατασταθεί με αναδρομή ουράς.

**Παράδειγμα:** Υπολογισμός παραγοντικού. Αναδρομικά: n! = n × (n-1)! με βασική περίπτωση 0! = 1. Επαναληπτικά: πολλαπλασιάζουμε σταδιακά από 1 έως n.

**Python:**
```python
# Recursive approach
def factorial_recursive(n):
    if n == 0:
        return 1
    return n * factorial_recursive(n - 1)

# Iterative approach
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Test
print("Factorial of 5 (recursive):", factorial_recursive(5))
print("Factorial of 5 (iterative):", factorial_iterative(5))
```

**C++:**
```cpp
#include <iostream>
using namespace std;

// Recursive approach
int factorialRecursive(int n) {
    if (n == 0) return 1;
    return n * factorialRecursive(n - 1);
}

// Iterative approach
int factorialIterative(int n) {
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    cout << "Factorial of 5 (recursive): " << factorialRecursive(5) << endl;
    cout << "Factorial of 5 (iterative): " << factorialIterative(5) << endl;
    return 0;
}
```

## 3. Σύγκριση Ταξινόμησης

| Χαρακτηριστικό | Insertion Sort | Selection Sort | Bubble Sort |
|---|---|---|---|
| **Μέση Πολυπλοκότητα** | O(n²)  | O(n²)  | O(n²)  |
| **Καλύτερη Περίπτωση** | O(n)  | O(n²)  | O(n)  |
| **Χειρότερη Περίπτωση** | O(n²)  | O(n²)  | O(n²)  |
| **Προσαρμοστικότητα** | Ναι  | Όχι  | Όχι  |
| **Ανταλλαγές** | Λιγότερες  | Ελάχιστες  | Πολλές  |
| **Ταχύτητα** | Γρηγορότερη  | Μέτρια | Πιο αργή  |

Η insertion sort συγκρίνει κάθε στοιχείο με το ταξινομημένο τμήμα αριστερά και το τοποθετεί στη σωστή θέση. Η selection sort βρίσκει το ελάχιστο στοιχείο και το τοποθετεί στην αρχή. Η bubble sort συγκρίνει και ανταλλάσσει γειτονικά στοιχεία επαναληπτικά.

**Python:**
```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Test all three algorithms
test_arr1 = [64, 34, 25, 12, 22, 11, 90]
test_arr2 = test_arr1.copy()
test_arr3 = test_arr1.copy()

insertion_sort(test_arr1)
print("Insertion Sort:", test_arr1)

selection_sort(test_arr2)
print("Selection Sort:", test_arr2)

bubble_sort(test_arr3)
print("Bubble Sort:", test_arr3)
```

**C++:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

void selectionSort(vector<int>& arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < arr.size(); j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        swap(arr[min_idx], arr[i]);
    }
}

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

void printArray(const vector<int>& arr) {
    for (int val : arr)
        cout << val << " ";
    cout << endl;
}

int main() {
    vector<int> arr1 = {64, 34, 25, 12, 22, 11, 90};
    vector<int> arr2 = arr1;
    vector<int> arr3 = arr1;
    
    insertionSort(arr1);
    cout << "Insertion Sort: ";
    printArray(arr1);
    
    selectionSort(arr2);
    cout << "Selection Sort: ";
    printArray(arr2);
    
    bubbleSort(arr3);
    cout << "Bubble Sort: ";
    printArray(arr3);
    
    return 0;
}
```

## 4. Divide and Conquer - Merge Sort

Το **Merge Sort** εφαρμόζει τη στρατηγική Διαίρει και Βασίλευε.

**Στάδια:**
1. **Διαίρεση (Divide):** Χωρισμός του πίνακα στη μέση σε δύο υποπίνακες
2. **Κατάκτηση (Conquer):** Αναδρομική ταξινόμηση κάθε υποπίνακα μέχρι να απομείνουν μονά στοιχεία
3. **Συνδυασμός (Combine):** Συγχώνευση των ταξινομημένων υποπινάκων σε ενιαίο ταξινομημένο πίνακα

Η διαδικασία συνεχίζεται αναδρομικά μέχρι όλα τα στοιχεία να ενωθούν σε έναν πλήρως ταξινομημένο πίνακα.

**Python:**
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Combine
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Test
test_array = [70, 50, 30, 10, 20, 40, 60]
print("Original array:", test_array)
sorted_array = merge_sort(test_array)
print("Sorted array:", sorted_array)
```

**C++:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    
    vector<int> L(n1), R(n2);
    
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];
    
    int i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }
    
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        mergeSort(arr, left, mid);      // Divide left
        mergeSort(arr, mid + 1, right); // Divide right
        merge(arr, left, mid, right);   // Combine
    }
}

int main() {
    vector<int> arr = {70, 50, 30, 10, 20, 40, 60};
    
    cout << "Original array: ";
    for (int val : arr) cout << val << " ";
    cout << endl;
    
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted array: ";
    for (int val : arr) cout << val << " ";
    cout << endl;
    
    return 0;
}
```

## 5. Πίνακας Πολυπλοκότητας

| Αλγόριθμος | Πολυπλοκότητα (Μέση) |
|---|---|
| Selection Sort | O(n²)  |
| Insertion Sort | O(n²)  |
| Merge Sort | O(n log n)  |
| Quick Sort | O(n log n)  |
## 1. Δυαδικό Δέντρο - Χαρακτηριστικά

Ένα **δυαδικό δέντρο** είναι μια ιεραρχική δομή δεδομένων όπου κάθε κόμβος έχει το πολύ δύο παιδιά: αριστερό και δεξί.

**Κύρια Χαρακτηριστικά:**
- **Ρίζα (Root):** Ο κορυφαίος κόμβος του δέντρου
- **Βαθμός Κόμβου (Node Degree):** Αριθμός παιδιών ενός κόμβου (0, 1, ή 2 για δυαδικό δέντρο)
- **Φύλλο (Leaf):** Κόμβος χωρίς παιδιά (βαθμός 0)
- **Ύψος (Height):** Μέγιστο μήκος μονοπατιού από τη ρίζα σε φύλλο
- **Επίπεδο (Level):** Απόσταση από τη ρίζα (η ρίζα είναι στο επίπεδο 0)
- **Βάθος (Depth):** Απόσταση κόμβου από τη ρίζα

### Python
```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self, root_value):
        self.root = TreeNode(root_value)
    
    def height(self, node):
        """Υπολογίζει το ύψος του δέντρου"""
        if node is None:
            return -1
        left_height = self.height(node.left)
        right_height = self.height(node.right)
        return max(left_height, right_height) + 1
    
    def count_nodes(self, node):
        """Μετράει συνολικούς κόμβους"""
        if node is None:
            return 0
        return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)
    
    def count_leaves(self, node):
        """Μετράει φύλλα (κόμβους χωρίς παιδιά)"""
        if node is None:
            return 0
        if node.left is None and node.right is None:
            return 1
        return self.count_leaves(node.left) + self.count_leaves(node.right)

# Παράδειγμα χρήσης
tree = BinaryTree(1)
tree.root.left = TreeNode(2)
tree.root.right = TreeNode(3)
tree.root.left.left = TreeNode(4)
tree.root.left.right = TreeNode(5)

print("Ύψος δέντρου:", tree.height(tree.root))
print("Συνολικοί κόμβοι:", tree.count_nodes(tree.root))
print("Αριθμός φύλλων:", tree.count_leaves(tree.root))
```

### C++
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BinaryTree {
public:
    TreeNode* root;
    
    BinaryTree(int root_value) {
        root = new TreeNode(root_value);
    }
    
    ~BinaryTree() {
        destroy(root);
        root = nullptr;
    }
    
    // Υπολογίζει το ύψος του δέντρου
    int height(TreeNode* node) {
        if (node == nullptr) return -1;
        int left_height = height(node->left);
        int right_height = height(node->right);
        return max(left_height, right_height) + 1;
    }
    
    // Μετράει συνολικούς κόμβους
    int countNodes(TreeNode* node) {
        if (node == nullptr) return 0;
        return 1 + countNodes(node->left) + countNodes(node->right);
    }
    
    // Μετράει φύλλα
    int countLeaves(TreeNode* node) {
        if (node == nullptr) return 0;
        if (node->left == nullptr && node->right == nullptr) return 1;
        return countLeaves(node->left) + countLeaves(node->right);
    }
    
private:
    void destroy(TreeNode* node) {
        if (node == nullptr) return;
        destroy(node->left);
        destroy(node->right);
        delete node;
    }
};

int main() {
    BinaryTree tree(1);
    tree.root->left = new TreeNode(2);
    tree.root->right = new TreeNode(3);
    tree.root->left->left = new TreeNode(4);
    tree.root->left->right = new TreeNode(5);
    
    cout << "Ύψος δέντρου: " << tree.height(tree.root) << endl;
    cout << "Συνολικοί κόμβοι: " << tree.countNodes(tree.root) << endl;
    cout << "Αριθμός φύλλων: " << tree.countLeaves(tree.root) << endl;
    
    return 0;
}
```

## 2. Δυαδικό Δέντρο Αναζήτησης (BST)

Το **Binary Search Tree (BST)** είναι ένα δυαδικό δέντρο με μια ειδική ιδιότητα:

**Βασική Ιδιότητα BST:**
- Όλες οι τιμές στο αριστερό υποδέντρο είναι **μικρότερες** από την τιμή του κόμβου
- Όλες οι τιμές στο δεξί υποδέντρο είναι **μεγαλύτερες** από την τιμή του κόμβου
- Κάθε υποδέντρο είναι επίσης BST

**Πώς βοηθά στην αποδοτική αναζήτηση:**
Η ιδιότητα αυτή επιτρέπει την εφαρμογή δυαδικής αναζήτησης. Σε κάθε βήμα, μπορούμε να αποκλείσουμε το μισό δέντρο, καταλήγοντας σε **O(log n)** πολυπλοκότητα για ισορροπημένο BST (αντί για O(n) σε μη ταξινομημένη δομή).

### Python
```python
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, value):
        """Εισαγωγή νέας τιμής στο BST"""
        if self.root is None:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)
    
    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)
    
    def search(self, value):
        """Αναζήτηση τιμής στο BST - O(log n) για ισορροπημένο δέντρο"""
        return self._search_recursive(self.root, value)
    
    def _search_recursive(self, node, value):
        if node is None:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)
    
    def find_min(self, node=None):
        """Βρίσκει την ελάχιστη τιμή (αριστερότερος κόμβος)"""
        if node is None:
            node = self.root
        while node.left is not None:
            node = node.left
        return node.value
    
    def find_max(self, node=None):
        """Βρίσκει τη μέγιστη τιμή (δεξιότερος κόμβος)"""
        if node is None:
            node = self.root
        while node.right is not None:
            node = node.right
        return node.value

# Παράδειγμα χρήσης
bst = BST()
values = [50, 30, 70, 20, 40, 60, 80]
for val in values:
    bst.insert(val)

print("Αναζήτηση 40:", bst.search(40))
print("Αναζήτηση 100:", bst.search(100))
print("Ελάχιστη τιμή:", bst.find_min())
print("Μέγιστη τιμή:", bst.find_max())
```

### C++
```cpp
#include <iostream>
using namespace std;

struct BSTNode {
    int value;
    BSTNode* left;
    BSTNode* right;
    
    BSTNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class BST {
private:
    BSTNode* root;
    
    BSTNode* insertRecursive(BSTNode* node, int value) {
        if (node == nullptr) {
            return new BSTNode(value);
        }
        if (value < node->value) {
            node->left = insertRecursive(node->left, value);
        } else {
            node->right = insertRecursive(node->right, value);
        }
        return node;
    }
    
    bool searchRecursive(BSTNode* node, int value) {
        if (node == nullptr) return false;
        if (node->value == value) return true;
        if (value < node->value) {
            return searchRecursive(node->left, value);
        } else {
            return searchRecursive(node->right, value);
        }
    }

    void destroy(BSTNode* node) {
        if (node == nullptr) return;
        destroy(node->left);
        destroy(node->right);
        delete node;
    }

public:
    BST() : root(nullptr) {}
    
    ~BST() {
        destroy(root);
        root = nullptr;
    }
    
    // Εισαγωγή νέας τιμής στο BST
    void insert(int value) {
        root = insertRecursive(root, value);
    }
    
    // Αναζήτηση τιμής - O(log n) για ισορροπημένο δέντρο
    bool search(int value) {
        return searchRecursive(root, value);
    }
    
    // Βρίσκει την ελάχιστη τιμή
    int findMin() {
        BSTNode* current = root;
        while (current->left != nullptr) {
            current = current->left;
        }
        return current->value;
    }
    
    // Βρίσκει τη μέγιστη τιμή
    int findMax() {
        BSTNode* current = root;
        while (current->right != nullptr) {
            current = current->right;
        }
        return current->value;
    }
};

int main() {
    BST bst;
    int values[] = {50, 30, 70, 20, 40, 60, 80};
    
    for (int val : values) {
        bst.insert(val);
    }
    
    cout << "Αναζήτηση 40: " << (bst.search(40) ? "Βρέθηκε" : "Δεν βρέθηκε") << endl;
    cout << "Αναζήτηση 100: " << (bst.search(100) ? "Βρέθηκε" : "Δεν βρέθηκε") << endl;
    cout << "Ελάχιστη τιμή: " << bst.findMin() << endl;
    cout << "Μέγιστη τιμή: " << bst.findMax() << endl;
    
    return 0;
}
```

## 3. Διασχίσεις Δέντρων

Οι τρεις βασικές μέθοδοι διάσχισης δυαδικού δέντρου:

### **Pre-order (Προ-διάταξη):** Ρίζα → Αριστερά → Δεξιά
- Επισκεπτόμαστε πρώτα τον κόμβο, μετά το αριστερό και δεξί υποδέντρο
- Χρήση: Αντιγραφή δέντρου, prefix expressions

### **In-order (Εν-διάταξη):** Αριστερά → Ρίζα → Δεξιά
- Επισκεπτόμαστε πρώτα το αριστερό υποδέντρο, μετά τον κόμβο, μετά το δεξί
- **Παράγει ταξινομημένη έξοδο για BST!**
- Λόγος: Η ιδιότητα του BST (αριστερά < ρίζα < δεξιά) εγγυάται αύξουσα σειρά

### **Post-order (Μετά-διάταξη):** Αριστερά → Δεξιά → Ρίζα
- Επισκεπτόμαστε τα υποδέντρα πρώτα, μετά τον κόμβο
- Χρήση: Διαγραφή δέντρου, postfix expressions

### Python
```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class TreeTraversal:
    def preorder(self, node, result=None):
        """Pre-order: Ρίζα → Αριστερά → Δεξιά"""
        if result is None:
            result = []
        if node:
            result.append(node.value)  # Επίσκεψη ρίζας
            self.preorder(node.left, result)
            self.preorder(node.right, result)
        return result
    
    def inorder(self, node, result=None):
        """In-order: Αριστερά → Ρίζα → Δεξιά (ταξινομημένη για BST)"""
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.value)  # Επίσκεψη ρίζας
            self.inorder(node.right, result)
        return result
    
    def postorder(self, node, result=None):
        """Post-order: Αριστερά → Δεξιά → Ρίζα"""
        if result is None:
            result = []
        if node:
            self.postorder(node.left, result)
            self.postorder(node.right, result)
            result.append(node.value)  # Επίσκεψη ρίζας
        return result

# Δημιουργία BST
root = TreeNode(50)
root.left = TreeNode(30)
root.right = TreeNode(70)
root.left.left = TreeNode(20)
root.left.right = TreeNode(40)
root.right.left = TreeNode(60)
root.right.right = TreeNode(80)

traversal = TreeTraversal()
print("Pre-order:", traversal.preorder(root))
print("In-order (ταξινομημένη):", traversal.inorder(root))
print("Post-order:", traversal.postorder(root))
```

### C++
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

class TreeTraversal {
public:
    // Pre-order: Ρίζα → Αριστερά → Δεξιά
    void preorder(TreeNode* node, vector<int>& result) {
        if (node) {
            result.push_back(node->value);  // Επίσκεψη ρίζας
            preorder(node->left, result);
            preorder(node->right, result);
        }
    }
    
    // In-order: Αριστερά → Ρίζα → Δεξιά (ταξινομημένη για BST)
    void inorder(TreeNode* node, vector<int>& result) {
        if (node) {
            inorder(node->left, result);
            result.push_back(node->value);  // Επίσκεψη ρίζας
            inorder(node->right, result);
        }
    }
    
    // Post-order: Αριστερά → Δεξιά → Ρίζα
    void postorder(TreeNode* node, vector<int>& result) {
        if (node) {
            postorder(node->left, result);
            postorder(node->right, result);
            result.push_back(node->value);  // Επίσκεψη ρίζας
        }
    }
};

void printVector(const vector<int>& vec) {
    for (int val : vec) {
        cout << val << " ";
    }
    cout << endl;
}

void freeTree(TreeNode* node) {
    if (!node) return;
    freeTree(node->left);
    freeTree(node->right);
    delete node;
}

int main() {
    // Δημιουργία BST
    TreeNode* root = new TreeNode(50);
    root->left = new TreeNode(30);
    root->right = new TreeNode(70);
    root->left->left = new TreeNode(20);
    root->left->right = new TreeNode(40);
    root->right->left = new TreeNode(60);
    root->right->right = new TreeNode(80);
    
    TreeTraversal traversal;
    vector<int> result;
    
    result.clear();
    traversal.preorder(root, result);
    cout << "Pre-order: ";
    printVector(result);
    
    result.clear();
    traversal.inorder(root, result);
    cout << "In-order (ταξινομημένη): ";
    printVector(result);
    
    result.clear();
    traversal.postorder(root, result);
    cout << "Post-order: ";
    printVector(result);
    
    freeTree(root);
    
    return 0;
}
```

## 4. Ισοζυγισμένα Δέντρα

Ένα δέντρο θεωρείται **ισοζυγισμένο** όταν για κάθε κόμβο, το ύψος του αριστερού και δεξιού υποδέντρου διαφέρει το πολύ κατά 1.

**Επίδραση της ισορροπίας στην απόδοση:**

| Πράξη | Μη Ισορροπημένο BST | Ισορροπημένο BST |
|---|---|---|
| Αναζήτηση | O(n) (χειρότερη) | O(log n) |
| Εισαγωγή | O(n) (χειρότερη) | O(log n) |
| Διαγραφή | O(n) (χειρότερη) | O(log n) |

**Παράδειγμα μη ισορροπημένου:** Εισαγωγή ταξινομημένων στοιχείων (1,2,3,4,5) δημιουργεί γραμμική αλυσίδα.

**Γιατί είναι σημαντικό:** Ένα ισορροπημένο δέντρο διατηρεί λογαριθμικό ύψος, εξασφαλίζοντας γρήγορες λειτουργίες.

### Python
```python
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def height(node):
    """Υπολογίζει το ύψος του κόμβου"""
    if node is None:
        return -1
    return 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    """Ελέγχει αν το δέντρο είναι ισορροπημένο"""
    if node is None:
        return True
    
    left_height = height(node.left)
    right_height = height(node.right)
    
    # Έλεγχος διαφοράς ύψους και αναδρομικός έλεγχος υποδέντρων
    if (abs(left_height - right_height) <= 1 and 
        is_balanced(node.left) and 
        is_balanced(node.right)):
        return True
    
    return False

# Παράδειγμα 1: Ισορροπημένο δέντρο
balanced_root = TreeNode(10)
balanced_root.left = TreeNode(5)
balanced_root.right = TreeNode(15)
balanced_root.left.left = TreeNode(3)
balanced_root.left.right = TreeNode(7)

# Παράδειγμα 2: Μη ισορροπημένο δέντρο (γραμμική αλυσίδα)
unbalanced_root = TreeNode(1)
unbalanced_root.right = TreeNode(2)
unbalanced_root.right.right = TreeNode(3)
unbalanced_root.right.right.right = TreeNode(4)

print("Ισορροπημένο δέντρο:", is_balanced(balanced_root))
print("Ύψος ισορροπημένου:", height(balanced_root))
print("\nΜη ισορροπημένο δέντρο:", is_balanced(unbalanced_root))
print("Ύψος μη ισορροπημένου:", height(unbalanced_root))
```

### C++
```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

int height(TreeNode* node) {
    if (node == nullptr) return -1;
    return 1 + max(height(node->left), height(node->right));
}

bool isBalanced(TreeNode* node) {
    if (node == nullptr) return true;
    
    int leftHeight = height(node->left);
    int rightHeight = height(node->right);
    
    // Έλεγχος διαφοράς ύψους και αναδρομικός έλεγχος υποδέντρων
    if (abs(leftHeight - rightHeight) <= 1 && 
        isBalanced(node->left) && 
        isBalanced(node->right)) {
        return true;
    }
    
    return false;
}

void freeTree(TreeNode* node) {
    if (node == nullptr) return;
    freeTree(node->left);
    freeTree(node->right);
    delete node;
}

int main() {
    // Παράδειγμα 1: Ισορροπημένο δέντρο
    TreeNode* balancedRoot = new TreeNode(10);
    balancedRoot->left = new TreeNode(5);
    balancedRoot->right = new TreeNode(15);
    balancedRoot->left->left = new TreeNode(3);
    balancedRoot->left->right = new TreeNode(7);
    
    // Παράδειγμα 2: Μη ισορροπημένο δέντρο
    TreeNode* unbalancedRoot = new TreeNode(1);
    unbalancedRoot->right = new TreeNode(2);
    unbalancedRoot->right->right = new TreeNode(3);
    unbalancedRoot->right->right->right = new TreeNode(4);
    
    cout << "Ισορροπημένο δέντρο: " << (isBalanced(balancedRoot) ? "Ναι" : "Όχι") << endl;
    cout << "Ύψος ισορροπημένου: " << height(balancedRoot) << endl;
    cout << "\nΜη ισορροπημένο δέντρο: " << (isBalanced(unbalancedRoot) ? "Ναι" : "Όχι") << endl;
    cout << "Ύψος μη ισορροπημένου: " << height(unbalancedRoot) << endl;
    
    freeTree(balancedRoot);
    freeTree(unbalancedRoot);
    
    return 0;
}
```

## 5. AVL Δέντρα

Το **AVL δέντρο** (Adelson-Velsky και Landis) είναι ένα αυτο-ισορροπούμενο BST όπου για κάθε κόμβο, η διαφορά ύψους μεταξύ αριστερού και δεξιού υποδέντρου (συντελεστής ισορροπίας) είναι το πολύ 1.

### Συντελεστής Ισορροπίας (Balance Factor)
$$\text{BF}(κόμβος) = \text{Ύψος(Αριστερό Υποδέντρο)} - \text{Ύψος(Δεξί Υποδέντρο)}$$

**Επιτρεπτές τιμές:** -1, 0, +1

### Τέσσερις Βασικές Περιστροφές

#### 1. **LL (Left-Left) Rotation - Δεξιά Περιστροφή**
- Πρόβλημα: Αριστερό υποδέντρο του αριστερού παιδιού
- Λύση: Μονή δεξιά περιστροφή

#### 2. **RR (Right-Right) Rotation - Αριστερή Περιστροφή**
- Πρόβλημα: Δεξί υποδέντρο του δεξιού παιδιού
- Λύση: Μονή αριστερή περιστροφή

#### 3. **LR (Left-Right) Rotation - Διπλή Περιστροφή**
- Πρόβλημα: Δεξί υποδέντρο του αριστερού παιδιού
- Λύση: Αριστερή περιστροφή στο παιδί, μετά δεξιά στη ρίζα

#### 4. **RL (Right-Left) Rotation - Διπλή Περιστροφή**
- Πρόβλημα: Αριστερό υποδέντρο του δεξιού παιδιού
- Λύση: Δεξιά περιστροφή στο παιδί, μετά αριστερή στη ρίζα

### Python
```python
class AVLNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.height = 0

class AVLTree:
    def get_height(self, node):
        """Επιστρέφει το ύψος του κόμβου"""
        return node.height if node else -1
    
    def get_balance_factor(self, node):
        """Υπολογίζει τον συντελεστή ισορροπίας"""
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)
    
    def update_height(self, node):
        """Ενημερώνει το ύψος του κόμβου"""
        if node:
            node.height = 1 + max(self.get_height(node.left), 
                                  self.get_height(node.right))
    
    def rotate_right(self, y):
        """LL Rotation - Δεξιά Περιστροφή"""
        x = y.left
        T2 = x.right
        
        # Εκτέλεση περιστροφής
        x.right = y
        y.left = T2
        
        # Ενημέρωση ύψους
        self.update_height(y)
        self.update_height(x)
        
        return x
    
    def rotate_left(self, x):
        """RR Rotation - Αριστερή Περιστροφή"""
        y = x.right
        T2 = y.left
        
        # Εκτέλεση περιστροφής
        y.left = x
        x.right = T2
        
        # Ενημέρωση ύψους
        self.update_height(x)
        self.update_height(y)
        
        return y
    
    def insert(self, node, value):
        """Εισαγωγή με αυτόματη εξισορρόπηση"""
        # Βήμα 1: Κανονική BST εισαγωγή
        if not node:
            return AVLNode(value)
        
        if value < node.value:
            node.left = self.insert(node.left, value)
        else:
            node.right = self.insert(node.right, value)
        
        # Βήμα 2: Ενημέρωση ύψους
        self.update_height(node)
        
        # Βήμα 3: Έλεγχος balance factor
        balance = self.get_balance_factor(node)
        
        # Βήμα 4: Εφαρμογή περιστροφών αν χρειάζεται
        
        # LL Case
        if balance > 1 and value < node.left.value:
            return self.rotate_right(node)
        
        # RR Case
        if balance < -1 and value > node.right.value:
            return self.rotate_left(node)
        
        # LR Case
        if balance > 1 and value > node.left.value:
            node.left = self.rotate_left(node.left)
            return self.rotate_right(node)
        
        # RL Case
        if balance < -1 and value < node.right.value:
            node.right = self.rotate_right(node.right)
            return self.rotate_left(node)
        
        return node
    
    def inorder(self, node, result=None):
        """In-order διάσχιση"""
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.value)
            self.inorder(node.right, result)
        return result

# Παράδειγμα χρήσης
avl = AVLTree()
root = None

# Εισαγωγή στοιχείων που θα προκαλούσαν ανισορροπία σε απλό BST
values = [10, 20, 30, 40, 50, 25]
for val in values:
    root = avl.insert(root, val)
    print(f"Μετά την εισαγωγή {val}:")
    print(f"  In-order: {avl.inorder(root)}")
    print(f"  Ύψος: {avl.get_height(root)}")
    print(f"  Balance Factor ρίζας: {avl.get_balance_factor(root)}")
```

### C++
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

struct AVLNode {
    int value;
    AVLNode* left;
    AVLNode* right;
    int height;
    
    AVLNode(int val) : value(val), left(nullptr), right(nullptr), height(0) {}
};

class AVLTree {
private:
    int getHeight(AVLNode* node) {
        return node ? node->height : -1;
    }
    
    int getBalanceFactor(AVLNode* node) {
        if (!node) return 0;
        return getHeight(node->left) - getHeight(node->right);
    }
    
    void updateHeight(AVLNode* node) {
        if (node) {
            node->height = 1 + max(getHeight(node->left), getHeight(node->right));
        }
    }
    
    // LL Rotation - Δεξιά Περιστροφή
    AVLNode* rotateRight(AVLNode* y) {
        AVLNode* x = y->left;
        AVLNode* T2 = x->right;
        
        // Εκτέλεση περιστροφής
        x->right = y;
        y->left = T2;
        
        // Ενημέρωση ύψους
        updateHeight(y);
        updateHeight(x);
        
        return x;
    }
    
    // RR Rotation - Αριστερή Περιστροφή
    AVLNode* rotateLeft(AVLNode* x) {
        AVLNode* y = x->right;
        AVLNode* T2 = y->left;
        
        // Εκτέλεση περιστροφής
        y->left = x;
        x->right = T2;
        
        // Ενημέρωση ύψους
        updateHeight(x);
        updateHeight(y);
        
        return y;
    }

public:
    AVLNode* insert(AVLNode* node, int value) {
        // Βήμα 1: Κανονική BST εισαγωγή
        if (!node) return new AVLNode(value);
        
        if (value < node->value) {
            node->left = insert(node->left, value);
        } else {
            node->right = insert(node->right, value);
        }
        
        // Βήμα 2: Ενημέρωση ύψους
        updateHeight(node);
        
        // Βήμα 3: Έλεγχος balance factor
        int balance = getBalanceFactor(node);
        
        // Βήμα 4: Εφαρμογή περιστροφών
        
        // LL Case
        if (balance > 1 && value < node->left->value) {
            return rotateRight(node);
        }
        
        // RR Case
        if (balance < -1 && value > node->right->value) {
            return rotateLeft(node);
        }
        
        // LR Case
        if (balance > 1 && value > node->left->value) {
            node->left = rotateLeft(node->left);
            return rotateRight(node);
        }
        
        // RL Case
        if (balance < -1 && value < node->right->value) {
            node->right = rotateRight(node->right);
            return rotateLeft(node);
        }
        
        return node;
    }
    
    void inorder(AVLNode* node, vector<int>& result) {
        if (node) {
            inorder(node->left, result);
            result.push_back(node->value);
            inorder(node->right, result);
        }
    }
    
    int height(AVLNode* node) {
        return getHeight(node);
    }
    
    int balanceFactor(AVLNode* node) {
        return getBalanceFactor(node);
    }
};

void freeTree(AVLNode* node) {
    if (!node) return;
    freeTree(node->left);
    freeTree(node->right);
    delete node;
}

int main() {
    AVLTree avl;
    AVLNode* root = nullptr;
    
    // Εισαγωγή στοιχείων που θα προκαλούσαν ανισορροπία σε απλό BST
    int values[] = {10, 20, 30, 40, 50, 25};
    
    for (int val : values) {
        root = avl.insert(root, val);
        
        vector<int> result;
        avl.inorder(root, result);
        
        cout << "Μετά την εισαγωγή " << val << ":" << endl;
        cout << "  In-order: ";
        for (int v : result) cout << v << " ";
        cout << endl;
        cout << "  Ύψος: " << avl.height(root) << endl;
        cout << "  Balance Factor ρίζας: " << avl.balanceFactor(root) << endl;
    }
    
    freeTree(root);
    root = nullptr;
    
    return 0;
}
```

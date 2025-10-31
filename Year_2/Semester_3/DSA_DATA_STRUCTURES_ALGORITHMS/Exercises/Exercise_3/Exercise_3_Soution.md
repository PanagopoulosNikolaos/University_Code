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
        """Calculates the height of the tree"""
        if node is None:
            return -1
        left_height = self.height(node.left)
        right_height = self.height(node.right)
        return max(left_height, right_height) + 1
    
    def count_nodes(self, node):
        """Counts total nodes"""
        if node is None:
            return 0
        return 1 + self.count_nodes(node.left) + self.count_nodes(node.right)
    
    def count_leaves(self, node):
        """Counts leaves (nodes without children)"""
        if node is None:
            return 0
        if node.left is None and node.right is None:
            return 1
        return self.count_leaves(node.left) + self.count_leaves(node.right)

# Example usage
tree = BinaryTree(1)
tree.root.left = TreeNode(2)
tree.root.right = TreeNode(3)
tree.root.left.left = TreeNode(4)
tree.root.left.right = TreeNode(5)

print("Tree height:", tree.height(tree.root))
print("Total nodes:", tree.count_nodes(tree.root))
print("Number of leaves:", tree.count_leaves(tree.root))
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
    
    // Calculates the height of the tree
    int height(TreeNode* node) {
        if (node == nullptr) return -1;
        int left_height = height(node->left);
        int right_height = height(node->right);
        return max(left_height, right_height) + 1;
    }
    
    // Counts total nodes
    int countNodes(TreeNode* node) {
        if (node == nullptr) return 0;
        return 1 + countNodes(node->left) + countNodes(node->right);
    }
    
    // Counts leaves
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
    
    cout << "Tree height: " << tree.height(tree.root) << endl;
    cout << "Total nodes: " << tree.countNodes(tree.root) << endl;
    cout << "Number of leaves: " << tree.countLeaves(tree.root) << endl;
    
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
        """Insert new value into BST"""
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
        """Search for value in BST - O(log n) for balanced tree"""
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
        """Finds the minimum value (leftmost node)"""
        if node is None:
            node = self.root
        while node.left is not None:
            node = node.left
        return node.value
    
    def find_max(self, node=None):
        """Finds the maximum value (rightmost node)"""
        if node is None:
            node = self.root
        while node.right is not None:
            node = node.right
        return node.value

# Example usage
bst = BST()
values = [50, 30, 70, 20, 40, 60, 80]
for val in values:
    bst.insert(val)

print("Search 40:", bst.search(40))
print("Search 100:", bst.search(100))
print("Minimum value:", bst.find_min())
print("Maximum value:", bst.find_max())
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
    
    // Insert new value into BST
    void insert(int value) {
        root = insertRecursive(root, value);
    }
    
    // Search for value - O(log n) for balanced tree
    bool search(int value) {
        return searchRecursive(root, value);
    }
    
    // Finds the minimum value
    int findMin() {
        BSTNode* current = root;
        while (current->left != nullptr) {
            current = current->left;
        }
        return current->value;
    }
    
    // Finds the maximum value
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
    
    cout << "Search 40: " << (bst.search(40) ? "Found" : "Not found") << endl;
    cout << "Search 100: " << (bst.search(100) ? "Found" : "Not found") << endl;
    cout << "Minimum value: " << bst.findMin() << endl;
    cout << "Maximum value: " << bst.findMax() << endl;
    
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
        """Pre-order: Root → Left → Right"""
        if result is None:
            result = []
        if node:
            result.append(node.value)  # Visit root
            self.preorder(node.left, result)
            self.preorder(node.right, result)
        return result
    
    def inorder(self, node, result=None):
        """In-order: Left → Root → Right (sorted for BST)"""
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.value)  # Visit root
            self.inorder(node.right, result)
        return result
    
    def postorder(self, node, result=None):
        """Post-order: Left → Right → Root"""
        if result is None:
            result = []
        if node:
            self.postorder(node.left, result)
            self.postorder(node.right, result)
            result.append(node.value)  # Visit root
        return result

# Create BST
root = TreeNode(50)
root.left = TreeNode(30)
root.right = TreeNode(70)
root.left.left = TreeNode(20)
root.left.right = TreeNode(40)
root.right.left = TreeNode(60)
root.right.right = TreeNode(80)

traversal = TreeTraversal()
print("Pre-order:", traversal.preorder(root))
print("In-order (sorted):", traversal.inorder(root))
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
    // Pre-order: Root → Left → Right
    void preorder(TreeNode* node, vector<int>& result) {
        if (node) {
            result.push_back(node->value);  // Visit root
            preorder(node->left, result);
            preorder(node->right, result);
        }
    }
    
    // In-order: Left → Root → Right (sorted for BST)
    void inorder(TreeNode* node, vector<int>& result) {
        if (node) {
            inorder(node->left, result);
            result.push_back(node->value);  // Visit root
            inorder(node->right, result);
        }
    }
    
    // Post-order: Left → Right → Root
    void postorder(TreeNode* node, vector<int>& result) {
        if (node) {
            postorder(node->left, result);
            postorder(node->right, result);
            result.push_back(node->value);  // Visit root
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
    // Create BST
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
    cout << "In-order (sorted): ";
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
    """Calculates the height of the node"""
    if node is None:
        return -1
    return 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    """Checks if the tree is balanced"""
    if node is None:
        return True
    
    left_height = height(node.left)
    right_height = height(node.right)
    
    # Check height difference and recursive check of subtrees
    if (abs(left_height - right_height) <= 1 and 
        is_balanced(node.left) and 
        is_balanced(node.right)):
        return True
    
    return False

# Example 1: Balanced tree
balanced_root = TreeNode(10)
balanced_root.left = TreeNode(5)
balanced_root.right = TreeNode(15)
balanced_root.left.left = TreeNode(3)
balanced_root.left.right = TreeNode(7)

# Example 2: Unbalanced tree (linear chain)
unbalanced_root = TreeNode(1)
unbalanced_root.right = TreeNode(2)
unbalanced_root.right.right = TreeNode(3)
unbalanced_root.right.right.right = TreeNode(4)

print("Balanced tree:", is_balanced(balanced_root))
print("Height of balanced:", height(balanced_root))
print("\nUnbalanced tree:", is_balanced(unbalanced_root))
print("Height of unbalanced:", height(unbalanced_root))
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
    
    // Check height difference and recursive check of subtrees
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
    // Example 1: Balanced tree
    TreeNode* balancedRoot = new TreeNode(10);
    balancedRoot->left = new TreeNode(5);
    balancedRoot->right = new TreeNode(15);
    balancedRoot->left->left = new TreeNode(3);
    balancedRoot->left->right = new TreeNode(7);
    
    // Example 2: Unbalanced tree
    TreeNode* unbalancedRoot = new TreeNode(1);
    unbalancedRoot->right = new TreeNode(2);
    unbalancedRoot->right->right = new TreeNode(3);
    unbalancedRoot->right->right->right = new TreeNode(4);
    
    cout << "Balanced tree: " << (isBalanced(balancedRoot) ? "Yes" : "No") << endl;
    cout << "Height of balanced: " << height(balancedRoot) << endl;
    cout << "\nUnbalanced tree: " << (isBalanced(unbalancedRoot) ? "Yes" : "No") << endl;
    cout << "Height of unbalanced: " << height(unbalancedRoot) << endl;
    
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
        """Returns the height of the node"""
        return node.height if node else -1
    
    def get_balance_factor(self, node):
        """Calculates the balance factor"""
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)
    
    def update_height(self, node):
        """Updates the height of the node"""
        if node:
            node.height = 1 + max(self.get_height(node.left), 
                                  self.get_height(node.right))
    
    def rotate_right(self, y):
        """LL Rotation - Right Rotation"""
        x = y.left
        T2 = x.right
        
        # Perform rotation
        x.right = y
        y.left = T2
        
        # Update height
        self.update_height(y)
        self.update_height(x)
        
        return x
    
    def rotate_left(self, x):
        """RR Rotation - Left Rotation"""
        y = x.right
        T2 = y.left
        
        # Perform rotation
        y.left = x
        x.right = T2
        
        # Update height
        self.update_height(x)
        self.update_height(y)
        
        return y
    
    def insert(self, node, value):
        """Insertion with automatic balancing"""
        # Step 1: Normal BST insertion
        if not node:
            return AVLNode(value)
        
        if value < node.value:
            node.left = self.insert(node.left, value)
        else:
            node.right = self.insert(node.right, value)
        
        # Step 2: Update height
        self.update_height(node)
        
        # Step 3: Check balance factor
        balance = self.get_balance_factor(node)
        
        # Step 4: Apply rotations if needed
        
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
        """In-order traversal"""
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.value)
            self.inorder(node.right, result)
        return result

# Example usage
avl = AVLTree()
root = None

# Insert values that would cause imbalance in simple BST
values = [10, 20, 30, 40, 50, 25]
for val in values:
    root = avl.insert(root, val)
    print(f"After inserting {val}:")
    print(f"  In-order: {avl.inorder(root)}")
    print(f"  Height: {avl.get_height(root)}")
    print(f"  Balance Factor of root: {avl.get_balance_factor(root)}")
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
    
    // LL Rotation - Right Rotation
    AVLNode* rotateRight(AVLNode* y) {
        AVLNode* x = y->left;
        AVLNode* T2 = x->right;
        
        // Perform rotation
        x->right = y;
        y->left = T2;
        
        // Update height
        updateHeight(y);
        updateHeight(x);
        
        return x;
    }
    
    // RR Rotation - Left Rotation
    AVLNode* rotateLeft(AVLNode* x) {
        AVLNode* y = x->right;
        AVLNode* T2 = y->left;
        
        // Perform rotation
        y->left = x;
        x->right = T2;
        
        // Update height
        updateHeight(x);
        updateHeight(y);
        
        return y;
    }

public:
    AVLNode* insert(AVLNode* node, int value) {
        // Step 1: Normal BST insertion
        if (!node) return new AVLNode(value);
        
        if (value < node->value) {
            node->left = insert(node->left, value);
        } else {
            node->right = insert(node->right, value);
        }
        
        // Step 2: Update height
        updateHeight(node);
        
        // Step 3: Check balance factor
        int balance = getBalanceFactor(node);
        
        // Step 4: Apply rotations
        
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
    
    // Insert values that would cause imbalance in simple BST
    int values[] = {10, 20, 30, 40, 50, 25};
    
    for (int val : values) {
        root = avl.insert(root, val);
        
        vector<int> result;
        avl.inorder(root, result);
        
        cout << "After inserting " << val << ":" << endl;
        cout << "  In-order: ";
        for (int v : result) cout << v << " ";
        cout << endl;
        cout << "  Height: " << avl.height(root) << endl;
        cout << "  Balance Factor of root: " << avl.balanceFactor(root) << endl;
    }
    
    freeTree(root);
    root = nullptr;
    
    return 0;
}
```


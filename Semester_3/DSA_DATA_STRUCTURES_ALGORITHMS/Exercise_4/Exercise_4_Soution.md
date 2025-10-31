# ΕΡΓΑΣΙΑ 4 – Σωροί, Κατακερματισμός και Κωδικοποίηση Huffman

Σε αυτή την εργασία απαντώ αναλυτικά στις θεωρητικές ερωτήσεις και συνοδεύω κάθε ενότητα με ενδεικτικό κώδικα σε Python και C++ με εκτυπώσεις και σχόλια στα Αγγλικά, όπως ζητήθηκε. Οι αλγόριθμοι υλοποιούνται με καθαρό, επεξηγηματικό τρόπο ώστε να αναδεικνύεται η λογική τους και οι πολυπλοκότητές τους.

## 1. Τι είναι σωρός (heap) και διαφορά ανάμεσα σε max heap και min heap; Πώς διατηρείται η ιδιότητα του σωρού σε εισαγωγή/διαγραφή;

Ένας σωρός (heap) είναι μια δομή δεδομένων βασισμένη σε πλήρες δυαδικό δέντρο που ικανοποιεί την ιδιότητα του σωρού:
- Σε έναν Max-Heap, κάθε κόμβος έχει τιμή μεγαλύτερη ή ίση από τα παιδιά του. Η μέγιστη τιμή βρίσκεται στη ρίζα.
- Σε έναν Min-Heap, κάθε κόμβος έχει τιμή μικρότερη ή ίση από τα παιδιά του. Η ελάχιστη τιμή βρίσκεται στη ρίζα.

Τυπικά υλοποιείται με πίνακα όπου, για κόμβο στη θέση i:
- Γονέας: (i - 1) // 2
- Αριστερό παιδί: 2i + 1
- Δεξί παιδί: 2i + 2

Διατήρηση ιδιότητας σωρού:
- Εισαγωγή: Προσθέτουμε στο τέλος του πίνακα και «ανεβάζουμε» (sift-up/bubble-up) το στοιχείο ανταλλάσσοντας με τον γονέα όσο παραβιάζεται η ιδιότητα. Πολυπλοκότητα: $O(\log n)$.
- Διαγραφή ρίζας: Αντικαθιστούμε τη ρίζα με το τελευταίο στοιχείο και «κατεβάζουμε» (sift-down/heapify-down) τη νέα ρίζα επιλέγοντας κατάλληλο παιδί μέχρι να αποκατασταθεί η ιδιότητα. Πολυπλοκότητα: $O(\log n)$.
- Δημιουργία σωρού από πίνακα (build-heap): Εφαρμόζουμε heapify από το μέσο προς τη ρίζα. Πολυπλοκότητα: $O(n)$.

Χρήσιμα χαρακτηριστικά:
- Πρόσβαση σε max/min σε $O(1)$.
- Εισαγωγή/εξαγωγή ρίζας σε $O(\log n)$.
- Ιδανικό για ουρές προτεραιότητας (βλ. ερώτηση 2).

### Python (array-based MinHeap με sift-up/sift-down)

```python
# Python
from typing import List, Optional

class MinHeap:
    def __init__(self):
        # Internal array to store heap elements
        self.data: List[int] = []

    def _parent(self, i: int) -> int:
        return (i - 1) // 2

    def _left(self, i: int) -> int:
        return 2 * i + 1

    def _right(self, i: int) -> int:
        return 2 * i + 2

    def _sift_up(self, i: int) -> None:
        # Move the element at index i up to restore heap property
        while i > 0 and self.data[i] < self.data[self._parent(i)]:
            self.data[i], self.data[self._parent(i)] = self.data[self._parent(i)], self.data[i]
            i = self._parent(i)

    def _sift_down(self, i: int) -> None:
        # Move the element at index i down to restore heap property
        n = len(self.data)
        while True:
            left = self._left(i)
            right = self._right(i)
            smallest = i

            if left < n and self.data[left] < self.data[smallest]:
                smallest = left
            if right < n and self.data[right] < self.data[smallest]:
                smallest = right

            if smallest == i:
                break

            self.data[i], self.data[smallest] = self.data[smallest], self.data[i]
            i = smallest

    def push(self, x: int) -> None:
        # Insert new element and fix the heap upwards
        self.data.append(x)
        self._sift_up(len(self.data) - 1)
        print(f"Pushed {x}, heap: {self.data}")

    def pop(self) -> Optional[int]:
        # Remove and return the minimum (root), then fix the heap downwards
        if not self.data:
            print("Pop on empty heap")
            return None
        root = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last
            self._sift_down(0)
        print(f"Popped {root}, heap: {self.data}")
        return root

    def peek(self) -> Optional[int]:
        # Return the minimum element without removing it
        return self.data[0] if self.data else None

# Demo
if __name__ == "__main__":
    h = MinHeap()
    for x in [5, 3, 8, 1, 2]:
        h.push(x)
    print("Min at root:", h.peek())
    while h.peek() is not None:
        h.pop()
```

Σημείωση: Για Max-Heap σε Python, μπορούμε να αποθηκεύουμε αρνητικά των τιμών ή να αντιστρέψουμε τον συγκριτή.

### C++ (priority_queue για max/min και ενδεικτικό heapify)

```cpp
// cpp
#include <bits/stdc++.h>
using namespace std;

void demo_priority_queue() {
    // Max-heap by default
    priority_queue<int> maxh;
    // Min-heap using greater<int>
    priority_queue<int, vector<int>, greater<int>> minh;

    for (int x : {5, 3, 8, 1, 2}) {
        maxh.push(x);
        minh.push(x);
    }

    cout << "Max-heap top (max element): " << maxh.top() << "\n";
    cout << "Min-heap top (min element): " << minh.top() << "\n";

    cout << "Max-heap pop order: ";
    while (!maxh.empty()) {
        cout << maxh.top() << " ";
        maxh.pop();
    }
    cout << "\n";

    cout << "Min-heap pop order: ";
    while (!minh.empty()) {
        cout << minh.top() << " ";
        minh.pop();
    }
    cout << "\n";
}

int main() {
    demo_priority_queue();
    return 0;
}
```

## 2. Γιατί οι σωροί είναι κατάλληλοι για Priority Queues; Παραδείγματα εφαρμογών

Μια ουρά προτεραιότητας υποστηρίζει:
- Εισαγωγή στοιχείου με προτεραιότητα σε $O(\log n)$.
- Εξαγωγή του στοιχείου υψηλότερης (ή χαμηλότερης) προτεραιότητας σε $O(\log n)$.
- Εύρεση στοιχείου προτεραιότητας σε $O(1)$.

Οι σωροί ταιριάζουν ιδανικά διότι διατηρούν τη ρίζα ως τρέχουσα «βέλτιστη» τιμή και επιτρέπουν αποτελεσματική αναδιάταξη με sift-up/sift-down.

Πραγματικές εφαρμογές:
- Χρονοπρογραμματισμός διεργασιών/γεγονότων (OS schedulers, event simulation).
- Δρομολόγηση και γράφοι (αλγόριθμος Dijkstra για συντομότερες διαδρομές).
- Συγχώνευση k-ταξινομημένων ροών/αρχείων.
- Διαχείριση εργασιών με SLA/προτεραιότητες.

### Python (min-heap ως priority queue, μικρό demo)

```python
# Python
import heapq

def schedule_tasks(tasks):
    """
    tasks: list of (priority, name)
    Lower number => higher priority (min-heap)
    """
    heap = []
    for pr, name in tasks:
        heapq.heappush(heap, (pr, name))
        print(f"Pushed task '{name}' with priority {pr}")

    print("Processing order:")
    while heap:
        pr, name = heapq.heappop(heap)
        print(f"Processing '{name}' with priority {pr}")

if __name__ == "__main__":
    schedule_tasks([(3, "email"), (1, "security patch"), (2, "build project")])
```

### C++ (priority_queue με custom struct)

```cpp
// cpp
#include <bits/stdc++.h>
using namespace std;

struct Task {
    int priority;     // lower is higher priority
    string name;
};

struct Cmp {
    bool operator()(const Task& a, const Task& b) const {
        // min-heap semantics for priority_queue (invert comparison)
        return a.priority > b.priority;
    }
};

int main() {
    priority_queue<Task, vector<Task>, Cmp> pq;
    pq.push({3, "email"});
    pq.push({1, "security patch"});
    pq.push({2, "build project"});

    cout << "Processing order:\n";
    while (!pq.empty()) {
        auto t = pq.top(); pq.pop();
        cout << "Processing '" << t.name << "' with priority " << t.priority << "\n";
    }
    return 0;
}
```

## 3. Τι είναι συνάρτηση κατακερματισμού και ποια χαρακτηριστικά την καθιστούν αποδοτική;

Συνάρτηση κατακερματισμού (hash function) μετατρέπει κλειδιά σε ακεραίους δείκτες (συνήθως στην περιοχή $[0, m-1]$) για χρήση σε πίνακα κατακερματισμού.

Χαρακτηριστικά αποδοτικότητας:
- Προσδιοριστικότητα (determinism): ίδιο κλειδί → ίδια τιμή.
- Ομοιόμορφη κατανομή: ισορροπημένη διασπορά κλειδιών στους κάδους (buckets) για ελάχιστες συγκρούσεις.
- Ταχύτητα: χαμηλό κόστος υπολογισμού ανά εισαγωγή/αναζήτηση.
- Καλή «ανάμιξη» (avalanche): μικρές αλλαγές στο κλειδί να αλλάζουν σημαντικά το hash.
- Κατάλληλη περιοχή εξόδου: modulo με το μέγεθος του πίνακα.
- Αποφυγή προφανών μοτίβων που προκαλούν clustering.

Παραδείγματα:
- Πολυωνυμικό κατακερμάτισμα συμβολοσειρών με βάση p και m (prime modulus).
- Συνθετικοί συνδυασμοί πεδίων (π.χ. για σύνθετα κλειδιά) με μίξη (bit-mixing).

### Python (απλό polynomial rolling hash)

```python
# Python
def poly_hash(s: str, p: int = 911382323, m: int = 10**9 + 7) -> int:
    """
    Polynomial rolling hash for strings.
    Not cryptographic. Good as a didactic example.
    """
    h = 0
    power = 1
    base = 131  # small base often used in practice
    for ch in s:
        h = (h + (ord(ch) * power) % m) % m
        power = (power * base) % m
    return h

if __name__ == "__main__":
    for s in ["abc", "abcd", "abXc", "xyz"]:
        print(f"hash('{s}') = {poly_hash(s)}")
```

### C++ (ίδια ιδέα)

```cpp
// cpp
#include <bits/stdc++.h>
using namespace std;

uint64_t poly_hash(const string& s, uint64_t m = 1000000007ULL) {
    const uint64_t base = 131;
    uint64_t h = 0, power = 1;
    for (unsigned char ch : s) {
        h = (h + (uint64_t)ch * power) % m;
        power = (power * base) % m;
    }
    return h;
}

int main() {
    for (string s : {"abc", "abcd", "abXc", "xyz"}) {
        cout << "hash('" << s << "') = " << poly_hash(s) << "\n";
    }
    return 0;
}
```

## 4. Δύο στρατηγικές επίλυσης συγκρούσεων (collisions) – πλεονεκτήματα/μειονεκτήματα

Όταν δύο κλειδιά δώσουν το ίδιο hash index, έχουμε «σύγκρουση». Συνήθεις στρατηγικές:

1) Separate Chaining (αλυσίδωση):
- Κάθε κάδος κρατά λίστα/αλυσίδα στοιχείων με ίδιο index.
- Πλεονεκτήματα: Απλή υλοποίηση, ο πίνακας μπορεί να έχει load factor > 1, διαγραφές απλές.
- Μειονεκτήματα: Extra pointers/λίστες, χειρότερη locality cache, σε κακή κατανομή μπορεί να γίνει $O(n)$.

2) Open Addressing (ανοικτή διευθυνσιοδότηση) – π.χ. Linear Probing:
- Όλα τα στοιχεία στον ίδιο πίνακα. Σε σύγκρουση, δοκιμάζουμε επόμενες θέσεις: $h(k), h(k)+1, h(k)+2, \dots$ modulo m.
- Πλεονεκτήματα: Καλό locality, απλή μνήμη (χωρίς λίστες).
- Μειονεκτήματα: Primary clustering, χρειάζεται προσεκτική διαχείριση διαγραφών (tombstones), απαιτεί load factor <~ 0.7 για καλή απόδοση.

Άλλες παραλλαγές: Quadratic probing, Double hashing (καλύπτουν clustering καλύτερα).

### Python (Hash Table με Chaining)

```python
# Python
class HashTableChaining:
    def __init__(self, m=8):
        self.m = m
        self.buckets = [[] for _ in range(m)]

    def _idx(self, key):
        return hash(key) % self.m

    def put(self, key, value):
        idx = self._idx(key)
        bucket = self.buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                print(f"Updated key '{key}' at bucket {idx}")
                return
        bucket.append((key, value))
        print(f"Inserted key '{key}' at bucket {idx}")

    def get(self, key):
        idx = self._idx(key)
        for k, v in self.buckets[idx]:
            if k == key:
                print(f"Found key '{key}' in bucket {idx}")
                return v
        print(f"Key '{key}' not found")
        return None

    def remove(self, key):
        idx = self._idx(key)
        bucket = self.buckets[idx]
        for i, (k, _) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                print(f"Removed key '{key}' from bucket {idx}")
                return True
        print(f"Key '{key}' not found to remove")
        return False

if __name__ == "__main__":
    ht = HashTableChaining(m=4)
    ht.put("alice", 1)
    ht.put("bob", 2)
    print(ht.get("alice"))
    ht.remove("alice")
    print(ht.get("alice"))
```

### Python (Hash Table με Linear Probing)

```python
# Python
class HashTableLinearProbing:
    def __init__(self, m=8):
        self.m = m
        self.keys = [None] * m
        self.values = [None] * m
        self.tombstone = object()
        self.n = 0

    def _idx(self, key):
        return hash(key) % self.m

    def _rehash(self):
        old_keys, old_vals = self.keys, self.values
        self.m *= 2
        self.keys = [None] * self.m
        self.values = [None] * self.m
        self.n = 0
        for k, v in zip(old_keys, old_vals):
            if k is not None and k is not self.tombstone:
                self.put(k, v)

    def put(self, key, value):
        if self.n >= self.m * 0.7:
            self._rehash()
        i = self._idx(key)
        while self.keys[i] not in (None, self.tombstone) and self.keys[i] != key:
            i = (i + 1) % self.m
        if self.keys[i] is None or self.keys[i] is self.tombstone:
            self.n += 1
        self.keys[i] = key
        self.values[i] = value
        print(f"Placed key '{key}' at index {i}")

    def get(self, key):
        i = self._idx(key)
        start = i
        while self.keys[i] is not None:
            if self.keys[i] != self.tombstone and self.keys[i] == key:
                print(f"Found key '{key}' at index {i}")
                return self.values[i]
            i = (i + 1) % self.m
            if i == start:
                break
        print(f"Key '{key}' not found")
        return None

    def remove(self, key):
        i = self._idx(key)
        start = i
        while self.keys[i] is not None:
            if self.keys[i] != self.tombstone and self.keys[i] == key:
                self.keys[i] = self.tombstone
                self.values[i] = None
                print(f"Marked key '{key}' as tombstone at index {i}")
                return True
            i = (i + 1) % self.m
            if i == start:
                break
        print(f"Key '{key}' not found to remove")
        return False

if __name__ == "__main__":
    ht = HashTableLinearProbing(m=4)
    ht.put("alice", 1)
    ht.put("bob", 2)
    ht.put("carl", 3)
    print(ht.get("bob"))
    ht.remove("bob")
    print(ht.get("bob"))
```

### C++ (μινιμαλιστικό chaining με vector<list<pair<...>>>)

```cpp
// cpp
#include <bits/stdc++.h>
using namespace std;

struct HashTableChaining {
    vector<list<pair<string,int>>> buckets;

    explicit HashTableChaining(size_t m = 8) : buckets(m) {}

    size_t idx(const string& key) const {
        return hash<string>{}(key) % buckets.size();
    }

    void put(const string& key, int value) {
        auto& L = buckets[idx(key)];
        for (auto& kv : L) {
            if (kv.first == key) {
                kv.second = value;
                cout << "Updated key '" << key << "'\n";
                return;
            }
        }
        L.emplace_back(key, value);
        cout << "Inserted key '" << key << "'\n";
    }

    optional<int> get(const string& key) const {
        const auto& L = buckets[idx(key)];
        for (const auto& kv : L) {
            if (kv.first == key) {
                cout << "Found key '" << key << "'\n";
                return kv.second;
            }
        }
        cout << "Key '" << key << "' not found\n";
        return nullopt;
    }

    bool removeKey(const string& key) {
        auto& L = buckets[idx(key)];
        for (auto it = L.begin(); it != L.end(); ++it) {
            if (it->first == key) {
                L.erase(it);
                cout << "Removed key '" << key << "'\n";
                return true;
            }
        }
        cout << "Key '" << key << "' not found to remove\n";
        return false;
    }
};

int main() {
    HashTableChaining ht(4);
    ht.put("alice", 1);
    ht.put("bob", 2);
    auto v = ht.get("alice");
    if (v) cout << "Value: " << *v << "\n";
    ht.removeKey("alice");
    ht.get("alice");
    return 0;
}
```

## 5. Κωδικοποίηση Huffman: κατασκευή δέντρου και βέλτιστοτητα

Βασική ιδέα:
- Δίνεται ένα σύνολο χαρακτήρων με συχνότητες. Θέλουμε prefix-free κωδικοποίηση που ελαχιστοποιεί το αναμενόμενο μήκος μηνύματος.
- Βήματα κατασκευής:
  1) Δημιουργία κόμβου για κάθε χαρακτήρα με βάρος = συχνότητα.
  2) Εισαγωγή όλων σε min-heap με βάση το βάρος.
  3) Επανάληψη μέχρι να μείνει ένας κόμβος:
     - Εξάγουμε δύο ελάχιστους κόμβους.
     - Δημιουργούμε νέο εσωτερικό κόμβο με βάρος = άθροισμα τους και παιδιά τους.
     - Εισάγουμε τον νέο κόμβο πίσω στο heap.
  4) Ο τελευταίος κόμβος είναι η ρίζα του δέντρου. Εκπορεύουμε κωδικούς: αριστερό άκρο → «0», δεξί άκρο → «1».
- Πολυπλοκότητα: $O(n \log n)$ για n μοναδικούς χαρακτήρες.

Γιατί είναι βέλτιστη (ως προς prefix-free κώδικες):
- Το Huffman είναι greedy και αποδεικνύεται βέλτιστο με «ανταλλαγή» (exchange argument) και ιδιότητα βέλτιστης υποδομής (optimal substructure). Συγκεκριμένα, οι δύο λιγότερο συχνοί χαρακτήρες θα είναι πάντα φύλλα στο μεγαλύτερο βάθος και η συγχώνευσή τους δεν χειροτερεύει λύση. Το αποτέλεσμα ελαχιστοποιεί το αναμενόμενο μήκος $L = \sum_i p_i \cdot \ell_i$, όπου $p_i$ οι πιθανότητες και $\ell_i$ τα μήκη κώδικα, και ικανοποιεί (ως prefix-free) τον περιορισμό Kraft–McMillan.

### Python (Huffman coding με heapq)

```python
# Python
import heapq
from typing import Dict, Optional, Tuple

class Node:
    def __init__(self, freq: int, ch: Optional[str] = None, left=None, right=None):
        self.freq = freq
        self.ch = ch
        self.left = left
        self.right = right

    # Needed for heapq to compare nodes by frequency
    def __lt__(self, other):
        return self.freq < other.freq

def build_huffman(freqs: Dict[str, int]) -> Optional[Node]:
    """
    Build Huffman tree from a frequency map.
    """
    heap = []
    for ch, f in freqs.items():
        heapq.heappush(heap, Node(f, ch))
    if not heap:
        return None
    if len(heap) == 1:
        # Edge case: single character
        only = heapq.heappop(heap)
        return Node(only.freq, None, only, None)

    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        merged = Node(a.freq + b.freq, None, a, b)
        heapq.heappush(heap, merged)
    return heap[0]

def build_codes(root: Optional[Node]) -> Dict[str, str]:
    """
    Traverse the Huffman tree to assign binary codes.
    """
    codes = {}
    def dfs(node: Node, path: str):
        if not node:
            return
        if node.ch is not None:  # leaf
            codes[node.ch] = path if path else "0"
            return
        dfs(node.left, path + "0")
        dfs(node.right, path + "1")
    dfs(root, "")
    return codes

def huffman_encode(text: str) -> Tuple[str, Dict[str, str]]:
    """
    Encode text using Huffman coding and return bitstring and code map.
    """
    # Compute frequencies
    freqs: Dict[str, int] = {}
    for ch in text:
        freqs[ch] = freqs.get(ch, 0) + 1
    print("Frequencies:", freqs)

    # Build tree and codes
    root = build_huffman(freqs)
    codes = build_codes(root)
    print("Huffman Codes:", codes)

    # Encode text
    encoded = "".join(codes[ch] for ch in text)
    print("Encoded bitstring:", encoded)
    return encoded, codes

if __name__ == "__main__":
    text = "huffman example"
    encoded, codes = huffman_encode(text)
```

### C++ (Huffman coding με priority_queue)

```cpp
// cpp
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int freq;
    char ch;         // valid only for leaves; use '\0' for internal
    Node* left;
    Node* right;
    Node(int f, char c='\0', Node* l=nullptr, Node* r=nullptr)
        : freq(f), ch(c), left(l), right(r) {}
};

struct Cmp {
    bool operator()(const Node* a, const Node* b) const {
        return a->freq > b->freq; // min-heap
    }
};

void build_codes(Node* node, const string& path, unordered_map<char,string>& codes) {
    if (!node) return;
    if (node->left == nullptr && node->right == nullptr) {
        codes[node->ch] = path.empty() ? "0" : path;
        return;
    }
    build_codes(node->left, path + "0", codes);
    build_codes(node->right, path + "1", codes);
}

void free_tree(Node* node) {
    if (!node) return;
    free_tree(node->left);
    free_tree(node->right);
    delete node;
}

int main() {
    string text = "huffman example";
    unordered_map<char,int> freq;
    for (char c : text) freq[c]++;

    cout << "Frequencies:\n";
    for (auto& [c, f] : freq) cout << "'" << c << "': " << f << "\n";

    priority_queue<Node*, vector<Node*>, Cmp> pq;
    for (auto& [c, f] : freq) pq.push(new Node(f, c));

    if (pq.empty()) return 0;
    if (pq.size() == 1) {
        Node* only = pq.top(); pq.pop();
        Node* root = new Node(only->freq, '\0', only, nullptr);
        unordered_map<char,string> codes;
        build_codes(root, "", codes);
        cout << "Huffman Codes:\n";
        for (auto& [c, code] : codes) cout << c << ": " << code << "\n";
        free_tree(root);
        return 0;
    }

    while (pq.size() > 1) {
        Node* a = pq.top(); pq.pop();
        Node* b = pq.top(); pq.pop();
        pq.push(new Node(a->freq + b->freq, '\0', a, b));
    }
    Node* root = pq.top();

    unordered_map<char,string> codes;
    build_codes(root, "", codes);

    cout << "Huffman Codes:\n";
    for (auto& [c, code] : codes) cout << c << ": " << code << "\n";

    string encoded;
    encoded.reserve(text.size() * 4);
    for (char c : text) encoded += codes[c];
    cout << "Encoded bitstring: " << encoded << "\n";

    free_tree(root);
    return 0;
}
```

---

Σύνοψη πολυπλοκοτήτων:
- Heap: insert/extract-root σε $O(\log n)$, find-top σε $O(1)$.
- Hashing: αναζήτηση/εισαγωγή/διαγραφή κατά μέσο όρο $O(1)$, χειρότερα $O(n)$.
- Huffman: κατασκευή δέντρου σε $O(n \log n)$, κωδικοποίηση κειμένου σε $O(|T|)$ μετά την παραγωγή κωδικών.



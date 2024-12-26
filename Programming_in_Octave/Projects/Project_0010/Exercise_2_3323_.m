function main()
  % Ορίζουμε τον πίνακα A
  A = [1 0 -1 0;
     0 2 3 -1;
    -1 3 2 2;
     0 -1 2 1];
  
  % Μετατρέπουμε τον πίνακα A σε κλιμακωτή μορφή και αποθηκεύουμε τις στοιχειώδεις μήτρες
  [A_klimakoto, elementary_matrices] = toEchelon(A);
  fprintf('Κλιμακωτός Πίνακας:\n');
  disp(A_klimakoto);
  
  % Μετατρέπουμε τον κλιμακωτό πίνακα σε ανοιγμένο κλιμακωτό πίνακα
  [A_anoigmenos_klimakotos, elementary_matrices] = toReducedEchelon(A_klimakoto, elementary_matrices);
  fprintf('Ανοιγμένος Κλιμακωτός Πίνακας:\n');
  disp(A_anoigmenos_klimakotos);
  
  % Υπολογίζουμε τον αντίστροφο του A χρησιμοποιώντας τις στοιχειώδεις μήτρες
  inverse_A = computeInverse(A, elementary_matrices);
  fprintf('Ο αντίστροφος του A είναι:\n');
  disp(inverse_A);
  
  % Ελέγχουμε αν το γινόμενο του A με τον αντίστροφό του δίνει την ταυτότητα
  identity_check = A * inverse_A;
  fprintf('Έλεγχος Α * A^(-1) = I:\n');
  disp(identity_check)
  assert(norm(eye(size(A)) - identity_check, 'fro') < 1e-10)
end

function [A_klimakoto, elementary_matrices] = toEchelon(A)
  A_klimakoto = A;
  n = size(A, 1);
  elementary_matrices = {};
  for i = 1:n-1
    % Αν το στοιχείο της διαγωνίου είναι πολύ μικρό, κάνουμε ανταλλαγή γραμμών
    if abs(A_klimakoto(i,i)) < 1e-10
      [A_klimakoto, E, found] = swapRows(A_klimakoto, i, n);
      if found
        elementary_matrices{end+1} = E;
      else
        continue
      end
    end
    % Μηδενίζουμε τα στοιχεία κάτω από τη διαγώνιο
    for j = i+1:n
      factor = A_klimakoto(j,i) / A_klimakoto(i,i);
      A_klimakoto(j,:) = A_klimakoto(j,:) - factor * A_klimakoto(i,:);
      E = eye(n);
      E(j, i) = -factor;
      elementary_matrices{end+1} = E;
    end
  end
end

function [A, E, found] = swapRows(A, i, n)
  found = false;
  for j = i+1:n
    % Βρίσκουμε γραμμή για ανταλλαγή
    if abs(A(j,i)) > 1e-10
      temp = A(i,:);
      A(i,:) = A(j,:);
      A(j,:) = temp;
      E = eye(n);
      temp = E(i,:);
      E(i,:) = E(j,:);
      E(j,:) = temp;
      found = true;
      return
    end
  end
  E = [];
end

function [A, elementary_matrices] = toReducedEchelon(A, elementary_matrices)
  n = size(A, 1);
  for i = n:-1:2
    % Μηδενίζουμε τα στοιχεία πάνω από τη διαγώνιο
    for j = i-1:-1:1
      factor = A(j, i) / A(i, i);
      A(j, :) = A(j, :) - factor * A(i, :);
      E = eye(n);
      E(j, i) = -factor;
      elementary_matrices{end+1} = E;
    end
  end
  for i = 1:n
    % Κανονικοποιούμε τις γραμμές
    factor = 1 / A(i, i);
    A(i, :) = A(i, :) * factor;
    E = eye(n);
    E(i,i) = factor;
    elementary_matrices{end+1} = E;
  end
end

function inverse_A = computeInverse(A, elementary_matrices)
  n = size(A, 1);
  inverse_A = eye(n);
  % Υπολογίζουμε τον αντίστροφο πολλαπλασιάζοντας τις στοιχειώδεις μήτρες
  for i = length(elementary_matrices):-1:1
    inverse_A = inverse_A * elementary_matrices{i};
  end
end

main()
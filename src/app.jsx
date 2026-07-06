import React, { useState } from 'react';

// --- EXPANDED DATA FROM PDFs (C00 to C09) ---
const modules = [
  {
    id: 'C00',
    name: 'C 00 - Basics & write()',
    exercises: ['ft_putchar', 'ft_print_alphabet', 'ft_print_reverse_alphabet', 'ft_print_numbers', 'ft_is_negative', 'ft_print_comb', 'ft_print_comb2', 'ft_putnbr', 'ft_print_combn'],
    quiz: [
      { q: 'Which function is explicitly allowed in C00?', options: ['printf', 'write', 'putchar', 'malloc'], answer: 'write' },
      { q: 'According to the subject, how must you call the write function in ft_putchar?', options: ['write(1, c, 1);', 'write(1, &c, 1);', 'write(0, &c, 1);', 'write(&c, 1);'], answer: 'write(1, &c, 1);' },
      { q: 'What is the exact penalty for using a forbidden function?', options: ['0', '-1', '-42', 'Automatic expulsion'], answer: '-42' },
      { q: 'What compilation flags does Moulinette use?', options: ['-Wall -Werror', '-W -Wall -Werror', '-Wall -Wextra -Werror', '-Wall -Wextra'], answer: '-Wall -Wextra -Werror' },
      { q: 'In ft_print_comb, why is 987 not in the expected output?', options: ['Because it is descending', 'Because 789 already is', 'Because it contains 9 twice', 'Because it is an odd number'], answer: 'Because 789 already is' },
      { q: 'What is the constraint for the parameter n in ft_print_combn?', options: ['0 <= n <= 10', '0 < n < 10', '1 < n < 9', 'n must be positive'], answer: '0 < n < 10' },
    ],
    problem: 'Write a function `void ft_print_combn(int n);` that displays all different combinations of n numbers by ascending order. n will be so that: 0 < n < 10.'
  },
  {
    id: 'C01',
    name: 'C 01 - Pointers',
    exercises: ['ft_ft', 'ft_ultimate_ft', 'ft_swap', 'ft_div_mod', 'ft_ultimate_div_mod', 'ft_putstr', 'ft_strlen', 'ft_rev_int_tab', 'ft_sort_int_tab'],
    quiz: [
      { q: 'What value must ft_ft assign to the int?', options: ['0', '21', '42', '1337'], answer: '42' },
      { q: 'What is the prototype of ft_ultimate_ft?', options: ['void ft_ultimate_ft(int *********nbr);', 'void ft_ultimate_ft(int *******nbr);', 'void ft_ultimate_ft(int **nbr);', 'void ft_ultimate_ft(int nbr);'], answer: 'void ft_ultimate_ft(int *********nbr);' },
      { q: 'How many parameters does ft_swap take?', options: ['1', '2', '3', '4'], answer: '2' },
      { q: 'In ft_div_mod, where is the remainder of the division stored?', options: ['In the int pointed by div', 'In the int pointed by mod', 'It is returned', 'In a global variable'], answer: 'In the int pointed by mod' },
      { q: 'In ft_ultimate_div_mod, what happens to the remainder?', options: ['It is lost', 'It is stored in the int pointed by a', 'It is stored in the int pointed by b', 'It is printed'], answer: 'It is stored in the int pointed by b' },
      { q: 'What are the arguments for ft_rev_int_tab?', options: ['int *tab, int size', 'int *tab, int start, int end', 'int size, int *tab', 'char *tab, int size'], answer: 'int *tab, int size' },
      { q: 'How does ft_sort_int_tab sort the array?', options: ['By descending order', 'By ascending order', 'Alphabetically', 'Randomly'], answer: 'By ascending order' },
    ],
    problem: 'Write a function `void ft_ultimate_div_mod(int *a, int *b);` that divides parameters a by b. The result is stored in the int pointed by a. The remainder is stored in the int pointed by b.'
  },
  {
    id: 'C02',
    name: 'C 02 - Strings',
    exercises: ['ft_strcpy', 'ft_strncpy', 'ft_str_is_alpha', 'ft_str_is_numeric', 'ft_str_is_lowercase', 'ft_str_is_uppercase', 'ft_str_is_printable', 'ft_strupcase', 'ft_strlowcase', 'ft_strcapitalize', 'ft_strlcpy', 'ft_putstr_non_printable', 'ft_print_memory'],
    quiz: [
      { q: 'What does ft_strcpy return?', options: ['Nothing (void)', 'The destination string (dest)', 'The source string (src)', 'The length of the string'], answer: 'The destination string (dest)' },
      { q: 'What should ft_str_is_alpha return if the string is empty?', options: ['0', '1', 'NULL', '-1'], answer: '1' },
      { q: 'How is a "word" defined in ft_strcapitalize?', options: ['A string of only alphabetical characters', 'A string of alphanumeric characters', 'A string separated by spaces', 'Any sequence of non-printable chars'], answer: 'A string of alphanumeric characters' },
      { q: 'What is the prototype of ft_strlcpy?', options: ['void ft_strlcpy(char *dest, char *src);', 'char *ft_strlcpy(char *dest, char *src, unsigned int n);', 'unsigned int ft_strlcpy(char *dest, char *src, unsigned int size);', 'int ft_strlcpy(char *dest, char *src);'], answer: 'unsigned int ft_strlcpy(char *dest, char *src, unsigned int size);' },
      { q: 'How does ft_putstr_non_printable display non-printable characters?', options: ['As octal values', 'As hexadecimal (lowercase) preceded by a backslash', 'As decimal values', 'Replaced by dots'], answer: 'As hexadecimal (lowercase) preceded by a backslash' },
      { q: 'In ft_print_memory, how many characters does each line handle?', options: ['8', '10', '16', '32'], answer: '16' },
      { q: 'In ft_print_memory, what replaces a non-printable character in the third column?', options: ['A space', 'A backslash', 'A dot (.)', 'A question mark (?)'], answer: 'A dot (.)' },
    ],
    problem: 'Write `void ft_putstr_non_printable(char *str);` that displays a string. If it contains non-printable characters, they must be displayed in the shape of hexadecimals (lowercase), preceded by a "backslash". Example: Coucou\\0atu vas bien ?'
  },
  {
    id: 'C03',
    name: 'C 03 - String Manipulation',
    exercises: ['ft_strcmp', 'ft_strncmp', 'ft_strcat', 'ft_strncat', 'ft_strstr', 'ft_strlcat'],
    quiz: [
      { q: 'What does ft_strcmp return?', options: ['A boolean (1 or 0)', 'The difference between the ASCII values of the first differing characters', 'The length of the strings', '0 if true, 1 if false'], answer: 'The difference between the ASCII values of the first differing characters' },
      { q: 'What is the third parameter of ft_strncmp?', options: ['char c', 'int n', 'unsigned int n', 'size_t n'], answer: 'unsigned int n' },
      { q: 'What does ft_strcat do?', options: ['Compares two strings', 'Concatenates src to dest', 'Finds the first occurrence of a substring', 'Copies a string'], answer: 'Concatenates src to dest' },
      { q: 'What does ft_strstr return if the substring is not found?', options: ['0', 'NULL', 'The original string', '-1'], answer: 'NULL' },
      { q: 'What is the validation threshold for C03?', options: ['0%', '50%', '75%', '100%'], answer: '50%' },
      { q: 'What must ft_strlcat guarantee about the destination string?', options: ['It must be uppercase', 'It is always null-terminated (unless size is 0)', 'It must not contain spaces', 'It must be freed manually'], answer: 'It is always null-terminated (unless size is 0)' },
    ],
    problem: 'Write `char *ft_strstr(char *str, char *to_find);` that reproduces the behavior of `strstr`. If `to_find` is an empty string, the function must return `str`.'
  },
  {
    id: 'C04',
    name: 'C 04 - Numbers & Bases',
    exercises: ['ft_strlen', 'ft_putstr', 'ft_putnbr', 'ft_atoi', 'ft_putnbr_base', 'ft_atoi_base'],
    quiz: [
      { q: 'How does ft_atoi handle the string " ---+--+1234ab567"?', options: ['Returns 1234', 'Returns -1234', 'Returns 0', 'Returns 567'], answer: 'Returns -1234' },
      { q: 'Which of the following makes a base INVALID for ft_putnbr_base?', options: ['Base contains +', 'Base contains -', 'Base contains duplicate characters', 'All of the above'], answer: 'All of the above' },
      { q: 'Must ft_putnbr_base handle negative numbers?', options: ['No', 'Yes', 'Only if the base is decimal', 'Only if the base is binary'], answer: 'Yes' },
      { q: 'What does ft_atoi_base return if the base is invalid?', options: ['0', '-1', 'NULL', 'The original string'], answer: '0' },
      { q: 'According to the subject, "poneyvif" is a base system for?', options: ['Decimal', 'Binary', 'Hexadecimal', 'Octal'], answer: 'Octal' },
      { q: 'What must ft_putnbr be able to display?', options: ['Only positive numbers', 'All possible values within an int type variable', 'Only numbers up to 99', 'Only even numbers'], answer: 'All possible values within an int type variable' },
    ],
    problem: 'Write `int ft_atoi_base(char *str, char *base);` that converts the initial portion of `str` to an int representation, based on the given `base`. Handle whitespaces, signs, and invalid bases!'
  },
  {
    id: 'C05',
    name: 'C 05 - Math & Recursion',
    exercises: ['ft_iterative_factorial', 'ft_recursive_factorial', 'ft_iterative_power', 'ft_recursive_power', 'ft_fibonacci', 'ft_sqrt', 'ft_is_prime', 'ft_find_next_prime', 'ft_ten_queens_puzzle'],
    quiz: [
      { q: 'What does ft_fibonacci return if the index is less than 0?', options: ['0', '1', '-1', 'NULL'], answer: '-1' },
      { q: 'What should ft_iterative_power return for 0 power 0?', options: ['0', '1', '-1', 'Undefined'], answer: '1' },
      { q: 'What does ft_sqrt return if the square root is an irrational number?', options: ['0', '-1', 'The integer part', 'NULL'], answer: '0' },
      { q: 'Are 0 and 1 considered prime numbers by ft_is_prime?', options: ['Yes', 'No', 'Only 1', 'Only 0'], answer: 'No' },
      { q: 'What does ft_find_next_prime return if the argument is already prime?', options: ['The next prime', 'The argument itself', '0', '-1'], answer: 'The argument itself' },
      { q: 'How is recursivity used in ft_ten_queens_puzzle?', options: ['It is optional', 'It is forbidden', 'It is required to solve the problem', 'Only for printing'], answer: 'It is required to solve the problem' },
      { q: 'In ft_ten_queens_puzzle, what does the first digit of the output represent?', options: ['The row of the Queen in the first column', 'The column of the Queen in the first row', 'The total number of Queens', 'The board size'], answer: 'The row of the Queen in the first column' },
    ],
    problem: 'Write `int ft_ten_queens_puzzle(void);` that displays all possible placements of ten queens on a chessboard. Recursivity is required. The return value must be the total number of displayed solutions.'
  },
  {
    id: 'C06',
    name: 'C 06 - Command Line Arguments',
    exercises: ['ft_print_program_name', 'ft_print_params', 'ft_rev_params', 'ft_sort_params'],
    quiz: [
      { q: 'Do you need to submit a main() function for C06?', options: ['No, only libraries', 'Yes, because they are programs', 'Only for ex00', 'Only if requested by Moulinette'], answer: 'Yes, because they are programs' },
      { q: 'What does ft_print_program_name display?', options: ['The first argument passed to the program', 'The name of the user', 'The current directory', 'Nothing'], answer: 'The first argument passed to the program' },
      { q: 'In ft_print_params, which arguments should be displayed?', options: ['All arguments', 'All arguments except argv[0]', 'Only argv[0]', 'Only the first 3 arguments'], answer: 'All arguments except argv[0]' },
      { q: 'What is the output order of ft_rev_params?', options: ['Ascending order', 'Descending order', 'Reverse order of the command line', 'Random order'], answer: 'Reverse order of the command line' },
      { q: 'How does ft_sort_params sort the arguments?', options: ['By length', 'By ASCII order', 'Alphabetically ignoring case', 'Reverse alphabetical'], answer: 'By ASCII order' },
      { q: 'How many arguments per line are displayed in ft_sort_params?', options: ['One', 'Two', 'Five', 'All on one line'], answer: 'One' },
    ],
    problem: 'Write a program `ft_sort_params.c` that displays its given arguments sorted by ASCII order. It should display all arguments, except for argv[0]. One argument per line.'
  },
  {
    id: 'C07',
    name: 'C 07 - Memory Allocation (malloc)',
    exercises: ['ft_strdup', 'ft_range', 'ft_ultimate_range', 'ft_strjoin', 'ft_convert_base', 'ft_split'],
    quiz: [
      { q: 'Which function is newly allowed in C07?', options: ['printf', 'malloc', 'free', 'read'], answer: 'malloc' },
      { q: 'What should ft_range return if min >= max?', options: ['0', 'NULL', 'A negative number', 'An empty array'], answer: 'NULL' },
      { q: 'What does ft_ultimate_range return on success?', options: ['The array of ints', 'The size of the range', '0', 'NULL'], answer: 'The size of the range' },
      { q: 'What must ft_strjoin return if `size` is 0?', options: ['NULL', '0', 'An empty string that can be freed', 'A pointer to the separator'], answer: 'An empty string that can be freed' },
      { q: 'What happens to the returned number in ft_convert_base if it is negative?', options: ['It has no sign', 'It is prefixed by a single and unique \'-\'', 'It is prefixed by multiple \'-\'', 'It is returned as positive'], answer: 'It is prefixed by a single and unique \'-\'' },
      { q: 'What marks the end of the array returned by ft_split?', options: ['A NULL character (0)', 'A newline', 'The size of the array', 'An empty string'], answer: 'A NULL character (0)' },
      { q: 'Can there be empty strings in the array returned by ft_split?', options: ['Yes', 'No', 'Only at the beginning', 'Only at the end'], answer: 'No' },
    ],
    problem: 'Write `char **ft_split(char *str, char *charset);` that splits a string depending on the charset. The function returns an array of strings. The last element must equal 0. There cannot be any empty strings in the array.'
  },
  {
    id: 'C08',
    name: 'C 08 - Headers & Structs',
    exercises: ['ft.h', 'ft_boolean.h', 'ft_abs.h', 'ft_point.h', 'ft_strs_to_tab', 'ft_show_tab'],
    quiz: [
      { q: 'What type of file are you required to create in ex00 of C08?', options: ['.c source file', '.h header file', 'Makefile', 'Shell script'], answer: '.h header file' },
      { q: 'What does the ft_boolean.h file define?', options: ['Variables', 'Macros like TRUE, FALSE, EVEN, ODD', 'Structures', 'Main functions'], answer: 'Macros like TRUE, FALSE, EVEN, ODD' },
      { q: 'What flag must Norminette be launched with for C08?', options: ['-R CheckForbiddenSourceHeader', '-R CheckDefine', '-R CheckGlobal', '-R CheckFunction'], answer: '-R CheckDefine' },
      { q: 'What is the prototype of `ft_strs_to_tab`?', options: ['char *ft_strs_to_tab(int ac, char **av);', 'struct s_stock_str *ft_strs_to_tab(int ac, char **av);', 'int ft_strs_to_tab(char **av);', 'void ft_strs_to_tab(t_stock_str *str);'], answer: 'struct s_stock_str *ft_strs_to_tab(int ac, char **av);' },
      { q: 'What must the last element\'s `str` be set to in `ft_strs_to_tab`?', options: ['0', 'NULL', '-1', '""'], answer: '0' },
      { q: 'In ft_show_tab, what is displayed for each element?', options: ['Only the string', 'The string, size, and copy, each followed by a newline', 'The size and copy', 'The copy and size'], answer: 'The string, size, and copy, each followed by a newline' },
    ],
    problem: 'Create `ft_abs.h` that defines a macro `ABS` which replaces its argument by its absolute value. Then write `struct s_stock_str *ft_strs_to_tab(int ac, char **av);` which transforms `av` into a structure array containing size, str, and copy.'
  },
  {
    id: 'C09',
    name: 'C 09 - Makefiles & libft',
    exercises: ['libft', 'Makefile', 'ft_split'],
    quiz: [
      { q: 'What script must you create to compile your library in ex00?', options: ['compile.sh', 'libft_creator.sh', 'run.sh', 'build.sh'], answer: 'libft_creator.sh' },
      { q: 'What is the name of the library you must create?', options: ['lib42.a', 'libft.so', 'libft.a', 'mylib.a'], answer: 'libft.a' },
      { q: 'What rules must the Makefile in C09 implement?', options: ['all, clean, fclean, re, libft.a', 'build, run, stop', 'compile, link, execute', 'start, end'], answer: 'all, clean, fclean, re, libft.a' },
      { q: 'What flags must be used when compiling with cc in C09?', options: ['-Wall -Wextra -Werror', '-W -Werror -Wall', '-Wall -We -Werr', '-g -Wall'], answer: '-Wall -Wextra -Werror' },
      { q: 'Where should the .o files be placed?', options: ['In a separate obj/ directory', 'Near their .c file', 'In the root directory', 'They shouldn\'t exist'], answer: 'Near their .c file' },
      { q: 'Where does the Makefile get its source files from?', options: ['The root directory', 'The "srcs" directory', 'The "includes" directory', 'The "obj" directory'], answer: 'The "srcs" directory' },
      { q: 'What should `make` be equal to by default?', options: ['make clean', 'make all', 'make fclean', 'make re'], answer: 'make all' },
    ],
    problem: 'Write a `Makefile` that compiles a library `libft.a`. It must get its source files from the `srcs` directory and headers from `includes`. Implement `all`, `clean`, `fclean`, and `re`. The Makefile should print all the commands it\'s running and should not run any unnecessary command.'
  }
];

// --- MAIN COMPONENT ---
export default function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [view, setView] = useState('dashboard'); // dashboard, quiz, result, problem
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = (module) => {
    setSelectedModule(module);
    setAnswers([]);
    setCurrentQ(0);
    setScore(0);
    setView('quiz');
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (option === selectedModule.quiz[currentQ].answer) {
      setScore(score + 1);
    }

    if (currentQ < selectedModule.quiz.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setView('result');
    }
  };

  const generateProblem = () => {
    setView('problem');
  };

  const resetToDashboard = () => {
    setSelectedModule(null);
    setView('dashboard');
  };

  // --- DASHBOARD VIEW ---
  if (view === 'dashboard') {
    return (
      <div className="min-h-screen p-8 max-w-5xl mx-auto">
        <header className="border-b-2 border-42accent pb-4 mb-8">
          <h1 className="text-3xl font-bold text-42accent">42 PISCINE - MOULINETTE TESTER</h1>
          <p className="text-42text mt-2">Subject: C Piscine @ 42</p>
        </header>
        
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">Available Projects:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod) => (
              <div key={mod.id} className="border border-gray-700 p-4 hover:border-42accent transition-all">
                <h3 className="text-42accent font-bold mb-2">{mod.id}</h3>
                <p className="text-sm text-gray-400 mb-4">{mod.name}</p>
                <button 
                  onClick={() => startQuiz(mod)}
                  className="bg-42accent text-black px-4 py-2 font-bold hover:bg-white transition-colors w-full"
                >
                  START EVALUATION
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ VIEW ---
  if (view === 'quiz') {
    const question = selectedModule.quiz[currentQ];
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
        <div className="border border-gray-700 p-8 bg-42bg shadow-lg">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <span className="text-42accent font-bold">{selectedModule.id} - EVALUATION</span>
            <span className="text-gray-400">Question {currentQ + 1}/{selectedModule.quiz.length}</span>
          </div>
          
          <h2 className="text-xl text-white mb-8">{question.q}</h2>
          
          <div className="flex flex-col gap-4">
            {question.options.map((opt, idx) => (
              <button 
                key={idx}
                onClick={() => handleAnswer(opt)}
                className="text-left p-4 border border-gray-700 hover:border-42accent hover:bg-gray-800 transition-all text-42text"
              >
                <span className="text-42accent mr-2">[{String.fromCharCode(97 + idx)}]</span> {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (view === 'result') {
    const percentage = Math.round((score / selectedModule.quiz.length) * 100);
    const passed = percentage >= 50;
    
    return (
      <div className="min-h-screen p-8 max-w-3xl mx-auto flex flex-col justify-center">
        <div className={`border-2 p-8 bg-42bg shadow-lg ${passed ? 'border-42pass' : 'border-42fail'}`}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">MOULINETTE RESULT</h2>
            <div className={`text-6xl font-bold ${passed ? 'text-42pass' : 'text-42fail'}`}>
              {percentage}%
            </div>
            <p className={`mt-4 font-bold ${passed ? 'text-42pass' : 'text-42fail'}`}>
              {passed ? 'PROJECT VALIDATED' : 'PROJECT FAILED - CHEAT DETECTED? (-42)'}
            </p>
          </div>

          <div className="bg-gray-900 p-4 mb-6 border border-gray-700">
            <p className="text-gray-400">Score Details:</p>
            <p className="text-white">Correct answers: {score} / {selectedModule.quiz.length}</p>
            <p className="text-white">Threshold: 50%</p>
          </div>

          <button 
            onClick={generateProblem}
            className="w-full bg-42accent text-black p-4 font-bold hover:bg-white transition-colors mb-4"
          >
            CLAIM RANDOM EXAM PROBLEM
          </button>
          
          <button 
            onClick={resetToDashboard}
            className="w-full border border-gray-700 text-gray-400 p-4 hover:bg-gray-800 transition-all"
          >
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  // --- PROBLEM SOLVING VIEW ---
  if (view === 'problem' && selectedModule) {
    return (
      <div className="min-h-screen p-8 max-w-4xl mx-auto">
        <div className="border border-42accent p-8 bg-42bg">
          <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
            <span className="text-42accent font-bold">RANDOM EXERCISE GENERATOR</span>
            <span className="text-gray-400">Module: {selectedModule.id}</span>
          </div>

          <div className="bg-gray-900 p-6 border border-gray-700 mb-6">
            <p className="text-42text text-lg whitespace-pre-wrap">
              <span className="text-42accent">$> </span>
              {selectedModule.problem}
            </p>
          </div>

          <div className="bg-gray-900 p-4 border border-gray-700 mb-6">
            <p className="text-gray-400 mb-2">Allowed functions:</p>
            <p className="text-42pass">
              {selectedModule.id === 'C00' || selectedModule.id === 'C01' || selectedModule.id === 'C02' || selectedModule.id === 'C05' || selectedModule.id === 'C06' || selectedModule.id === 'C08' ? 'write, malloc' : 'None or specified in subject'}
            </p>
            <p className="text-gray-400 mt-2 text-sm">* Remember to add the 42 Header and pass Norminette!</p>
          </div>

          <div className="flex flex-col gap-4">
            <textarea 
              className="w-full h-48 bg-black border border-gray-700 p-4 text-42text font-mono focus:outline-none focus:border-42accent"
              placeholder="// Write your C code here..."
            ></textarea>
            
            <div className="flex gap-4">
              <button 
                onClick={() => alert('Compiling with: cc -Wall -Wextra -Werror...\n\nNorminette check...\n\n(In a real environment, your code would be tested here.)')}
                className="flex-1 bg-42accent text-black p-4 font-bold hover:bg-white transition-colors"
              >
                COMPILE & TEST
              </button>
              <button 
                onClick={resetToDashboard}
                className="flex-1 border border-gray-700 text-gray-400 p-4 hover:bg-gray-800 transition-all"
              >
                NEXT PROJECT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

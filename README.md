# cook-book-study

from computer arch point of view, 
reading from main memory is much better than reading from secondary memory (for cpu).

so as you can see, the execution time when reading more lines will be less than reading a line at a time.

# Note:
i know that time optimization i've done is kind of ridiculous, but its fair enough while we are only cares about the code style



# chapter3:

loading the entier file may be the worst senario, suppose that file has 1000,000 line with 1000 word in each, which means 1 GB of data.
for performace, you made its day, because as i said early, from computer arch point of view, reading from main memory is much better, and notice 
that we are talking about (I/O) operations, which means alot of time wasting; but, all the factors are calculated in related to the memory, while memory happy, all other factors will be happy.


# chapter3 cc calculation:
if i counted it right, we have a 35 node (instruction) with 28 path (work flow) and we have a one end of program.
by the equation `CC = E - N + 2P` the result is `35 - 28 + (2 * 1) = 9` not ideal, but we still in the safe side :D


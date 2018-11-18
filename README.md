# cook-book-study


# chapters overview : 

**chapter1:** i am lucky to be from the modern school, and unfortunuty i was not a part of the old school before.
              i am lucky because i can easily use variables and define abstractions, and i am sad because i should 
              read about the old school before this time, managing the memory for the application is not that easy
              it will upgrade your mind to think totaly diffrent about how the things go, keeping your mind fresh
              to manage the data accross the entier application thats what make a real programmer, these days i do'nt
              have to do that, we have larger memory now, with smarter compilers that can manage memory for us in most 
              cases, but it was awesome to learn how old school was.

**chapter2:** this was the most chapter i liked until now, alot of logic, alot of beauty in dealing with things, its closer
              to the technique of how the compilers works (stack based compilers), i was totally involved in this chapter.
              
**chapter3:** that is what we called spaghetti code these days, i did not like the approuch as i am trying to not use it
              in my own code, it may be a good for performance to left functions (you know function calls is a branch operation),
              but that will defenitlly lead to un maintainable code.
              
**chapter4:** i think its very common way to write code these days, alot of features needs this approuch -with pointing out- the       
              dangereous of globals, the shared state is kind of danger thing in the applications, but some times it must.
              so i keep try to use it when it must, not when it should.
              
              
              
 
 # chapter1 exc

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


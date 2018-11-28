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

**chapter5:**  its kind of special case of cookbook style, elimination of the global variable in such way, will surely leads
               to pipe-lining the functions, its commonly used in programming (at least for me :D)

**chapter6:** Not always the shortest is the best, i know that less code = less bugs, but sometimes you need to be clear in your code
              i like the style, but sometimes i try to avoid it.

**chapter7:** i think this is the very suitable style for this kind of processes, when i need to go through the same process more and more
              with a break condition at the end (traversing). but in javascript i'd rather prefer using of higher order functions such as `map`, `filter`

**chapter8:** this style is commonly named even-driven approach, wich is a widely used concept in javascript, many libraries in js based
              on this kind of approach, like JQuery, even javascript it self uses this usually, its a powerfull concept that will make the code execution on demand, so i cant filter characters without reading the file first, it is easy to read and understand (at least for me :D), and its very important for non-blocking environments like js.                

**chapter9:** mondas is a widely used concept in javascript, every day we used this concept without knowing its name, in higher order
              functions in general, like (map, filter, promises...etc), each function executes something and bind to the next one just 
              like waterfall, it may be difficult to understand from the first time, but it would make the life better, the previous style
              may lead to what called callback hell, i can bass any callback as a second argument which may breaks the application, the bind will make it easier to follow and exception detecting. 



**chapter10:** this is the modern approach, but i think it would be better if we used an abstract class instead of concreat class to                     extend, the main class is highliy coupled to the three class managers  

**chapter11:** the message dispatch approach is very simmillar to react-redux package, dispatching a message that end up with firing 
               a program, this allows to dynamically invoke methods wich is very usefull.
               a delegation in oop is another concept of dynamic invoking, the main advantage of this, when you have a block of code, let we say a restAPI controller, and i want to send sms after proccessing data, suppose after a while i want to send an email 
               this will lead to edit the controller and re-compile with a possibity of bugs, suppose i want to do some image proccessing,
               this will make the job harder, delegation solve these kind of problems when i want to determine what to do at run time    

**chapter12:** the old way in js to declare classes, it allows us to clone the object to other one, its also provide us the mechanisim  to
               extend the object at run time, without touching the base implementation. and its apllying the self contained components concept,
               its a very good design pattern, where every thing is independant and you can use it by its own.

**chapter13:** this is very common, in case we want the interface still the same with changing the implementation, the benifit will shine when 
               tryng to something sharable, that other things depends on. which somehow applies the open-close concept.               

**chapter14:** i imagin we have a master that holds the framework, with other slave nodes, any slave has to push its event
               to the master so he can handle it, but at some points the slaves can borrow from each others by pushing 
               certain events (like internal proccess) to each others, that proccesses will make overhead to the master,
               the master is a general interface that others can connect to, so we can add more nodes to the system 
               without breaking the ring.

**chapter15:** same to the built in event emmiters in modern javascript, a component will emit an event with some data,
               and other components can listen for that event to handle it, also they can un listen for  events 
               totlay or at some points, i think we can use this to share data between devices around the network,
               theres a technology called pub-nub that do the same technique, suppose we have 3 point of sales 
               for the same market, when a user adds a new product to one point of sale, it publishes a product 
               created event with its data, the others listening for that event and they will take the data and save it.

**chapter16:** nothing new in this chapter, but the data that came from out-side should be readonly and the function can                   take advantage of its meta data.

**chapter17:** this is good when you aim to do something dynamic, like you are handling a service for a mobile company,
                you know alot of services could be added, like changing sim card, dis-connect a member, re-connect a member,
                and informative services like what is my charge, i want to buy an 3G package, and alot alot alot of functionallity, you dont need your system to be large, all you need is a dict keyed with the services names,
                and its value will be the functionallity, when user send a request to the system you will execute that functionallity immediately and un link it agin from the system until other request came, this also will make your program open for extending and cloesd form modification.

**chapter18:** we add a side functionallity without affect the main implementation of the abstractions, in the example, we                 add a performance test to the application, then we add a program tracker, that will till us which proccess                  is runing now, without aspects, we need to go through each function and add a lines of codes, to do that,
               we may harm the main implementation since it may be implemented bu other programmers, doing these side 
               processes in isolated way, will keep the things run as expected.

**chapter19:** we doing this every day, every time we write a code we are using a plugins, something that did not came with 
               the language / framework that we did not implement, and we really do not know who implemented it.
               it will make the life easier, it may not be useful if we need the program in higher effecinecy, 
               but at least it will saves our time and work.

**chapter20:** we always fear from nulls, and we always checks if the value is null or not, and we may use try catch for
               doing something reasonable in case of failer, this is very important in any code, in the chapter, 
               he settle for checking if the pile path is provided or not, but i think he has to check if the filename 
               is of type string or not (just kidding), todays compilers is smart enough to check the most things that 
               may cause errors at compilation time, so we only need to check the run time possible "nulls".

**chapter21:** same as previous one, but will add a large try catch to go aside with try catch(es) in each function
               i think its internationally prohibited to do that, because the try catch is very cost. also it will 
               compromise the exception after catch it so it can be A lesson for those who consider :P

**chapter22:** the same as previous, but with main and most important one diff, is the try catch 
               used on the higher level of the call stack, which is the right way to do it (unless for me).
               unlike chapter 20, chapter 21 + 22 will stop the program without returning any reasonable value
               to the user, just a repulsive message that tills him he was worng (And We Love Doing That :D).

**chapter23:** the most confused, the most ugly and lovely thing you may face in the journey of learning programming
               is the decorator function, the first time i saw this thing, i thought i lost my mind, a function, that accepts a function and defining an internal function to return a function to the function.
               its a kind of middleware that protect your procedures from external attacks, the beast example is a divide 
               function, that fear from accepting zero all the time, the decorator will protect him from this attack 
               and will return a beatiful message to the user (or my the caller function) without exiting the program 
               or crashing it.

**chapter24:** in this style, we tried to turn the all the functions to be idempotent functions, without a side effects,
               so all the time the function will give us the same output for the same input, the writer make it fake by 
               returning an internal function instead of value so you will got the same output every time, the side effects may be caused by externals like I/O so we need to avoid calling them from functions directly.

**chapter25:** it was the most booring chapter, we uses databases all the time to store data, now it is something 
               normal, not that big deal.

**chapter26:** this is usefull when we aim to update our data, when something changed in the application, flag, a fileName,                we actually do this, we update a values on related to other values, like when the user typed his name,
               we update the information in the array to be for that user, other user typed his name, a new data will be loaded.

**chapter27:** using generators is the best choice when we do not want to save in-memory data, also it has a less size
               than array or list, and it will redirect the data as real time forwarding. 
               that does not mean its the best, while we cannot call an item by its index or we can not loop through 
               the generator agin, but in arrays we can do nested loops.

**chapter28:** javascript is a single threaded language, yes its asynchronous, but all that done on the same thread.
               i fake the thread part in python by using async and await with setTimeout to make it feel like thread.
               anyway, this topic is a hot topic in computer sience, software/hardware companies spends alot of time to handle the multi-task/multi-threaded archetechture and programs, we can write a code, listing to music and 
               searching stackoverflow :P at the same time, we can move the window of the program while its proccessing 
               things at the same time, all that is threads and concurrent actions.

**chapter29:** its somehow close to chapter26, but here we have a space of data when one function write to it, others will                 update there states concurrently and not sequentially.

**chapter30 && chapter31:** i think this approuch is good when we talk about data mining, or AI system nodes, 
                            mapping the data blocks to functions to get another block of data (results) and 
                            keep doing this untile we have the most improved block of results.

**chapter32:** Note: in the chapter, the author used the model directly in view, which is not supposed to be,
                     its fine and we call this delegation in mvc terms, but the view should contact to the controller
                     only.

                most of frameworks uses this style, its doing so good in the large application, but it will be an 
                overhead  in the small ones.

**chpter33:** we finally reach this chapter, i am a web developer, and i love the word 'REST', the web uses this style 
              very very much, the user interactive with the ui, the ui will respond by a data came from api, 
              or poping up a modal, every thing is caused by user interactions, its the most logical and intrested 
              style at all.      
                                            


               
              
 
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


# chapter4 eliminate global variables:

In order to eliminate global variables into scoped variables, i used three ways, the first one by using immideate invoked function,
the other way by chaining the function calls so each one will be waiting for the side effect of the previous one, the final way is by 
scoping the code in one main function.
I commited the three ways.

note: the second way is calling a pipeline which will be highlighted in the 5th chapter

# chapter 4 idempotent functions:

by returning the program to its original state, there are three idempotent functions:

1- filterCharsAndNormalize
2- removeStopWords
3- sort


we already made all functions idempotent by using the scoped variables (in the pipeline way).
or we can re initialize the arguments in the not idempotent functions
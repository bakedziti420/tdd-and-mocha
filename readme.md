<!-- 1:00 5 minutes -->

<!--Hook: Has anyone here tried fixing a car or complicated appliance?  After two hours, you get the piece back in place, or the wheel on straight.  Then what do you do?  (For me, back up and cross fingers that it works.)  The idea behind TDD is to gain a higher confidence that before we flip that switch, before we try to go 80 miles an hour on I-25, the app we are building does what the customer wants.  

Whether you like it or not, you will have to test your software somehow before you get it to your users.  Today, we'll talk about how to do that *with software itself*.  Woo-hoo, using software to test software!  -->

# Testing with RSpec

![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

![](resources/xzibit_testing_software.jpg)

### Why is this important?

Test Driven Development leads to better code. TDD is extremely helpful when implementing software according to predefined specifications and expectations. Previously, we've run tests and passed them; now, we'll see how to write them.

### What are the objectives?
*After this workshop, developers will be able to:*

- **Write** unit tests using RSpec using `expectations` and `matchers`
- **Compare** and **contrast** common RSpec terms including `describe`, `it`, and `context`
- **Refactor** tests with `before`, `subject`, and `let`

### Where should we be now?
*Before this workshop, developers should already be able to:*

- **Program** in Ruby
- **Pass tests** in a TDD manner

<!--1:05 5 minutes -->

## Do You Test?

####Place yourselves somewhere in the following ranges:

* I have used TDD **or** I have never used TDD

* I love the idea of TDD **or** I hate the idea of TDD

####Thoughts:

* For those of you who are negative to testing, why? What did you or would you do instead?
* For those of you who are positive to testing, why? What problems did it solve?

<details><summary>Some possible responses...</summary>

<!--Ask one student to read Cons, one to read Pros, add any they think are missing -->

* Cons
 * **Time.** It's a waste of my time and effort to test.
 * **It's too much.** I can test just fine using the console.
 * **App complexity.** My app is too simple to require testing.
* Pros
 * **Bug detection.** Quickly identify unanticipated errors.
 * **Code Quality.** Create standards for our code before writing it.
 * **Time.** Shorten development time through bug detection; allows for [continuous integration](https://en.wikipedia.org/wiki/Continuous_integration).
 * **Documentation.** Tests act as a documentation of sorts for how our code should work. Helpful to other developers and shareholders.
 * **Jobs.** Testing is a job requirement across the board.

</details>

<!-- 1:10 10 minutes -->

## Unit vs Acceptance Tests

<!--Ask students to read each paragraph -->

**Unit tests** check the smallest level; the functionality of a specific method (what we'll be discussing mostly today).

**Acceptance tests** verify our apps at the level of user interaction; testing for things when users take an action like visiting a page, clicking a link, logging in, etc.

  * A unit test focuses on an individual method. Unit tests are intended to test modular blocks of code to ensure a specific input results in a specific output.

  * Acceptance tests have a much wider focus. You'd use acceptance testing to make sure a sign-in form works, or that a user who doesn't have admin privileges can see this page, while a user who does have admin privileges can see that page.

You'll see the term **test coverage** pop up pretty often. People are always aiming for "100% test coverage". If your app has 100% test coverage, that means every single method in your app has a unit test verifying that it works.

>For instance, while it's easy and free to write Salesforce apps, Salesforce will only add your app to its "app store" if you've obtained 100% test coverage, and Salesforce's developer team can run your tests and have them all pass.

**What are the reasons testing is so important? Why would employers love it so much?**

We've asked you to write user stories. Writing acceptance tests is a very similar process. In fact, user stories are very often rewritten as acceptance tests that describe what the user _should_ see or _should_ be able to do.

When we think of "testing" we tend to think of something you do *after* you've created something, to make sure it works. With TDD, you're encouraged to write the tests *first* before you even start writing actual code.

<!-- Catch-phrase with Unit Tests, Acceptance Tests, TDD, Code Coverage -->

<!-- 1:20 5 minutes -->
## TDD Review

![TDD Example](http://joshldavis.com/img/tdd-vs-bdd/tdd-flowchart.png)

<!-- Student reading benefit, another for drawbacks -->

**Benefits**

* Fewer bugs in our code

* Provides a clear goal in the development, that is, to make all tests pass.

* Allows for automation and continuous integration, ensuring that our application won’t break

* A little more time upfront means a lot of time saved down the line! (Think about refactoring)

**DrawBacks**

* Requires time and effort.

* Could be more costly to an organization when there are changes in requirements.

## What is RSpec?

**RSpec** is a testing framework for the Ruby programming language.

RSpec makes it easier to write tests. Essentially it's a Domain Specific Language for writing live specifications about your code.  It was released on May 18, 2007, so it's been around for a while.

> A DSL, "Domain Specific Language", is created specifically to solve problems in a particular domain and is not intended to be able to solve problems outside of it. Other DSLs include HTML or SQL. This is opposed to domain independent languages like Java, C++, Ruby, Python, PHP, JavaScript, Clojure, Rust, Scala, Erlang etc that are Turing complete (can solve any possible computation problem).

<!-- 1:25 10 minutes -->

## RSpec Example

Code is available here: [example-tests](./example-tests)

When `rspec` is run in the `example-tests` directory, what does it show?

```
Finished in 0.00565 seconds (files took 0.14281 seconds to load)
5 examples, 0 failures
```
Let's review `spec/person_spec.rb`.  This is the specification for a Person.  It indicates how we can expect a Person to function.

```
rspec_person_example/
├── models
│   └── person.rb
└── spec
    ├── person_spec.rb
    └── spec_helper.rb

2 directories, 3 files
```

We have a Person model and a Person spec (a specification or test). This is the typical RSpec convention.  Specs live under the spec directory and echo the models in our system with the `_spec` suffix.

Let's look further into `person_spec.rb`

<!--Talk through first one, then give devs a minute to discuss with neighbor what the rest of them do, come back and share -->

```ruby
# This first line is a reference to our library code.  We need to access to the classes we have written in Ruby to write our tests!

require_relative '../models/person'  # a reference to our code

describe Person do
  describe "Constructor" do
    subject(:matt) { Person.new("Matt") }

    it "should create a new instance of class Person" do
      expect(matt).to be_an_instance_of(Person)
    end

    it "should have a name" do
      expect(matt.name).to_not be_nil
    end

    it "should default #language to 'English'" do
      expect(matt.language).to eq("English")
    end
  end

  describe "#greeting" do
    context "for default language (English)" do
      subject(:bob) { Person.new("Bob") }

      it "should offer a greeting in English" do
        expect(bob.greeting).to eql("Hello, my name is Bob.")
      end
    end

    context "when language is 'Italian'" do
      subject(:tony) { Person.new("Tony", "Italian") }

      it "should offer a greeting in Italian" do
        # legacy syntax - the old DSL
        tony.greeting.should eql("Ciao, mi chiamo Tony.")
        # equivalent to:
        # expect(tony.greeting).to eql("Ciao, mi chiamo Tony.")
      end
    end
  end
end
```

>What does `expect(matt).to be_an_instance_of(Person)` mean in regular English?

<!-- 1:35 25 minutes -->

<!-- Half Mast -->

## Creating a Unit Test using RSpec

We are going to be creating something similar to the above example. However, we will be writing a spec for creating a new ruby class of `Dog`.

### Set-up

Make a new directory in your GA working folder called `dog`, `cd` into it and `touch` a `Gemfile`.

#### Install RSpec

The first thing we'll do is install a gem called RSpec. To do this, just add `gem 'rspec'` to the `Gemfile`:

```rb
source "https://rubygems.org"

gem 'rspec'
```

Then, in your Terminal:

```sh
$ bundle install
$ rspec
```

>After running `rspec`, you should get a message saying "No examples found." When it says "examples", it means "tests". It's saying, "You haven't written any tests for me to run!"

#### Set up the directory

Enter the command `rspec --init`. What just happened?

* a `spec` directory was created, where the tests will live
* an `.rspec` file was created, where one can specify options on how the tests are displayed
* a `spec/spec_helper.rb` is created, which ensures the tests are run with the correct requirements and configurations

Inside the `spec` directory, add a file called `dog_spec.rb`. Additionally, create a `models` directory and a file inside it, `dog.rb`, where we will define our class `Dog`.

>Note: Within `.rspec` file add `--color` OR in `spec/spec_helper.rb` add `config.color = true` to see colorful tests!

### Writing our Specification

Let's start defining the design of our program with certain specifications. Let's spec out our `Dog` with some psuedocode.

**/spec/dog_spec.rb**

```rb
require_relative "../models/dog"
describe Dog do

end
```

We will spec-out or `describe` our `Dog`. A `describe` block is commonly used to split up a set of tests into sections with a specific focus.

Now let's run `rspec`. What happened?

Does the file it's requiring exist?

Make the file and run the tests again. What happens this time? Does the constant `Dog` exist? Let's give it just enough code to satisfy the current (minimal) specifications.

**/models/dog.rb**

```ruby
Dog = Object.new
```

<!-- End half-mast, devs catch up -->

<!-- Half-mast again -->

Realistically, we'll want our `Dog` constant to be class that creates new dogs. So let's start specing it out. We'll first want to start describing its `.new` method. Remember, in Ruby documentation, it is convention to prefix class methods with `::` and instance methods with `#`.

**/spec/dog_spec.rb**

```ruby 
describe Dog do
  describe "::new" do
    # specs to come
  end
end
```

Now we can start writing out some specifications related to the `new` method using and `it` block

```ruby 
describe Dog do
  describe "::new" do
    it "initializes a new dog"
  end
end
```

What is is the output now? We should get `1 example, 0 failures, 1 pending`, saying that our specification is not yet implemented.

Now add `do` at the end of the first `it` line.

```ruby 
describe Dog do
  describe "::new" do
    it "initializes a new dog" do
      #specs to come...
    end
  end
end
```

>Run `rspec` again. Our tests passed because RSpec will evaluate a test as passing as long as no errors are thrown.

Let's make our specs actually test something.

```ruby 
describe Dog do
  describe "::new" do
    it "initializes a new dog" do
      dog = Dog.new
      expect(dog).to be_a(Dog)
    end
  end
end
```

> Expectation: `expect(dog).to` 

> Matcher: `be_a(Dog)`

We use the pattern `expect(IUT)` to "wrap" the ***Item Under Test***, so that it supports the `to` method which accepts a matcher. Here we are wrapping an object or block in expect, call to or to_not (aliased as not_to) and pass it a matcher object

[RSpec documentation Built in Matchers](https://www.relishapp.com/rspec/rspec-expectations/docs/built-in-matchers)

<!-- End half-mast, stress "pending", "failing", "passing" order -->

>What is the minimal amount of code we can write in `models/dog.rb` to pass our current expectation?

##More expectations!

<!-- Half-mast -->
###Naming your Dog

Let's give our dog instances the method to get and set an attribute `name`. As usual, let's first start with the specfication.

```ruby
describe Dog do
  #...
  describe "#name" do
    it "allows the reading and writing of a name" do
      dog = Dog.new
      dog.name = "Fido"
      expect(dog.name).to eq("Fido")
    end
  end
end
```

<!-- 2:00 15 minutes -->

<!-- End half-mast -->

>What is the minimal code one could write to pass these specifications?

### Challenge: Hungry Dog

<!-- Half-mast -->

Add an expectation to the dog that, "allows the reading and writing of a hunger level". When complete, ensure the tests are written correctly by watching them fail. Finally implement the code that passes the new expectation.

<details><summary>Example solution</summary>

**/spec/dog_spec.rb**

```ruby
describe Dog do
  #...
  describe "#name" do
    it "allows the reading and writing of a name" do
      dog = Dog.new
      dog.name = "Fido"
      expect(dog.name).to eq("Fido")
    end
  end
end
```

</details>

<!-- End half-mast -->

###Feeding the Dog

<!-- Half-mast -->

Let's implement a method `eat` which decrements a dog's hunger level when invoked. How would we translate this specification in RSpec tests?

**/spec/dog_spec.rb**

```ruby
describe Dog do
  #...
  describe "eat" do
    it "decrements the hunger level when invoked" do
      dog = Dog.new
      dog.hunger_level = 5
      dog.eat
      expect(dog.hunger_level).to eq(4)
    end
  end
end
```

<!-- End half-mast -->

###Challenge: Teach the Dog to Eat

Write the code that passes the above specifications.

###Context

<!-- Half-mast -->

Imagine we want the eat method to behave differently in different contexts. For example if the dog is not hungry and has a `hunger_level` of `0`, we don't want the eat method to continue decrementing. In order to set up different scenarios or contexts in our specifications, we can use the `context` keyword. Generally, context blocks are a *"nice to have"* in testing and improve **organization** and **readability**.

Use `describe` for "things" and `context` for "states.

**/spec/dog_spec.rb**

```ruby
describe Dog do
  #...
  describe "eat" do
    context "when the dog is hungry" do
      it "decrements the hunger level when invoked" do
        dog = Dog.new
        dog.hunger_level = 5
        dog.eat
        expect(dog.hunger_level).to eq(4)
      end
    end
    context "when the dog is full" do
      it "doesn't decrement the hunger level when invoked" do
        dog = Dog.new
        dog.hunger_level = 0
        dog.eat
        expect(dog.hunger_level).to eq(0)
      end
    end
  end
end
```

<!-- End half-mast -->

###Challenge: Don't Over Eat

Write the code to pass the above specs!

<!-- 2:30 10 minutes -->

##Refactoring

Do you see any opportunities to refactor? Identify them...

<!-- Give devs a minute to see repeated or poorly-organized code -->

```ruby
describe Dog do
  describe "::new" do
    it "initializes a new dog" do
      dog = Dog.new
      expect(dog).to be_a(Dog)
    end
  end
  describe "#name" do
    it "allows the reading and writing of a name" do
      dog = Dog.new
      dog.name = "Fido"
      expect(dog.name).to eq("Fido")
    end
  end
  describe "#hunger_level" do
    it "allows the reading and writing of a hunger level" do
      dog = Dog.new
      dog.hunger_level = 5
      expect(dog.hunger_level).to eq(5)
    end
  end
  describe "eat" do
    context "when the dog is hungry" do
      it "decrements the hunger level when invoked" do
        dog = Dog.new
        dog.hunger_level = 5
        dog.eat
        expect(dog.hunger_level).to eq(4)
      end
    end
    context "when the dog is full" do
      it "doesn't decrement the hunger level when invoked" do
        dog = Dog.new
        dog.hunger_level = 0
        dog.eat
        expect(dog.hunger_level).to eq(0)
      end
    end
  end
end
```

How many times are we writing `dog = Dog.new`? It seems we'll have to do that at the beginning of most specifications.

<!--Half-mast -->

###Subject Blocks

We could use `before`, `let`, or `subject` to help us refactor these specifications. Let's prefer using `subject` as the dog is the subject, or thing we are testing. `let` is similar, but may be used when one wants to set up a variable that isn't necessarily the subject, for example it could be the food the dog is eating. Whereas `let` and `subject` are used to setup "dependencies", `before` which is best used to setup an action in advance, such as opening a connection with a database.

```ruby
describe Dog do
  # refactors the tests with subject
  subject(:dog) { Dog.new }
  describe "::new" do
    it "initializes a new dog" do
      expect(dog).to be_a(Dog)
    end
  end
  describe "#name" do
    it "allows the reading and writing of a name" do
      dog.name = "Fido"
      expect(dog.name).to eq("Fido")
    end
  end
  describe "#name" do
    it "allows the reading and writing of a hunger level" do
      dog.hunger_level = 5
      expect(dog.hunger_level).to eq(5)
    end
  end
  describe "eat" do
    context "when the dog is hungry" do
      it "decrements the hunger level when invoked" do

        dog.hunger_level = 5
        dog.eat
        expect(dog.hunger_level).to eq(4)
      end
    end
    context "when the dog is full" do
      it "doesn't decrement the hunger level when invoked" do

        dog.hunger_level = 0
        dog.eat
        expect(dog.hunger_level).to eq(0)
      end
    end
  end
end
```

<!-- End half-mast -->

###Before Blocks

We can further refactor the above code with a `before` block in order to setup the state of our dog by calling a few methods on it.

<!-- Half-mast -->

```ruby
describe Dog do
  subject(:dog) { Dog.new }
  before do
    dog.name = "Fido"
    dog.hunger_level = 5
  end
  describe "::new" do
    it "initializes a new dog" do
      expect(dog).to be_a(Dog)
    end
  end
  describe "#name" do
    it "allows the reading and writing of a name" do
      expect(dog.name).to eq("Fido")
    end
  end
  describe "#name" do
    it "allows the reading and writing of a hunger level" do
      expect(dog.hunger_level).to eq(5)
    end
  end
  describe "eat" do
    context "when the dog is hungry" do
      it "decrements the hunger level when invoked" do
        dog.eat
        expect(dog.hunger_level).to eq(4)
      end
    end
    context "when the dog is full" do
      it "doesn't decrement the hunger level when invoked" do
        dog.hunger_level = 0
        dog.eat
        expect(dog.hunger_level).to eq(0)
      end
    end
  end
end
```

<!-- End half-mast -->

>Note: you can pass different options to before.
>
>**before(:each)** is a block of code that runs every time *before each* test is execute.
>
>**before(:all)** is the same concept, except it only runs **once**, *before all* the tests inside it have started.

<!--2:40 15 minutes -->

## Challenge: Cereal Robot Exercise

[Watch this video](https://www.youtube.com/watch?v=E2evC2xTNWg).

Split up into groups of 3 or 4. For 15 minutes, on a whiteboard, work with your group to draft the unit tests for this cereal-delivering robot.

Goal: When all the tests pass, that means the robot works. However, you're only writing **pending** tests -- don't actually write the code that would make the tests pass.

Constraints: Try to write everything as `describe`, `context`, and `it` blocks. Method names should start with `#`.

<!-- 2:55 5 minutes -->

## Garnet Example

RSpec is used to test Garnet, a GA attendance/homework tracking app in some locations. Before any changes get pushed up to our live server, they have to pass all the tests -- an automated system rejects the changes if they don't pass.

Here's what the [model tests](https://github.com/ga-dc/garnet/tree/master/spec/models) look like. Checkout a few of them... Seem familiar?

<!-- 3:00 40 minutes -->

## Challenge: Grand Prix Racing

 * Clone down [grand-prix-testing](https://github.com/den-wdi-1/car-racing-lab) and follow the instructions.

<!--3:40 5 minutes -->

## Closing

### Quiz Questions:

- What is the purpose of Unit testing?
- Explain what role RSpec plays in testing.
- What is `subject` useful for?
- How do `describe` and `context` differ?

### Additional Resources
- [Structure of RSpec Tests](http://jakegoulding.com/presentations/rspec-structure/)
- [Better Specs](http://betterspecs.org/)
- [Code School RSpec](https://www.codeschool.com/courses/testing-with-rspec)
- [RSpec Cheatsheets](https://www.anchor.com.au/wp-content/uploads/rspec_cheatsheet_attributed.pdf)

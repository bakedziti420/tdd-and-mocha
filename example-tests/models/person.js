function Person (name, language) {
  this.name = name;
  this.language = language || "English";
}

Person.prototype.greeting = function () {
  switch (this.language) {
    case "English":
      return "Hello, my name is " + this.name + ".";
    case "Italian":
      return "Ciao, mi chiamo " + this.name + ".";
    default:
      throw "The language " + this.language + " is not supported.";
  }
};

module.exports = Person;
// class Person
//   attr_accessor :name, :language

//   def initialize(name, language = "English")
//     @name = name
//     @language = language
//   end

//   def greeting
//     case language
//     when /english/i
//       "Hello, my name is #{name}."
//     when /italian/i
//       "Ciao, mi chiamo #{name}."
//     else
//       fail ArgumentError.new("That language (#{language}) is not supported for #greeting.")
//     end
//   end
// end
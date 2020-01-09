# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# @book = @author.books.build(published_at: Time.now,
#                                 book_number: "A12345")
 
# @books = @author.books.build([
#   { published_at: Time.now, book_number: "A12346" },
#   { published_at: Time.now, book_number: "A12347" }

task00 = Task.create({title: 'Cooking with Elon', status: false})
task00.tags.create([
    {name: 'dumb'},
    {name: 'useless'}
]
)

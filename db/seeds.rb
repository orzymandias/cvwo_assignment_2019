# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Task.create(title: "Kill the floor", status: true)
Task.create(title: "do 1101S", status: true)
Task.create(title: "Mop the ceiling", status: true)
Tag.create(name: "important")
Tag.create(name: "less important")


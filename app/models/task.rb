class Task < ApplicationRecord
    has_many :tasktags
    has_many :tags, through: :tasktags

end

class Task < ApplicationRecord
    has_many :tasktags
    has_many :tags, through: :tasktags

    def as_json(**options)
        unless options.has_key? :include
          options.merge!(include: [:tag])
        end
        super(options)
    end
end

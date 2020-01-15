class Api::TaskResource < JSONAPI::Resource
    attributes :title, :status
    has_many :tags, through: :tasktags
end
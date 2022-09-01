class TodoSerializer < ActiveModel::Serializer
  attributes :id, :description, :completed
  has_one :user
end

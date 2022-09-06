class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed
  has_one :client
  has_one :employee
end

class EmployeeSerializer < ActiveModel::Serializer
  attributes :id, :name, :title, :clients
  has_many :projects
end

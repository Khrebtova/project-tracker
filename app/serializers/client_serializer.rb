class ClientSerializer < ActiveModel::Serializer
  attributes :id, :name, :employees
  has_many :projects
end

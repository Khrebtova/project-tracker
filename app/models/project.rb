class Project < ApplicationRecord
  belongs_to :client
  belongs_to :employee
  
  validates :name, :client_id, :employee_id, presence: true 
end

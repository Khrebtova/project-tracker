class User < ApplicationRecord
    has_secure_password
    has_many :todos, dependent: :destroy
    validates :username, presence: true, uniqueness: true
    validates :first_name, :last_name, :title, presence: true
end

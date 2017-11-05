class Player < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_one :score
end

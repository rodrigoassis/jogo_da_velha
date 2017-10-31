require 'rails_helper'

RSpec.describe Score, type: :model do
  describe 'relations' do
    it { is_expected.to belong_to(:player) }
  end
end

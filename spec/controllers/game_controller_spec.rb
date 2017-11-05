require 'rails_helper'

RSpec.describe GameController, type: :controller do
  describe 'GET /api/scoreboard' do
    let!(:score) { create(:score) }

    before { get :scoreboard, format: :json }

    it 'returns scoreboard' do
      expect(assigns(:scores).size).to be > 0
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'POST /api/result' do
    it 'returns success if valid' do
      expect{ post :result, params: { name: 'Player 1', result: 'victory' } }.to change{ Player.count }.by(1)
      expect(response).to have_http_status(201)
    end
  end
end

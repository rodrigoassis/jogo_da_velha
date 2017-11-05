class GameController < ApplicationController
  def result
    player = Player.find_or_create_by(name: game_params[:name])

    score = Score.find_or_create_by(player_id: player.id)
    score.victories += 1 if game_params[:result] == 'victory'
    score.draws += 1 if game_params[:result] == 'draw'
    score.defeats += 1 if game_params[:result] == 'defeat'
    score.save

    json_response(player, :created)
  end

  def scoreboard
    @scores = Score.select(:name, :victories, :draws, :defeats).joins(:player).all.order('victories DESC')
    json_response(@scores)
  end

  private

  def game_params
    params.permit(:name, :result, :format)
  end

  def json_response(object, status = :ok)
    render json: object, status: status
  end
end

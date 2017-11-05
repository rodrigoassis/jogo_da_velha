class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.integer :player_id
      t.integer :victories, default: 0
      t.integer :draws, default: 0
      t.integer :defeats, default: 0

      t.timestamps
    end
    add_index :scores, :player_id
  end
end

class CreateScores < ActiveRecord::Migration[5.1]
  def change
    create_table :scores do |t|
      t.integer :player_id
      t.integer :victories
      t.integer :draws
      t.integer :defeats

      t.timestamps
    end
    add_index :scores, :player_id
  end
end

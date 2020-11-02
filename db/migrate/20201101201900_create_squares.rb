class CreateSquares < ActiveRecord::Migration[6.0]
  def change
    create_table :squares do |t|
      t.integer :matrix, array: true, default: []

      t.timestamps
    end
  end
end

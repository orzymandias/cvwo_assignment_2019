class CreateTasktags < ActiveRecord::Migration[6.0]
  def change
    create_table :tasktags do |t|
      t.belongs_to :task
      t.belongs_to :tag
      t.timestamps
    end
  end
end

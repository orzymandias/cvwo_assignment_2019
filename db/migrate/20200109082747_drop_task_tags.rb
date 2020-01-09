class DropTaskTags < ActiveRecord::Migration[6.0]
  def change
    drop_table :task_tags
  end
end

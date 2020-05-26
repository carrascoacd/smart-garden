defmodule SmartGarden.Repo.Migrations.AddIndexToIntervalIndex do
  use Ecto.Migration

  def change do
    create index("intervals", [:device_id, :index], unique: true)
  end
end

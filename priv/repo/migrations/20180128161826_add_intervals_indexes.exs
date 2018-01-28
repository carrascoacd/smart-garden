defmodule SmartGarden.Repo.Migrations.AddIntervalsIndexes do
  use Ecto.Migration

  def change do
    create unique_index(:intervals, [:device_id, :action, :name])
  end
end

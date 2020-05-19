defmodule SmartGarden.Repo.Migrations.AddIndexToIntervals do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      add :index, :integer, default: 0
    end
  end
end

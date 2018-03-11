defmodule SmartGarden.Repo.Migrations.AddActiveToIntervals do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      add :active, :boolean
    end
  end
end

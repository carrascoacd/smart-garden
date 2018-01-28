defmodule SmartGarden.Repo.Migrations.CreateIntervals do
  use Ecto.Migration

  def change do
    create table(:intervals) do
      add :name, :string
      add :value, :float
      timestamps()
    end
  end
end

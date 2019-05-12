defmodule SmartGarden.Repo.Migrations.AddAlwaysOpenToInterval do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      add :force_open, :boolean
    end
  end
end

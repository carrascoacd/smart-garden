defmodule SmartGarden.Repo.Migrations.AddActionToInterval do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      add :action, :string
    end
  end
end

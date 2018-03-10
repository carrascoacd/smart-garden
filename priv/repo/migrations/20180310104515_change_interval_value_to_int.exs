defmodule SmartGarden.Repo.Migrations.ChangeIntervalValueToInt do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      modify :value, :integer
    end
  end
end

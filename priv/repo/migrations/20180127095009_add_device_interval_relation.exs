defmodule SmartGarden.Repo.Migrations.AddDeviceIntervalRelation do
  use Ecto.Migration

  def change do
    alter table(:intervals) do
      add :device_id, references(:devices)
    end
  end
end

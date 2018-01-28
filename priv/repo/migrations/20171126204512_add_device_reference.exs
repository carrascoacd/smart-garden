defmodule SmartGarden.Repo.Migrations.AddDeviceReference do
  use Ecto.Migration

  def change do
    alter table(:weather_entries) do
      add :device_id, references(:devices)
    end
  end
end

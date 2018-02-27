defmodule SmartGarden.Repo.Migrations.AddNotNullReferences do
  use Ecto.Migration

  def change do
    drop constraint :intervals, "intervals_device_id_fkey"
    alter table(:intervals) do
      modify :device_id, references(:devices), null: false
    end
    drop constraint :weather_entries, "weather_entries_device_id_fkey"
    alter table(:weather_entries) do
      modify :device_id, references(:devices), null: false
    end
  end

end

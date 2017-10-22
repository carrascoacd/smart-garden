defmodule SmartGarden.Repo.Migrations.CreateWeatherEntries do
  use Ecto.Migration

  def change do
    create table(:weather_entries) do
      add :moisture, :float
      timestamps()
    end
  end
end

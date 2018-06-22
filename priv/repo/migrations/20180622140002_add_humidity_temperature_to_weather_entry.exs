defmodule SmartGarden.Repo.Migrations.AddHumidityTemperatureToWeatherEntry do
  use Ecto.Migration

  def change do
    alter table(:weather_entries) do
      add :humidity, :float, default: 0.0
      add :temperature, :float, default: 0.0
    end
  end
end

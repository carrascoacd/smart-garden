defmodule SmartGarden.Repo.Migrations.AddSoilTemperatureToWeatherEntry do
  use Ecto.Migration

  def change do
    alter table(:weather_entries) do
      add :soil_temperature, :float, default: 0.0
    end
  end
end

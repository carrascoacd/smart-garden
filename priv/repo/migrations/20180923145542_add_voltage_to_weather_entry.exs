defmodule SmartGarden.Repo.Migrations.AddVoltageToWeatherEntry do
  use Ecto.Migration

  def change do
    alter table(:weather_entries) do
      add :secondary_voltage, :integer, default: 0.0
      add :main_voltage, :integer, default: 0.0
    end
  end
end

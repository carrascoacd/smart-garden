defmodule SmartGarden.Repo.Migrations.AddStateToWeatherEntry do
  use Ecto.Migration

  def change do
    alter table(:weather_entries) do
      add :state, :string, default: "polling"
    end
  end
end

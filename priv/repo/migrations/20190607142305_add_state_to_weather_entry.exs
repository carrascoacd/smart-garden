defmodule SmartGarden.Repo.Migrations.AddStateToWeatherEntry do
  use Ecto.Migration

  def change do
    alter table(:weather_entries) do
      add :state, :string, default: "close"
    end
  end
end

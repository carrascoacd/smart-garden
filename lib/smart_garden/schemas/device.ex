defmodule SmartGarden.Device do
  use Ecto.Schema, otp_app: :smart_garden
  import Ecto.Query, warn: false

  schema "devices" do
    field :name, :string
    has_many :weather_entries, SmartGarden.WeatherEntry
    timestamps()
  end

  def get_all_with_weather_entries do
    query = from(d in SmartGarden.Device,
      preload: [:weather_entries],
      select: d)
    query
      |> SmartGarden.Repo.all
  end

end
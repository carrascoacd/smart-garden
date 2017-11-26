defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema, otp_app: :smart_garden

  schema "weather_entries" do
    field :moisture, :float
    timestamps()
  end
end
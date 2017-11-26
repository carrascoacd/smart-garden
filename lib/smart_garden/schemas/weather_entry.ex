defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema, otp_app: :smart_garden

  schema "weather_entries" do
    field :moisture, :float
    belongs_to :device, SmartGarden.Device
    timestamps()
  end
end
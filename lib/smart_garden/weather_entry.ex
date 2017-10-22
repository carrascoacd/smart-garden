defmodule SmartGarden.WeatherEntry do
  use Ecto.Schema

  schema "weather_entries" do
    field :moisture, :float
    timestamps
  end
end
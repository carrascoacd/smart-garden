defmodule SmartGardenWeb.WeatherEntriesView do
  
  use SmartGardenWeb, :view

  def render("show.json", %{weather_entry: weather_entry}) do
    %{
      moisture: round(weather_entry.moisture)
    }
  end

  def render("index.json", %{weather_entries: weather_entries}) do
    %{
      weather_entries: Enum.map(weather_entries, &weather_entry_json/1)
    }
  end

  def weather_entry_json(weather_entry) do
    %{
      moisture: round(weather_entry.moisture)
    }
  end

end
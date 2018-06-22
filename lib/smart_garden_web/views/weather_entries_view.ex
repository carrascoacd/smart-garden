defmodule SmartGardenWeb.WeatherEntriesView do
  
  use SmartGardenWeb, :view

  def render("create.json", %{interval: interval}) do
    %{
      value: interval.value,
      action: interval.action
    }
  end

  def render("show.json", %{weather_entry: weather_entry}) do
    weather_entry_json(weather_entry)
  end

  def render("index.json", %{weather_entries: weather_entries}) do
    %{
      weatherEntries: Enum.map(weather_entries, &weather_entry_json/1)
    }
  end

  def weather_entry_json(weather_entry) do
    %{
      moisture: round(weather_entry.moisture),
      humidity: round(weather_entry.humidity),
      temperature: round(weather_entry.temperature),
      currentVoltage: 0,
      createdAt: NaiveDateTime.to_string(weather_entry.inserted_at)
    }
  end

end
defmodule SmartGardenWeb.DeviceView do
  use SmartGardenWeb, :view

  def render("index.json", %{devices: devices}) do
    %{
      deviceList: Enum.map(devices, &devices_json/1)
    }
  end

  def render("show.json", %{device: device}) do
    %{
      name: device.name,
      id: device.id
    }
  end

  def devices_json(device) do
    %{
      name: device.name,
      weatherEntries: Enum.map(device.weather_entries, &weather_entry_json/1)
    }
  end

  def weather_entry_json(weather_entry) do
    %{
      moisture: round(weather_entry.moisture),
      currentVoltage: 0,
      createdAt: NaiveDateTime.to_string(weather_entry.inserted_at)
    }
  end
  
end
defmodule SmartGardenWeb.DeviceView do
  use SmartGardenWeb, :view

  def render("index.json", %{devices: devices}) do
    %{
      deviceList: Enum.map(devices, &device_json/1)
    }
  end

  def render("show.json", %{device: device}) do
    device_json device
  end

  def render("create.json", %{device: device}) do
    %{
      name: device.name,
      id: device.id
    }
  end

  def device_json(device) do
    %{
      name: device.name,
      id: device.id,
      weatherEntries: Enum.map(device.weather_entries, &weather_entry_json/1),
      intervals: Enum.map(device.intervals, &interval_json/1)
    }
  end

  def weather_entry_json(weather_entry) do
    %{
      moisture: round(weather_entry.moisture),
      currentVoltage: 0,
      createdAt: NaiveDateTime.to_string(weather_entry.inserted_at)
    }
  end
  
  def interval_json(interval) do
    %{
      name: interval.name,
      value: round(interval.value),
      action: interval.action,
      execution_schedule: interval.execution_schedule
    }
  end

end
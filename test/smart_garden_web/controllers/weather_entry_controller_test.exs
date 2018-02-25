defmodule SmartGardenWeb.WeatherEntriesControllerTest do
  use SmartGardenWeb.ConnCase

  setup do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino Device"})
    {:ok, %{device: device}}
  end

  test "create weather_entry", %{conn: conn, device: device} do
    changeset = %SmartGarden.Interval{name: "Wait 1000", value: 1000.0, action: "wait", device: device}
    SmartGarden.Repo.insert! changeset
    weather_entry_params = %{moisture: 1000}
    conn = post conn, device_weather_entries_path(conn, :create, device.id), weather_entry: weather_entry_params
    assert json_response(conn, 201) == %{
      "action" => "wait",
      "value" => 1000
    }
  end

  test "get weather_entry", %{conn: conn, device: device} do
    changeset = %SmartGarden.WeatherEntry{moisture: 1000.0, device: device}
    weather_entry = SmartGarden.Repo.insert!(changeset)
    conn = get conn, device_weather_entries_path(conn, :show, device.id, weather_entry.id)
    assert json_response(conn, 200) == %{
      "moisture" => weather_entry.moisture,
      "currentVoltage" => 0,
      "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
    }
  end

  test "index weather_entries", %{conn: conn, device: device} do
    changeset = %SmartGarden.WeatherEntry{moisture: 1000.0, device: device}
    weather_entry = SmartGarden.Repo.insert!(changeset)
    conn = get conn, device_weather_entries_path(conn, :index, device.id)
    assert json_response(conn, 200) == %{ "weatherEntries" => [
        %{
          "moisture" => weather_entry.moisture  ,
          "currentVoltage" => 0,
          "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
        }
      ]
    }
  end

end

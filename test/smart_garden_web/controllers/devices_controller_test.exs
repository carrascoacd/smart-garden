defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase

  setup do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino device"})
    weather_entry = SmartGarden.Repo.insert!(%SmartGarden.WeatherEntry{moisture: 300.0, device: device})
    changeset = %SmartGarden.Interval{name: "water", value: 1000.0, device: device, action: "open-valve"}
    interval = SmartGarden.Repo.insert!(changeset)
    {:ok, %{device: device, weather_entry: weather_entry, interval: interval}}
  end

  test "index devices", %{conn: conn, device: device, weather_entry: weather_entry, interval: interval} do
    conn = get conn, device_path(conn, :index)
    assert json_response(conn, 200) == %{
      "deviceList" => [expected_response(device, weather_entry, interval)]
    }
  end

  test "create device", %{conn: conn} do
    device_params = %{name: "Arduino device"}
    conn = post conn, device_path(conn, :create), device: device_params
    assert json_response(conn, 201)
  end

  test "get current device", %{conn: conn, device: device, weather_entry: weather_entry, interval: interval} do
    conn = get conn, current_device_path(conn, :current)
    assert json_response(conn, 200) == expected_response(device, weather_entry, interval)
  end

  def expected_response(device, weather_entry, interval) do
    %{
      "name" => device.name,
      "id" => device.id,
      "weatherEntries" => [%{
        "moisture" => weather_entry.moisture,
        "currentVoltage" => 0,
        "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
      }],
      "intervals" => [%{
        "name" => interval.name,
        "value" => interval.value,
        "action" => interval.action,
        "execution_schedule" => interval.execution_schedule
      }]
    }
  end

end

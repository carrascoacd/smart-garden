defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase

  setup do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino device"})
    changeset = %SmartGarden.WeatherEntry{moisture: 300.0, device: device}
    weather_entry = SmartGarden.Repo.insert!(changeset)
    {:ok, %{device: device, weather_entry: weather_entry}}
  end

  test "index devices", %{conn: conn, device: device, weather_entry: weather_entry} do
    conn = get conn, device_path(conn, :index)
    assert json_response(conn, 200) == %{
      "deviceList" => [expected_response(device, weather_entry)]
    }
  end

  test "create device", %{conn: conn} do
    device_params = %{name: "Arduino device"}
    conn = post conn, device_path(conn, :create), device: device_params
    assert json_response(conn, 201)
  end

  test "get current device", %{conn: conn, device: device, weather_entry: weather_entry} do
    conn = get conn, current_device_path(conn, :current)
    assert json_response(conn, 200) == expected_response(device, weather_entry)
  end

  def expected_response(device, weather_entry) do
    %{
      "name" => "Arduino device",
      "id" => device.id,
      "weatherEntries" => [%{
        "moisture" => 300,
        "currentVoltage" => 0,
        "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
      }]
    }
  end

end

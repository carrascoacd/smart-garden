defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase

  test "index devices", %{conn: conn} do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino"})
    changeset = %SmartGarden.WeatherEntry{moisture: 300.0, device: device}
    weather_entry = SmartGarden.Repo.insert!(changeset)
    conn = get conn, device_path(conn, :index)
    assert json_response(conn, 200) == %{
      "deviceList" => [%{
        "name" => "Arduino",
        "id" => device.id,
        "weatherEntries" => [%{
          "moisture" => 300,
          "currentVoltage" => 0,
          "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
        }]
      }]
    }
  end

  test "create device", %{conn: conn} do
    device_params = %{name: "Arduino device"}
    conn = post conn, device_path(conn, :create), device: device_params
    assert json_response(conn, 201)
  end

  test "get current device", %{conn: conn} do
    changeset = %SmartGarden.Device{name: "Arduino device"}
    device = SmartGarden.Repo.insert!(changeset)
    changeset = %SmartGarden.WeatherEntry{moisture: 300.0, device: device}
    weather_entry = SmartGarden.Repo.insert!(changeset)
    conn = get conn, current_device_path(conn, :current)
    assert json_response(conn, 200) == %{
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

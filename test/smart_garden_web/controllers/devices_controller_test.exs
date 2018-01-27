defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase

  test "GET /", %{conn: conn} do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino"})
    changeset = %SmartGarden.WeatherEntry{moisture: 300.0, device: device}
    weather_entry = SmartGarden.Repo.insert!(changeset)
    conn = get conn, device_path(conn, :index)

    assert json_response(conn, 200) == %{
      "devices" => [%{
        "name" => "Arduino",
        "weatherEntries" => [%{
          "moisture" => 300,
          "currentVoltage" => 0,
          "createdAt" => NaiveDateTime.to_string weather_entry.inserted_at
        }]
      }]
    }
  end
end

defmodule SmartGardenWeb.IntervalDeviceControllerTest do
  use SmartGardenWeb.ConnCase

  test "POST /api/devices/:device_id/intervals", %{conn: conn} do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino"})
    conn = post conn, device_interval_path(conn, :create, device.id), %{name: "interval", value: 1000}

    assert json_response(conn, 200) == %{
      "devices" => [%{
        "name" => "Arduino",
      }]
    }

  end
end

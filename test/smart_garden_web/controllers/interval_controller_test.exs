defmodule SmartGardenWeb.IntervalDeviceControllerTest do
  use SmartGardenWeb.ConnCase

  test "POST /api/devices/:device_id/intervals", %{conn: conn} do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino"})
    interval_params = %{name: "Arduino", value: 1000}
    
    conn = post conn, device_interval_path(conn, :create, device.id), interval: interval_params

    assert json_response(conn, 201) == %{
      "name" => "Arduino",
      "value" => 1000
    }

  end
end

defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase
  import SmartGarden.Factory

  test "GET /", %{conn: conn} do
    device = insert(:device)
    conn = get conn, device_path(conn, :index)

    assert json_response(conn, 200) == %{
      "devices" => [%{
        "name" => device.title,
      }]
    }

  end
end

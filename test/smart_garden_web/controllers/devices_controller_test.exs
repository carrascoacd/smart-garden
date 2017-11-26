defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase

  test "GET /", %{conn: conn} do
    SmartGarden.Repo.insert(%SmartGarden.Device{name: "Arduino"})
    conn = get conn, device_path(conn, :index)

    assert json_response(conn, 200) == %{
      "devices" => [%{
        "name" => "Arduino",
      }]
    }

  end
end

defmodule SmartGardenWeb.IntervalDeviceControllerTest do
  use SmartGardenWeb.ConnCase

  setup do
    device = SmartGarden.Repo.insert!(%SmartGarden.Device{name: "Arduino Device"})
    {:ok, %{device: device}}
  end

  test "create interval", %{conn: conn, device: device} do
    interval_params = %{name: "water", value: 1000}
    conn = post conn, device_interval_path(conn, :create, device.id), interval: interval_params
    assert json_response(conn, 201) == %{
      "name" => "water",
      "value" => 1000
    }
  end

  test "get interval", %{conn: conn, device: device} do
    changeset = %SmartGarden.Interval{name: "water", value: 1000.0, device: device}
    interval = SmartGarden.Repo.insert!(changeset)
    conn = get conn, device_interval_path(conn, :show, device.id, interval.id)
    assert json_response(conn, 200) == %{
      "name" => "water",
      "value" => 1000
    }
  end

  test "index intervals", %{conn: conn, device: device} do
    changeset = %SmartGarden.Interval{name: "water", value: 1000.0, device: device}
    SmartGarden.Repo.insert!(changeset)
    conn = get conn, device_interval_path(conn, :index, device.id)
    assert json_response(conn, 200) == %{"intervals" => [
      %{
        "name" => "water",
        "value" => 1000
      }
    ]}
  end

end

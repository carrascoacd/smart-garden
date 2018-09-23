defmodule SmartGardenWeb.DeviceControllerTest do
  use SmartGardenWeb.ConnCase

  alias SmartGarden.Repo
  alias SmartGarden.Device
  alias SmartGarden.Interval
  alias SmartGarden.WeatherEntry
  
  setup do
    device = Repo.insert!(%Device{name: "Arduino device"})
    weather_entry = Repo.insert!(%WeatherEntry{moisture: 300.0, device: device})
    changeset = %Interval{name: "water", value: 100, device: device, action: "open-valve"}
    interval = Repo.insert!(changeset)
    {:ok, %{device: device, weather_entry: weather_entry, interval: interval}}
  end

  test "index devices", %{conn: conn, device: device, weather_entry: _weather_entry, interval: _interval} do
    conn = get conn, device_path(conn, :index)
    assert json_response(conn, 200) == %{
      "deviceList" => [device_json(device)]
    }
  end

  test "create device", %{conn: conn} do
    device_params = %{name: "Arduino device"}
    conn = post conn, device_path(conn, :create), device: device_params
    assert json_response(conn, 201)
  end

  test "get current device", %{conn: conn, device: device, weather_entry: _weather_entry, interval: _interval} do
    conn = get conn, current_device_path(conn, :current)
    assert json_response(conn, 200) == device_json(device)
  end

  def device_json(device) do
    %{
      "name" => device.name,
      "id" => device.id
    }
  end

end

defmodule SmartGardenWeb.DeviceController do
  use SmartGardenWeb, :controller

  def index(conn, _params) do
    devices = SmartGarden.Device.get_all_with_weather_entries
    render conn, "index.json", devices: devices
  end

end

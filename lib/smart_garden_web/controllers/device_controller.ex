defmodule SmartGardenWeb.DeviceController do
  use SmartGardenWeb, :controller

  def index(conn, _params) do
    devices = SmartGarden.Repo.all(SmartGarden.Device)
    render conn, "index.json", devices: devices
  end
end

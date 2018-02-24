defmodule SmartGardenWeb.DeviceController do
  use SmartGardenWeb, :controller

  def index(conn, _params) do
    devices = SmartGarden.Device.get_all_with_weather_entries
    render conn, "index.json", devices: devices
  end

  def show(conn, %{"id" => id}) do
    device = case SmartGarden.Repo.get SmartGarden.Device, id do
      nil -> SmartGarden.Repo.one SmartGarden.Device
      device -> device
    end
    conn |> render("show.json", device: device)
  end

  def create(conn, %{"device" => device_params}) do
    changeset = SmartGarden.Device.changeset(%SmartGarden.Device{}, device_params)
    case SmartGarden.Repo.insert(changeset) do
      {:ok, device} ->
        conn 
          |> put_status(:created) 
          |> render("show.json", device: device)
      {:error, _changeset} ->
        json conn |> put_status(:bad_request), %{errors: ["unable to create "] }
    end
  end

end

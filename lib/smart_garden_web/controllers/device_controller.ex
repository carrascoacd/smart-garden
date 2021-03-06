defmodule SmartGardenWeb.DeviceController do
  use SmartGardenWeb, :controller

  alias SmartGarden.Repo
  alias SmartGarden.Device

  def index(conn, _params) do
    devices = Device.get_all_with_relations()
    render(conn, "index.json", devices: devices)
  end

  def current(conn, _params) do
    device = Repo.one(Device)

    conn
    |> render("show.json", device: device)
  end

  def create(conn, %{"device" => device_params}) do
    changeset = Device.changeset(%Device{}, device_params)

    case Repo.insert(changeset) do
      {:ok, device} ->
        conn
        |> put_status(:created)
        |> render("create.json", device: device)

      {:error, _changeset} ->
        json(conn |> put_status(:bad_request), %{errors: ["unable to create "]})
    end
  end
end
